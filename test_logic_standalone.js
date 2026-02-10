class MockGPIO {
    constructor() {
        // Replicate constructor logic relevant to ScanAllSlots
        this.lastSlotsState = { tank: [], mm: [] };

        // Mock Client
        this.client = {
            readCoils: async (start, count) => {
                console.log(`[MockPLC] Received ReadCoils Command: Start=${start}, Count=${count}`);
                // Return mock data controlled by external property
                return {
                    response: {
                        body: {
                            valuesAsArray: this.mockValues || new Array(60).fill(0)
                        }
                    }
                };
            }
        };

        this.logger = {
            log: (level, msg) => console.log(`[Logger][${level}] ${msg}`)
        };
    }

    // *** EXACT CODE FROM modules.js ***
    async ScanAllSlots() {
        try {
            // Read 60 coils starting from 301 (covers Tank 301-318 and MM 341-358)
            const response = await this.client.readCoils(301, 60)
            const bits = response.response.body.valuesAsArray.map(value => Boolean(value))

            if (bits.length >= 58) {
                // Slice data: Tank (first 18), MM (starts at index 40, length 18)
                const currentTank = bits.slice(0, 18)
                const currentMM = bits.slice(40, 58)

                // Diffing using JSON stringify for speed
                const isChanged =
                    JSON.stringify(currentTank) !== JSON.stringify(this.lastSlotsState.tank) ||
                    JSON.stringify(currentMM) !== JSON.stringify(this.lastSlotsState.mm)

                if (isChanged) {
                    this.lastSlotsState = { tank: currentTank, mm: currentMM }
                    return { changed: true, data: this.lastSlotsState }
                }
            }
        } catch (error) {
            if (this.logger) {
                this.logger.log('error', `ScanAllSlots failed: ${error}`, { type: 'modules' })
            }
        }
        return { changed: false }
    }
}

// === TEST SCENARIOS ===
async function runTests() {
    console.log("=== STARTING LOGIC SIMULATION ===\n");
    const gpio = new MockGPIO();

    // Scenario 1: First Run (Init)
    console.log("Scenario 1: Initial Scan (Device Empty)");
    const res1 = await gpio.ScanAllSlots();
    if (res1.changed === true) {
        console.log("✅ PASS: Detect initial state (Changed=true)");
    } else {
        console.error("❌ FAIL: Should detect initial state");
    }

    // Scenario 2: No Change
    console.log("\nScenario 2: Scan Again (Status Unchanged)");
    const res2 = await gpio.ScanAllSlots();
    if (res2.changed === false) {
        console.log("✅ PASS: Ignore unchanged state (Changed=false)");
    } else {
        console.error("❌ FAIL: Reported change when there was none");
    }

    // Scenario 3: Tank Slot 1 Changed
    console.log("\nScenario 3: Physical Change (Tank Slot 1 Activated)");
    gpio.mockValues = new Array(60).fill(0);
    gpio.mockValues[0] = 1; // Simulate PLC bit high

    const res3 = await gpio.ScanAllSlots();
    if (res3.changed === true && res3.data.tank[0] === true) {
        console.log("✅ PASS: Detected change correctly");
    } else {
        console.error("❌ FAIL: Did not detect change");
    }

    // Scenario 4: No Change Again
    console.log("\nScenario 4: Scan Again After Change");
    const res4 = await gpio.ScanAllSlots();
    if (res4.changed === false) {
        console.log("✅ PASS: Ignore stable state (Changed=false)");
    } else {
        console.error("❌ FAIL: Reported change when stable");
    }

    console.log("\n=== SIMULATION COMPLETE ===");
}

runTests();
