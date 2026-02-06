const net = require('net')
const Modbus = require('jsmodbus')
const sleep = m => new Promise(r => setTimeout(r, m))

export class GPIO {

  constructor(logger) {
    this.logger = logger
    this.host = process.env.VUE_APP_PLC_HOST
    this.port = process.env.VUE_APP_PLC_PORT
    this.socket = new net.Socket()
    this.client = new Modbus.client.TCP(this.socket)

    this.heartbeatState = true
    this.values = {
      onlinePLC: false,
      emo: false,
      ppm: 0,
      pressure: 0,
      liquidFlow: 0,
      liquidTopLimit: false,
      liquidBottomLimit: true,
      liquidPumpOpened: false,
      liquidOutletSwitchOpened: false,
      airFlow: 0,
      airPumpOpened: false,
      airPumpOverload: false,
      door1Locked: true,
      door2Locked: true,
      robotOverload: false,
      robotLoadAbnormal: false,
      liquidLeak: false,
      domeLocatingPinTR: true,
      domeLocatingPinTL: true,
      domeLocatingPinBR: true,
      domeLocatingPinBL: true,
      maintain: false,
      reset: false,
      idlePLC: true,
    }
  }

  dwordEncoder(floatValues) {
    const encodedValues = []
    
    for (const value of floatValues) {
      const buffer = Buffer.alloc(4)
      buffer.writeFloatBE(value, 0)
  
      const high = buffer.readUint16BE(2)
      const low  = buffer.readUint16BE(0)
  
      encodedValues.push(high, low)
    }

    return encodedValues
  }

  dwordDecoder(values) {
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

  setValue(key, value) {
    this.values[key] = value
  }

  connect(timeout = 1000) {
    this.socket.setTimeout(timeout)
    this.socket.connect({
      host: this.host,
      port: this.port,
    })
    this.socket.on('connect', () => {
      this.logger.log('info', 'Connect to PLC successful', { type: 'modules'})
      this.setValue('onlinePLC', true)
    })
    this.socket.on('data', () => {
      this.socket.setTimeout(1000)
    })
    this.socket.on('error', () => {
      this.logger.log('error', 'Connect to PLC failed', { type: 'modules'})
      this.setValue('onlinePLC', false)
    })
    this.socket.on('close', () => {
      this.logger.log('warning', 'Lost Connection to PLC', { type: 'modules'})
      this.setValue('onlinePLC', false)
      this.reconnect()
    })
    this.socket.on('timeout', () => {
      this.logger.log('warning', 'Socket timeout occurred', { type: 'modules'})
      this.setValue('onlinePLC', false)
      this.reconnect()
    })
  }

  async reconnect() {
    if (this.socket.readyState === "open")
      this.socket.end()
    await sleep(1000)
    this.logger.log('info', 'Attempting to reconnect', { type: 'modules'})
    this.socket.connect(this.port, this.host)
  }

  disconnect() {
    this.socket.destroy()
    this.logger.log('info', 'Disconnect PLC successful', { type: 'modules'})
  }

  async SimLoop() {
    this.setValue('ppm',        Math.random() * 50000)
    this.setValue('pressure',   Math.random() * 20 - 10)
    this.setValue('liquidFlow', Math.random() * 100)
    this.setValue('airFlow',    Math.random() * 300)

    return this.values
  }
  async Loop() {
    if (this.socket.readyState !== "open") {
      this.logger.log('info', 'Waiting for connection', { type: 'modules'})
      return false
    }
    await this.heartbeat()
    await this.updateSensorValues()
    await this.updateSensorStatus()

    return this.values
  }
  async heartbeat() {
    await this.client.writeSingleCoil(1, this.heartbeatState).then(() => {
      this.heartbeatState = !this.heartbeatState
    }).catch(() => {
      this.logger.log('error', `Sending heartbeat to PLC failed`, { type: 'modules'})
    })
  }
  async updateSensorValues() {
    await this.client.readHoldingRegisters(100, 8)
    .then(response => {
      const values = this.dwordDecoder(response.response.body.values)
      // console.log("[ DEBUG ] Sensor Values:", values)
      
      if (values.length === 4) {
        this.setValue('ppm',        values[0])
        this.setValue('pressure',   values[1])
        this.setValue('liquidFlow', values[2])
        this.setValue('airFlow',    values[3])
      }
      else
        this.logger.log('error', "Response sensor-values from plc is not equal to 4", { type: 'modules'})
    })
    .catch(error => {
      this.logger.log('error', `While reading sensor-values from PLC: ${error}`, { type: 'modules'})
    })
  }
  async updateSensorStatus() {
    await this.client.readCoils(100, 26)
    .then(response => {
      const bits = response.response.body.valuesAsArray.map(value => Boolean(value))
      // console.log("[ DEBUG ] Sensor Status:", bits)
      
      if (bits.length >= 26) {
        this.setValue('emo',                      bits[0])
        this.setValue('liquidTopLimit',           bits[1])
        this.setValue('liquidBottomLimit',        bits[2])
        this.setValue('liquidPumpOpened',         bits[3])
        this.setValue('liquidOutletSwitchOpened', bits[4])
        this.setValue('airPumpOpened',            bits[5])
        this.setValue('airPumpOverload',          bits[6])
        this.setValue('door1Locked',              bits[7])
        this.setValue('door2Locked',              bits[8])
        this.setValue('robotOverload',            bits[9])
        this.setValue('robotLoadAbnormal',        bits[10])
        this.setValue('liquidLeak',               bits[11])
        this.setValue('domeLocatingPinTR',        bits[12])
        this.setValue('domeLocatingPinTL',        bits[13])
        this.setValue('domeLocatingPinBR',        bits[14])
        this.setValue('domeLocatingPinBL',        bits[15])
        this.setValue('maintain',                 bits[16])
        this.setValue('reset',                    bits[22])
        this.setValue('idlePLC',                  bits[23])
      }
      else
        this.logger.log('error', 'Response sensor-status from plc is not equal to 23', { type: 'modules'})
    })
    .catch(error => {
      this.logger.log('error', `While reading sensor-status from PLC: ${error}`, { type: 'modules'})
    })
  }

  // Get() {
  //   return this.values
  // }

  async GetMMSlotsStatus() {
    let returnSlotsStatus = []
    await this.client.readCoils(341, 18)
    .then(response => {
      const bits = response.response.body.valuesAsArray.map(value => Boolean(value))
      // console.log("[ DEBUG ] MMS-Slots Status:", bits)
      
      if (bits.length >= 18) {
        returnSlotsStatus = bits.filter((_, index) => index < 18)
      }
      else
        this.logger.log('error', 'Response mms-slots from plc is not equal to 18', { type: 'modules'})
    })
    .catch(error => {
      this.logger.log('error', `While reading mms-slot from PLC: ${error}`, { type: 'modules'})
    })

    return returnSlotsStatus
  }

  async GetTankSlotsStatus() {
    let returnSlotsStatus = []
    await this.client.readCoils(301, 18)
    .then(response => {
      const bits = response.response.body.valuesAsArray.map(value => Boolean(value))
      // console.log("[ DEBUG ] TANK-Slots Status:", bits)
      
      if (bits.length >= 18) {
        returnSlotsStatus = bits.filter((_, index) => index < 18)
      }
      else
        this.logger.log('error', 'Response tank-slots from plc is not equal to 18', { type: 'modules'})
    })
    .catch(error => {
      this.logger.log('error', `While reading tank-slot from PLC: ${error}`, { type: 'modules'})
    })

    return returnSlotsStatus
  }

  async GetRobotIsEmpty() {
    let grabberIsEmpty = false
    await this.client.readHoldingRegisters(212, 2)
    .then(response => {
      const values = this.dwordDecoder(response.response.body.values)
      
      if (values.length === 1) {
        const grabberStatus = Math.round(values[0]).toFixed()
        switch (grabberStatus) {
          case '1':
            grabberIsEmpty = true
            break;
          case '2':
            grabberIsEmpty = false
            break;
          default:
            this.logger.log('error', `Unknown status robot-grabber: ${grabberStatus}`, { type: 'modules'})
        }
      }
      else
        this.logger.log('error', "Response robot-grabber status length from plc is not equal to 1", { type: 'modules'})
    })
    .catch(error => {
      this.logger.log('error', `While reading robot-grabber status from PLC: ${error}`, { type: 'modules'})
    })
    
    return grabberIsEmpty
  }

  async ActionLiquidOutletSwitch(action) {
    this.logger.log('info', `Action liquid-outlet-switch: ${action}`, { type: 'modules'})
    
    let returnStatus = false
    switch (action) {
      case 'open':
        await this.client.writeSingleCoil(104, true).then(() => {
          returnStatus = true
          this.setValue('liquidOutletSwitchOpened', true)
          this.logger.log('info', `Action set liquid-outlet-switch to open successful`, { type: 'modules'})
        }).catch(() => {
          this.logger.log('error', `Action set liquid-outlet-switch to open failed`, { type: 'modules'})
        })
        break;
      case 'close':
        await this.client.writeSingleCoil(104, false).then(() => {
          returnStatus = true
          this.setValue('liquidOutletSwitchOpened', false)
          this.logger.log('info', `Action set liquid-outlet-switch to close successful`, { type: 'modules'})
        }).catch(() => {
          this.logger.log('error', `Action set liquid-outlet-switch to close failed`, { type: 'modules'})
        })
        break;
      default:
        this.logger.log('error', `Unknown action liquid-outlet-switch: ${action}`, { type: 'modules'})
    }
    return returnStatus
  }

  async ActionLiquidPump(action) {
    this.logger.log('info', `Action liquid-pump: ${action}`, { type: 'modules'})
    
    let returnStatus = false
    switch (action) {
      case 'on':
        await this.client.writeSingleCoil(103, true).then(() => {
          returnStatus = true
          this.setValue('liquidPumpOpened', true)
          this.logger.log('info', `Action set liquid-pump to open successful`, { type: 'modules'})
        }).catch(() => {
          this.logger.log('error', `Action set liquid-pump to open failed`, { type: 'modules'})
        })
        break;
      case 'off':
        await this.client.writeSingleCoil(103, false).then(() => {
          returnStatus = true
          this.setValue('liquidPumpOpened', false)
          this.logger.log('info', `Action set liquid-pump to close successful`, { type: 'modules'})
        }).catch(() => {
          this.logger.log('error', `Action set liquid-pump to close failed`, { type: 'modules'})
        })
        break;
      default:
        this.logger.log('error', `Unknown action liquid-pump: ${action}`, { type: 'modules'})
    }
    return returnStatus
  }

  async ActionAirPump(action) {
    this.logger.log('info', `Action air-pump: ${action}`, { type: 'modules'})
    
    let returnStatus = false
    switch (action) {
      case 'on':
        await this.client.writeSingleCoil(105, true).then(() => {
          returnStatus = true
          this.setValue('airPumpOpened', true)
          this.logger.log('info', `Action set air-pump to open successful`, { type: 'modules'})
        }).catch(() => {
          this.logger.log('error', `Action set air-pump to open failed`, { type: 'modules'})
        })
        break;
      case 'off':
        await this.client.writeSingleCoil(105, false).then(() => {
          returnStatus = true
          this.setValue('airPumpOpened', false)
          this.logger.log('info', `Action set air-pump to close successful`, { type: 'modules'})
        }).catch(() => {
          this.logger.log('error', `Action set air-pump to close failed`, { type: 'modules'})
        })
        break;
      default:
        this.logger.log('error', `Unknown action air-pump: ${action}`, { type: 'modules'})
    }
    return returnStatus
  }

  async ActionGlobalReset() {
    this.logger.log('info', 'Action global-reset: trigger', { type: 'modules' })

    try {
      await this.client.writeSingleCoil(117, true) // 1 -> 觸發
      await sleep(100)
      await this.client.writeSingleCoil(117, false) // 0 -> 復原

      return true
    } catch (err) {
      this.logger.log('error', `Action global-reset failed: ${err.message}`, { type: 'modules' })

      return false
    }
  }

  async ActionGlobalChangeMode(enable) {
    this.logger.log('info', 'Action global-changeMode: trigger', { type: 'modules', enable })

    try {
      await this.client.writeSingleCoil(133, Boolean(enable)) // 1 -> 啟用 / 0 -> 閒置
      await sleep(100)
      //await this.client.writeSingleCoil(133, false) // 0 -> 復原
      return true
    } catch (err) {
      this.logger.log('error', `Action global-changeMode failed: ${err.message}`, { type: 'modules' })

      return false
    }
  }

  ActionLaunchAirlockProcedure() {
    this.logger.log('info', "Launching airlock procedure", { type: 'modules'})
  }

  // async actionRobotLaunchCommand(name, duration) {
  //   /*
  //     name(string): The name shows for logs
  //     duration(int): timeout seconds
  //   */
  //   const startTime = Date.now()
  //   while (Date.now() - startTime < duration*1000) {
  //     try {
  //       const response = await this.client.readHoldingRegisters(206, 2)
  //       const values = this.dwordDecoder(response.response.body.values)
  //       const output = Math.round(values[0])
  //       if (output < 3) {
  //         this.logger.log('error', `Action ${name}: PLC didn't recive command`, { type: 'modules'})
  //         return false
  //       }
  //       else if (output > 3) {
  //         if (output == 4)
  //           return true
  //         else
  //           return false
  //       }
  //     } catch {
  //       this.logger.log('error', `Action ${name}: check robot executed result failed`, { type: 'modules'})
  //       return false
  //     }
  //   }
  //   return false
  // }

  async actionRobotLaunchCommand(name, duration) {
    /*
      name(string): 顯示於日誌中的名稱
      duration(int): 允許等待 PLC 回應的最長秒數
    */
    const startTime = Date.now()
    const maxRetries = 2 // 連續讀取失敗最多重試次數
    let attempts = 0     // 只累計"連續讀取失敗"次數

    while (Date.now() - startTime < duration*1000) {
      try {
        // 讀取 206~207 (32-bit) - 若 PLC 只佔 16-bit, 請改成 length = 1
        const response = await this.client.readHoldingRegisters(206, 2)
        const values = this.dwordDecoder(response.response.body.values)
        const output = Math.round(values[0])

        if (output <= 2) {
          this.logger.log('info', `${name}: 等待PLC接受命令，狀態碼 ${output}`, { type: 'modules' })

          if (++attempts >= maxRetries) {
            this.logger.log('info', `${name}: 連續 ${maxRetries} 次等待PLC接受命令失敗，終止動作`, { type: 'modules' })
            return false
          }
        } else if (output == 3) {
          this.logger.log('info', `嘗試次數 ${attempts}: ${name}: 等待PLC執行中，狀態碼 ${output}`, { type: 'modules' })
        } else if (output == 4) { // 成功
          this.logger.log('info', `${name}: 執行成功!`, { type: 'modules' })
          return true
        } else { // 5 = 失敗 或其他異常碼
          this.logger.log('error', `${name}: 發生異常，回傳值為 ${output}`, { type: 'modules' })
          return false
        }
      } catch (error) {
        this.logger.log('error', `${name}: 第 ${attempts + 1} 次讀取PLC狀態失敗: ${error.message}`, { type: 'modules' })

        if (++attempts >= maxRetries) {
          this.logger.log('error', `${name}: 連續 ${maxRetries} 次讀取失敗，終止動作`, { type: 'modules' })
          return false
        }
      }

      await sleep(3000) // 每3秒輪詢一次
    }

    // 若超過設定時間仍未成功，宣告失敗
    this.logger.log('error', `${name}: 執行超時，已過 ${duration} 秒`, { type: 'modules' })
    return false
  }
  async actionRobotResetCommand() {
    try {
      // reset command-status to 0
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([1]))
    } catch {
      this.logger.log('error', "Action Reset-Command: reset robot-command failed", { type: 'modules'})
      return false
    }
    return true
  }

  async ActionRobotReturn2Origin(duration = 300) {
    // robot action: return to original point
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([1]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Return-to-Origin: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Return-to-Origin', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotMove2Slot(slotId, duration = 300) {
    // robot action: move to slot
    try {
      await this.client.writeMultipleRegisters(204, this.dwordEncoder([slotId]))
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([2]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Move-to-Slot: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Move-to-Slot', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotUninstallServer(duration = 300) {
    // robot action: uninstall server
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([3]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Uninstall-Server: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Uninstall-Server', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotInstallServer(duration = 300) {
    // robot action: install server
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([4]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Install-Server: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Install-Server', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotOpenWireCover(duration = 300) {
    // robot action: open wire cover
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([5]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Open-Wire-Cover: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Open-Wire-Cover', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotCloseWireCover(duration = 300) {
    // robot action: close wire cover
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([6]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Close-Wire-Cover: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Close-Wire-Cover', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotScanTankSlots(duration = 300) {
    // robot action: scan tank slots
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([7]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Scan-Tank-Slots: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Scan-Tank-Slots', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  // //修正版掃描槽位
  
  // async ActionRobotScanTankSlots(duration = 300) {
  //   // 1. 下命令碼 7 → register 202
  //   try {
  //     await this.client.writeMultipleRegisters(202, this.dwordEncoder([7]));
  //   } catch (e) {
  //     this.logger.log('error', `Scan-Tank-Slots: write 202 failed: ${e}`, { type: 'modules' });
  //     return null;
  //   }
  
  //   // 2. 觸發執行 → register 206 寫入 2
  //   try {
  //     await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]));
  //   } catch (e) {
  //     this.logger.log('error', `Scan-Tank-Slots: write 206 failed: ${e}`, { type: 'modules' });
  //     return null;
  //   }
  
  //   // 3. 用 actionRobotLaunchCommand 監控 PLC 執行結果
  //   const executed = await this.actionRobotLaunchCommand('Scan-Tank-Slots', duration);
  //   // 4. 重置命令 (可選)  
  //   await this.actionRobotResetCommand();
  
  //   if (!executed) {
  //     this.logger.log('error', 'Scan-Tank-Slots: PLC 執行失敗或逾時', { type: 'modules' });
  //     return null;   // 或 return false，前端看到就知道失敗
  //   }
  
  //   // 5. 執行成功，讀取槽位線圈 301~319
  //   let coils;
  //   try {
  //     coils = await this.client.readCoils(301, 19);
  //   } catch (e) {
  //     this.logger.log('error', `Scan-Tank-Slots: read coils failed: ${e}`, { type: 'modules' });
  //     return null;
  //   }
  //   const bits = coils.response.body.valuesAsArray.map(v => Boolean(v));
  
  //   // 6. 回傳 boolean[19]
  //   return bits;
  // }

  // // 模擬掃描modules.js
  //   async ActionRobotScanTankSlots(duration = 3) {
  //     // 最簡模擬：前兩格有伺服器
  //     const simulated = Array(19).fill(false);
  //     simulated[0] = simulated[1] = simulated[11] = true;

  //     // 如果你想模擬延遲：
  //     // await new Promise(r => setTimeout(r, duration));

  //     return simulated;
  //   }

  async ActionExtendActuator(duration = 300) {
    // robot action: extend 4 actuator at the edge of "roof"
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([8]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Extend-Actuator: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Extend-Actuator', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRetractActuator(duration = 300) {
    // robot action: retract 4 actuator at the edge of "roof"
    try {
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([9]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action Retract-Actuator: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('Retract-Actuator', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionRobotCCDMarkCorrection(tankId, duration = 300) {
    // robot action: CCD reference point correction
    try {
      await this.client.writeMultipleRegisters(200, this.dwordEncoder([tankId]))
      await this.client.writeMultipleRegisters(202, this.dwordEncoder([10]))
      await this.client.writeMultipleRegisters(206, this.dwordEncoder([2]))
    } catch {
      this.logger.log('error', `Action CCD-Mark-Correction: pre-processing robot-command failed`, { type: 'modules'})
      return false
    }
    await sleep(1000)

    const executedResult = await this.actionRobotLaunchCommand('CCD-Mark-Correction', duration)
    await this.actionRobotResetCommand()

    return executedResult
  }

  async ActionWaitForAirTightness() {
    try {
      // 從 PLC 讀取壓力計數據，根據資料表中的地址 (102)
      const response = await this.client.readHoldingRegisters(102, 2); // 假設壓力計在 102 註冊，並讀取 2 個寄存器
      const pressure = this.dwordDecoder(response.response.body.values)[0]; // 解碼數據並獲得壓力值

      // 轉換單位 kPa = 10Pa × 0.01
      const pressure_kpa = pressure * 0.01
      console.log("Pressure read from PLC:", pressure_kpa, "kPa");

      // 檢查壓力是否符合新的氣密要求（pressure <= -0.1 KPa）
      if (pressure_kpa <= -0.1) {
        console.log("Pressure is within the acceptable range.");
        return true;  // 氣密性符合要求
      } else {
        console.log("Pressure is out of acceptable range.");
        return false;  // 氣密性不符合要求
      }
    } catch (error) {
      this.logger.log("error", "Failed to read pressure for air tightness check", { type: "modules" });
      return false;  // 發生錯誤
    }
  }

  //todo 新增  偵測氟化液濃度
  async ActionWaitForConcentrationDecrease() {
    try {
      // 從 PLC 讀取濃度數據，根據資料表中的地址 (100)
      const response = await this.client.readHoldingRegisters(100, 2); // 讀取 100 地址的濃度數據
      const concentration = this.dwordDecoder(response.response.body.values)[0]; // 解碼數據並獲得濃度值
  
      console.log("Concentration read from PLC:", concentration, "PPM");
  
      // 檢查濃度是否符合下降條件 (濃度 <= 100 PPM)
      if (concentration <= 100) {
        console.log("Concentration is within the acceptable range.");
        return true;  // 濃度符合要求
      } else {
        console.log("Concentration is out of acceptable range.");
        return false;  // 濃度不符合要求
      }
    } catch (error) {
      this.logger.log("error", "Failed to read concentration for waiting process", { type: "modules" });
      return false;  // 發生錯誤
    }
  }
  


}
