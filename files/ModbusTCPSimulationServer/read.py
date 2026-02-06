from pyModbusTCP.client import ModbusClient

# init modbus client
c = ModbusClient(host = 'localhost', port = 8502, auto_open = True, auto_close = True)

coils_l = c.read_coils(0, 10)
if coils_l:
    print('coil ad #0 to 9: %s' % coils_l)
else:
    print('unable to read coils')

regs_l = c.read_holding_registers(0, 8)
if regs_l:
    print('reg ad #0 to 9: %s' % regs_l)
else:
    print('unable to read registers')