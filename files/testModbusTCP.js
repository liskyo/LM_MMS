const Modbus = require('jsmodbus')
const net    = require('net')
const socket = new net.Socket()
const client = new Modbus.client.TCP(socket)

function DwordDecoder(values) {
    const decodedValues = []
    for (let i = 0; i < values.length; i += 2) {
        const high = values[i]
        const low  = values[i + 1]
        const buffer = Buffer.alloc(4)
        buffer.writeUint16BE(low, 0)
        buffer.writeUint16BE(high,  2)

        const decodeValue = buffer.readFloatBE(0)
        decodedValues.push(decodeValue)
    }
    return decodedValues
}

socket.connect({
    host: '192.168.100.2',
    port: 502,
})
socket.on('connect', async function() {
    console.log("[ INFO ] Connected to PLC via ModbusTCP protocol successful ... [ OK ]")

    try {
        console.log("============================ SENSOR SESSION ============================")
        await client.readHoldingRegisters(100, 8)
        .then(response => {
            const values = DwordDecoder(response.response.body.values)
            console.log("[ OUTPUT ] Sensor Floats:", values)
            console.log("[ DEBUG ] 氟化液濃度:", values[0])
            console.log("[ DEBUG ] 壓力計:", values[1])
            console.log("[ DEBUG ] 流量計:", values[2])
            console.log("[ DEBUG ] 風速計:", values[3])
        })
        .catch(error => {
            console.log("[ ERROR ] while reading sensor 32-bit float from PLC ...", error)
        })

        await client.readCoils(100, 18)
        .then(response => {
            const bits = response.response.body.valuesAsArray.map(value => Boolean(value))
            console.log("[ OUTPUT ] Sensor Bits:", bits)
            console.log("[ DEBUG ] EMO觸發:", bits[0])
            console.log("[ DEBUG ] 補液桶 上限位器:", bits[1])
            console.log("[ DEBUG ] 補液桶 下限位器:", bits[2])
            console.log("[ DEBUG ] 補液管路 幫浦:", bits[3])
            console.log("[ DEBUG ] 補液管路 電磁閥:", bits[4])
            console.log("[ DEBUG ] 抽氣管路 抽氣機:", bits[5])
            console.log("[ DEBUG ] 抽氣管路 抽氣機過載:", bits[6])
            console.log("[ DEBUG ] 門檢1:", bits[7])
            console.log("[ DEBUG ] 門檢2:", bits[8])
            console.log("[ DEBUG ] Robot過載異常:", bits[9])
            console.log("[ DEBUG ] Robot負載異常:", bits[10])
            console.log("[ DEBUG ] 漏液偵測:", bits[11])
            console.log("[ DEBUG ] 上罩對接感測器（右上）:", bits[12])
            console.log("[ DEBUG ] 上罩對接感測器（左上）:", bits[13])
            console.log("[ DEBUG ] 上罩對接感測器（右下）:", bits[14])
            console.log("[ DEBUG ] 上罩對接感測器（左下）:", bits[15])
            console.log("[ DEBUG ] 維修模式:", bits[16])
			console.log("[ DEBUG ] 夾爪狀態:", bits[17])
        })
        .catch(error => {
            console.log("[ ERROR ] while reading sensor bit from PLC ...", error)
        })
        console.log("============================= END  SESSION =============================")

        console.log("============================ ROBOT  SESSION ============================")
        await client.writeSingleRegister(200, 1).then(() => {
            console.log("[ WRITE ] TANK-ID command success");
        }).catch(error => {
            console.error("[ ERROR ] TANK-ID command failed:", error.message);
        });
		await client.writeSingleRegister(202, 1).then(() => {
            console.log("[ WRITE ] Robot-Command success");
        }).catch(error => {
            console.error("[ ERROR ] Robot-Command failed:", error.message);
        });
		await client.writeSingleRegister(204, 101).then(() => {
            console.log("[ WRITE ] Slot-Command success");
        }).catch(error => {
            console.error("[ ERROR ] Slot-Command failed:", error.message);
        });
		await client.writeSingleRegister(206, 1).then(() => {
            console.log("[ WRITE ] Process-Command success");
        }).catch(error => {
            console.error("[ ERROR ] Process-Command failed:", error.message);
        });
		
		await client.readHoldingRegisters(200, 10)
        .then(response => {
            const values = DwordDecoder(response.response.body.values)
            console.log("[ OUTPUT ] Robot Floats:", values)
            console.log("[ DEBUG ] TANK編號:", values[0])
            console.log("[ DEBUG ] 手臂動作命令:", values[1])
            console.log("[ DEBUG ] 槽位設定值:", values[2])
            console.log("[ DEBUG ] 命令狀態:", values[3])
			console.log("[ DEBUG ] 失敗訊息:", values[3])
        })
        .catch(error => {
            console.log("[ ERROR ] while reading robot 32-bit float from PLC ...", error)
        })
		console.log("============================= END  SESSION =============================")

		console.log("============================= SLOT SESSION =============================")
        await client.readCoils(301, 18)
        .then(response => {
            const bits = response.response.body.valuesAsArray.map(value => Boolean(value))
			bits.forEach((status, slot) => {
				if (slot < 19)
					console.log(`[ DEBUG ] TANK Slot${slot + 1}: ${status}`)
			})
        })
        .catch(error => {
            console.log("[ ERROR ] while reading robot bit from PLC ...", error)
        })

		await client.readCoils(341, 18)
        .then(response => {
            const bits = response.response.body.valuesAsArray.map(value => Boolean(value))
			bits.forEach((status, slot) => {
				console.log(`[ DEBUG ] MMS Slot${slot}: ${status}`)
			})
        })
        .catch(error => {
            console.log("[ ERROR ] while reading robot bit from PLC ...", error)
        })
        console.log("============================= END  SESSION =============================")
    }
    catch (e) {
        console.log("Error interrupted ...")
    }
    finally {
        socket.end()
    }

    socket.end()
})
socket.on('error', function() {
    console.error("Socket Error:", error)
})