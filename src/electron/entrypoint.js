const path = require('path');
const fs = require('fs');
const readline = require('readline')
const winston = require('winston')
import axios from 'axios';
import { GPIO } from './modules'
import { Interlock } from './interlock'

export const mainFunction = (isDevelopment, app, ipcMain) => {
  const logFilename = (isDevelopment) ? path.join(__dirname, 'main.log') : '/home/user/weSolutions_MMS_EV/logs/main.log'
  // console.log(logFilename)

  const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({
        filename: logFilename,
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,              // 最多保留 5 個日誌文件
        tailable: true,           // 確保最新的日誌文件總是 `main.log`
      }),
    ],
  })
  if (isDevelopment) {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }))
  }
  logger.log("info", "Launching mainFunction")
  const gpio = new GPIO(logger)
  const interlock = new Interlock(logger)

  gpio.connect()
  logger.log("info", "StartUp sequence has been completed")
  
  mainHandler(app, ipcMain, gpio, interlock)
  mainFunctionHandler(ipcMain, gpio)
  pipeSystemHandler(ipcMain, gpio)
  manualOperation(ipcMain, gpio)
  issueReport(ipcMain, logFilename)
  logger.log("info", "PrePorcess sequence has been completed")
  dockServerHandler(ipcMain, gpio)

  // await gpio.Update()
  setInterval(async () => {
    // const values = await gpio.SimLoop()
    const values = await gpio.Loop()
    
    if (values)
      interlock.Check(values)
  }, 100)
}

const mainHandler = (app, ipcMain, gpio, interlock) => {
  ipcMain.on("main/poweroff", async() => {
    console.log("global poweroff button has been trigger")
    app.quit()
  })
  // mainHandler 區塊，把原本的 reset 事件換成 invoke/handle
  ipcMain.handle("main/reset", async () => {
    console.log("global reset button has been trigger");
    return await gpio.ActionGlobalReset();   // 回傳 true / false
  });
  ipcMain.handle("main/get", async() => {
    const pressurized = await gpio.ActionWaitForAirTightness()

    return {
      emo: gpio.values.emo,
      ppm: gpio.values.ppm,
      pressure: gpio.values.pressure,
      online: gpio.values.onlinePLC,
      idle: gpio.values.idlePLC,
      //docked: (gpio.values.domeLocatingPinTR && gpio.values.domeLocatingPinTL && gpio.values.domeLocatingPinBR && gpio.values.domeLocatingPinBL),
      pressurized,
      maintain: gpio.values.maintain,
      reset: gpio.values.reset,
    }
  })
  ipcMain.handle("main/getAlert", async() => {
    return interlock.GetAlert()
  })
  ipcMain.handle("main/changeMode", async (_event, enable) => {
    console.log("Device mode changed:", enable);
    return await gpio.ActionGlobalChangeMode(enable);   // 回傳 true / false
  });
}

const mainFunctionHandler = (ipcMain, gpio) => {
  ipcMain.handle("mainFunction/getMMSlots", async() => {
    return await gpio.GetMMSlotsStatus()
  })

  ipcMain.handle("mainFunction/getTankSlots", async() => {
    return await gpio.GetTankSlotsStatus()
  })

  ipcMain.handle("mainFunction/getLiquidLevel", async() => {
    const tankLiquidHeight = Number(gpio.values.liquidFlow) || 0
    const targetLiquidHeight = 620
    return { tankLiquidHeight, targetLiquidHeight }
  })

  ipcMain.handle("mainFunction/check/robotIsEmpty", async() => {
    return await gpio.GetRobotIsEmpty()
  })

  ipcMain.handle("mainFunction/action/startReplenish", async() => {
    return await gpio.ActionLiquidOutletSwitch('open') && gpio.ActionLiquidPump('on')
  })

  ipcMain.handle("mainFunction/action/endReplenish", async() => {
    return await gpio.ActionLiquidPump('off') && gpio.ActionLiquidOutletSwitch('close')
  })

  ipcMain.handle("mainFunction/action/robot/return2origin", async() => {
    return await gpio.ActionRobotReturn2Origin()
  })

  ipcMain.handle("mainFunction/action/robot/move2slot", async(_, args) => {
    return await gpio.ActionRobotMove2Slot(args.slotId)
  })

  ipcMain.handle("mainFunction/action/robot/installServer", async() => {
    return await gpio.ActionRobotInstallServer()
  })

  ipcMain.handle("mainFunction/action/robot/uninstallServer", async() => {
    return await gpio.ActionRobotUninstallServer()
  })

  ipcMain.handle("mainFunction/action/robot/openWireCover", async() => {
    return await gpio.ActionRobotOpenWireCover()
  })

  ipcMain.handle("mainFunction/action/robot/closeWireCover", async() => {
    return await gpio.ActionRobotCloseWireCover()
  })

  ipcMain.handle("mainFunction/action/robot/scanTankSlots", async() => {
    return await gpio.ActionRobotScanTankSlots()
  })

  ipcMain.handle("mainFunction/action/extendActuator", async() => {
    return await gpio.ActionExtendActuator()
  })

  ipcMain.handle("mainFunction/action/retractActuator", async() => {
    return await gpio.ActionRetractActuator()
  })

  ipcMain.handle("mainFunction/action/robot/recalibration", async(_, args) => {
    return await gpio.ActionRobotCCDMarkCorrection(args.tankId)
  })

  //todo 新增
  ipcMain.handle("mainFunction/action/airPump", async(_, args) => {
    return await gpio.ActionAirPump(args.action)
  })

  //todo 新增
  ipcMain.handle("mainFunction/action/waitForAirTightness", async () => {
    return await gpio.ActionWaitForAirTightness();
  });  

  //todo 新增 偵測氟化液濃度
  ipcMain.handle("mainFunction/action/waitForConcentrationDecrease", async () => {
    return await gpio.ActionWaitForConcentrationDecrease();
  });
  

}

const pipeSystemHandler = (ipcMain, gpio) => {
  ipcMain.handle("pipeSystem/get", async() => {
    return {
      liquidFlow: gpio.values.liquidFlow,
      airFlow: gpio.values.airFlow,
      liquidTopLimit: gpio.values.liquidTopLimit,
      liquidBottomLimit: gpio.values.liquidBottomLimit,
      liquidPumpOpened: gpio.values.liquidPumpOpened,
      liquidOutletSwitchOpened: gpio.values.liquidOutletSwitchOpened,
      airPumpOpened: gpio.values.airPumpOpened,
    }
  })
  
  ipcMain.on("pipeSystem/setLiquidOutlet", async(_, args) => {
    console.log("set liquid-outlet", args)
    gpio.ActionLiquidOutletSwitch(args)
  })

  ipcMain.on("pipeSystem/setLiquidPump", async(_, args) => {
    console.log("set liquid-pump", args)
    gpio.ActionLiquidPump(args)
  })
  
  ipcMain.on("pipeSystem/setAirPump", async(_, args) => {
    console.log("set air-pump", args)
    gpio.ActionAirPump(args)
  })
}

const manualOperation = (ipcMain, gpio) => {
  ipcMain.handle("manualOperation/action/robot/return2origin", async() => {
    return await gpio.ActionRobotReturn2Origin()
  })

  ipcMain.handle("manualOperation/action/robot/move2slot", async(_, args) => {
    return await gpio.ActionRobotMove2Slot(args.slotId)
  })

  ipcMain.handle("manualOperation/action/robot/openWireCover", async() => {
    return await gpio.ActionRobotOpenWireCover()
  })

  ipcMain.handle("manualOperation/action/robot/closeWireCover", async() => {
    return await gpio.ActionRobotCloseWireCover()
  })

  ipcMain.handle("manualOperation/action/robot/installServer", async() => {
    return await gpio.ActionRobotInstallServer()
  })

  ipcMain.handle("manualOperation/action/robot/uninstallServer", async() => {
    return await gpio.ActionRobotUninstallServer()
  })

  ipcMain.handle("manualOperation/action/robot/recalibration", async(_, args) => {
    return await gpio.ActionRobotCCDMarkCorrection(args.tankId)
  })

  ipcMain.handle("manualOperation/action/tank/openCover", async(_, args) => {
    try {
      console.log("[ DEBUG ]", process.env.VUE_APP_API_HOST, process.env.VUE_APP_API_PORT, process.env.VUE_APP_API_TOKEN)
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': process.env.VUE_APP_API_TOKEN
      }
      const response = await axios.post(
        `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/agents/tank${args.tankId}/plc/action/cover`,
        { action: "open"},
        { headers: headers, timeout: 30000 },
      )
      if (response.data.status === "success")
        return true
      else
        console.log("[ WARNING ] open tank cover has been rejected in manual-operation", response.data)
    } catch (error) {
      console.log("[ ERROR ] Failed to open tank cover in manual-operation", error)
    }
    return false
  })

  ipcMain.handle("manualOperation/action/tank/closeCover", async(_, args) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': process.env.VUE_APP_API_TOKEN
      }
      const response = await axios.post(
        `http://${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/api/agents/tank${args.tankId}/plc/action/cover`,
        { action: "close"},
        { headers: headers, timeout: 30000 },
      )
      if (response.data.status === "success")
        return true
      else
        console.log("[ WARNING ] close tank cover has been rejected in manual-operation", response.data)
    } catch (error) {
      console.log("[ ERROR ] Failed to close tank cover in manual-operation", error)
    }
    return false
  })
}

const issueReport = (ipcMain, logFilename) => {
  ipcMain.handle("issueReport/get", async() => {
    let returnJson = []

    const fileStream = fs.createReadStream(logFilename)
    const fileInstance = readline.createInterface({ input: fileStream })

    for await (const line of fileInstance) {
      const alertData = JSON.parse(line)
      if ('type' in alertData && alertData.type === 'interlock') {
        returnJson.unshift(...[{
          level: alertData.level,
          timestamp: alertData.timestamp,
          name: ('name' in alertData) ? alertData.name : '',
          description: ('message' in alertData) ? alertData.message : ''
        }])
      }
    }

    return returnJson
  })
}

const dockServerHandler = (ipcMain, gpio) => {
  ipcMain.handle("dockServer/getMMSlots", async() => {
    return await gpio.GetMMSlotsStatus()
  })

  ipcMain.handle("dockServer/getTankSlots", async() => {
    return await gpio.GetTankSlotsStatus()
  })

  ipcMain.handle("dockServer/check/robotIsEmpty", async() => {
    return await gpio.GetRobotIsEmpty()
  })

  ipcMain.handle("dockServer/action/robot/move2slot", async(_, args) => {
    return await gpio.ActionRobotMove2Slot(args.slotId)
  })

  ipcMain.handle("dockServer/action/robot/uninstallServer", async() => {
    return await gpio.ActionRobotUninstallServer()
  })

  ipcMain.handle("dockServer/action/robot/installServer", async() => {
    return await gpio.ActionRobotInstallServer()
  })

  ipcMain.handle("dockServer/action/robot/return2origin", async() => {
    return await gpio.ActionRobotReturn2Origin()
  })

  ipcMain.handle("dockServer/action/robot/recalibration", async(_, args) => {
    return await gpio.ActionRobotCCDMarkCorrection(args.tankId)
  })

  ipcMain.handle("dockServer/action/robot/scanTankSlots", async() => {
    return await gpio.ActionRobotScanTankSlots()
  })
}
