from pyModbusTCP.server import ModbusServer, DataBank
import json
import os
import struct
import time

def float32_to_uint16(value):
    """Convert IEEE 754 32-bit float to two 16-bit integers (big-endian)"""
    packed = struct.pack(">f", value)  # Pack as big-endian float (4 bytes)
    uint16 = struct.unpack(">HH", packed)
    return (uint16[1], uint16[0])  # Split into two 16-bit integers

def uint16_to_float32(high, low):
    """Convert two 16-bit integers (big-endian) back to IEEE 754 32-bit float"""
    packed = struct.pack(">HH", low, high)  # Pack as big-endian (low first, high second)
    return struct.unpack(">f", packed)[0]  # Unpack as big-endian float

server = ModbusServer(host = "0.0.0.0", port = 8502, no_block = True)
server.start()

LAST_MODIFY_TIME = None
while True:
    time.sleep(0.1)
    currentModifyTime = os.path.getmtime("./data.json")
    dataBank = server.data_bank

    # set robot-grabber to empty
    dataBank.set_holding_registers(212, float32_to_uint16(1))

    if currentModifyTime != LAST_MODIFY_TIME:
        with open("./data.json", "r") as file:
            data = json.load(file)
            coils = [x["value"] for x in data["coils"]]
            registers = [_ for x in data["holdingRegisters"] for _ in float32_to_uint16(x["value"])]
            tankSlots = [x["value"] for x in data["tankSlots"]]
            mmsSlots = [x["value"] for x in data["mmsSlots"]]

        dataBank.set_coils(100, coils)
        dataBank.set_holding_registers(100, registers)
        # print(coils)
        # print(registers)
        dataBank.set_coils(301, tankSlots)
        dataBank.set_coils(341, mmsSlots)

        print("[ INFO ] data.json updated ... [ OK ]")
        LAST_MODIFY_TIME = currentModifyTime

    bValues = dataBank.get_holding_registers(200, 8)
    values  = [uint16_to_float32(bValues[i], bValues[i + 1]) for i in range(0, 8, 2)]
    tankId  = int(values[0])
    command = int(values[1])
    slotId  = int(values[2])
    status  = int(values[3])
    if status == 2:
        print(f"[ INFO ] Recive Command: {command} | tankId: {tankId} | slotId: {slotId}")
        dataBank.set_holding_registers(206, float32_to_uint16(4))
