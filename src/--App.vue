<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">

        <v-tabs-items v-model="tab">
          <v-tab-item value="mainFunction">
            <v-card flat class="contianer-background">
              <MainFunction :count="count.mainFunction" />
            </v-card>
          </v-tab-item>
          <v-tab-item value="pipeSystem">
            <v-card flat class="contianer-background">
              <PipeSystem :count="count.pipeSystem" />
            </v-card>
          </v-tab-item>
          <v-tab-item value="manualOperation">
            <v-card flat class="contianer-background">
              <ManualOperation :count="count.ManualOperation" />
            </v-card>
          </v-tab-item>
          <v-tab-item value="issueReport">
            <v-card flat class="contianer-background">
              <IssueReport :count="count.IssueReport" />
            </v-card>
          </v-tab-item>
          <v-tab-item value="dockServer">
            <v-card flat class="contianer-background">
              <DockServer :count="count.DockServer" />
            </v-card>
          </v-tab-item>		
        </v-tabs-items>

        <div class="information-bar">
          <v-row dense>
            <v-col cols="3">
              <v-card
                class="ma-1"
                rounded="xl"
                :style="{ background: 'linear-gradient(to bottom right, rgba(88, 101, 232, 1), rgba(102, 77, 202, 1))' }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      氟化液濃度
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-overline">
                      PPM
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="50"
                    class="text-h4 justify-end"
                    min-width="95"
                  >
                    {{ informationBar.ppm.toFixed(0) }}
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card
                class="ma-1"
                rounded="xl"
                :style="{ background: 'linear-gradient(to bottom right, rgba(252, 167, 14, 1), rgba(241, 118, 67, 1))' }"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      上罩壓力
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-overline">
                      kPa
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="50"
                    class="text-h4 justify-end"
                    min-width="90"
                  >
                    {{ convertedPressure }}
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
            <v-divider vertical inset></v-divider>
            <v-col cols="2">
              <v-card
                class="ma-1"
                rounded="xl"
                :style="{ background: (informationBar.online) ? 'linear-gradient(to bottom right, rgba(52, 199, 89, 1), rgba(36, 138, 61, 1))' : 'rgba(255, 255, 255, 0.15)' }"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="50"
                    class="text-h4 justify-end"
                  >
                    <svg viewBox="0 0 24 24"><title>connection</title><path d="M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z" /></svg>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      連線狀態
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ (informationBar.online) ? '已連線' : '未連線' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <!-- 對接狀態隱藏
            <v-col cols="2">
              <v-card
                class="ma-1"
                rounded="xl"
                :style="{ background: (informationBar.docked) ? 'linear-gradient(to bottom right, rgba(52, 199, 89, 1), rgba(36, 138, 61, 1))' : 'rgba(255, 255, 255, 0.15)' }"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="50"
                    class="text-h4 justify-end"
                  >
                    <svg viewBox="0 0 24 24"><title>lock</title><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      對接狀態
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ (informationBar.docked) ? '已對接' : '未對接' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            -->
            <v-col cols="2">
              <v-card
                class="ma-1"
                rounded="xl"
                :style="{ background: (informationBar.pressurized) ? 'linear-gradient(to bottom right, rgba(52, 199, 89, 1), rgba(36, 138, 61, 1))' : 'rgba(255, 255, 255, 0.15)' }"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="50"
                    class="text-h4 justify-end"
                  >
                    <svg viewBox="0 0 24 24"><title>diameter</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,15V13H7V15L4,12L7,9V11H17V9L20,12L17,15Z" /></svg>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      氣密狀態
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ (informationBar.pressurized) ? '已達成' : '未達成' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <!-- 閒置狀態-->
            <v-col cols="2">
              <v-card
                class="ma-1"
                rounded="xl"
                :style="{ background: (informationBar.docked) ? 'linear-gradient(to bottom right, rgba(52, 199, 89, 1), rgba(36, 138, 61, 1))' : 'rgba(255, 255, 255, 0.15)' }"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="50"
                    class="text-h4 justify-end"
                  >
                    <svg viewBox="0 0 24 24"><title>lock</title><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      設備狀態
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ (informationBar.docked) ? '啟用中' : '閒置中' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-tabs
          v-model="tab"
          class="menu-tabs"
          background-color="rgba(61, 60, 106, 0.6)"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab href="#mainFunction" active-class="menu-tab" @click="count.mainFunction += 1">
            主要功能
            <svg viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
          </v-tab>
          <!-- 龍門暫不使用
          <v-tab href="#pipeSystem" active-class="menu-tab" @click="count.pipeSystem += 1">
            管路系統
            <svg viewBox="0 0 24 24"><title>pipe-leak</title><path d="M2,5V13H4V11H10L12,9L10,7H4V5H2M20,5V7H12L14,9L12,11H20V13H22V5H20M12,13C12,13 10,15.17 10,16.5A2,2 0 0,0 12,18.5A2,2 0 0,0 14,16.5C14,15.17 12,13 12,13Z" /></svg>
          </v-tab>
          -->
          <v-tab href="#manualOperation" active-class="menu-tab" @click="count.ManualOperation += 1">
            手動操作
            <svg viewBox="0 0 24 24"><title>human</title><path d="M21,9H15V22H13V16H11V22H9V9H3V7H21M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6C10.89,6 10,5.1 10,4C10,2.89 10.89,2 12,2Z" /></svg>
          </v-tab>
          <v-tab href="#issueReport" active-class="menu-tab" @click="count.IssueReport += 1">
            事件回報
            <svg viewBox="0 0 24 24"><title>alert</title><path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" /></svg>
          </v-tab>
          <v-tab href="#dockServer" active-class="menu-tab" @click="count.DockServer += 1">
            伺服器架
            <svg viewBox="0 0 24 24"><title>server</title><path d="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z" /></svg>
          </v-tab>
        </v-tabs>

        <v-tabs
          class="power-tabs"
          background-color="rgba(61, 60, 106, 0.6)"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider color="#FF5252"></v-tabs-slider>
          <v-tab class="text-h6 mt-2" active-class="power-tab" @click="poweroffExecuter">
            <div v-if="poweroff.loading">
              <v-progress-circular
                indeterminate
              ></v-progress-circular>
            </div>
            <div v-else>
              <svg viewBox="0 0 24 24"><title>power</title><path d="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13" /></svg>
              關機 OFF
            </div>
          </v-tab>
        </v-tabs>

        <v-tabs
          class="reset-tabs"
          background-color="rgba(61, 60, 106, 0.6)"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider color="#FF9F0A"></v-tabs-slider>
          <v-tab class="text-h6 mt-2" active-class="reset-tab" @click="resetExecuter">
            <div v-if="reset.loading">
              <v-progress-circular
                indeterminate
              ></v-progress-circular>
            </div>
            <div v-else>
              <svg viewBox="0 0 24 24"><title>lock-reset</title><path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z" /></svg>
              復歸 RESET
            </div>
          </v-tab>
        </v-tabs>

        <v-dialog
          v-model="dialog.alert.model"
          max-width="320"
          persistent
        >
          <v-card light rounded="xl" :style="{ background: 'rgba(255, 255, 255, 0.73)', backdropFilter: 'blur(15px)' }">
            <v-list
              class="py-2 rounded-xl text-center"
              color="transparent"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-icon size="100" :class="alertIconColor" v-text="alertIcon"></v-icon>
                  <v-list-item-title class="text-h5" v-text="alertLevelText"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ dialog.alert.message }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-show="!dialog.alert.block">
                <v-btn color="grey lighten-4" block rounded elevation="0" @click="dialog.alert.model = false">
                  關閉
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
svg {
  fill: #FAFAFA;
}
.menu-tabs svg {
  width: 25px;
}
.power-tab svg{
  width: 25px;
  fill: #FF5252
}
.reset-tab svg{
  width: 25px;
  fill: #FF9F0A;
}
.power-tab > div,
.reset-tab > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.contianer-background {
  background-image: radial-gradient(50% 20% at center bottom, #3D3C6A, #212121);
}
.information-bar {
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 100px;
  padding-right:4px;
  padding-left:4px;
  background-color: rgba(255, 255, 255, 0.08);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.power-tabs {
  position: fixed;
  bottom: 0;
  width: 220px;
  left: 6%;
  transform: translateX(-6%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.power-tab {
  color: #FF5252;
}
.menu-tabs {
  position: fixed;
  bottom: 0;
  width: 630px;
  left: 50%;
  transform: translateX(-50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.menu-tab {
  color:#FAFAFA;
}
.reset-tabs {
  position: fixed;
  bottom: 0;
  width: 220px;
  left: 94%;
  transform: translateX(-94%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.reset-tab {
  color:#FF9F0A;
}

.dialog-alert-gradient-icon-critical {
  background: linear-gradient(to bottom right, #FF6861, #D70015);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
.dialog-alert-gradient-icon-warning {
  background: linear-gradient(to bottom right, #FFB33F, #C93400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
.dialog-alert-gradient-icon-success {
  background: linear-gradient(to bottom right, #30DB5B, #248A3D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
.dialog-alert-gradient-icon-info {
  background: linear-gradient(to bottom right, #70D7FF, #0171A4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}
</style>

<script>
import MainFunction from '@/components/MainFunction.vue';
import PipeSystem from '@/components/PipeSystem.vue';
import ManualOperation from '@/components/ManualOperation.vue';
import IssueReport from '@/components/IssueReport.vue';
import DockServer from '@/components/DockServer.vue';
import { eventBus } from './main';

import { ipcRenderer } from 'electron'
const sleep = m => new Promise(r => setTimeout(r, m))

export default {
  name: 'App',

  components: {
    MainFunction,
    PipeSystem,
    ManualOperation,
    IssueReport,
    DockServer
  },

  data: () => ({
    count: {
      mainFunction:    0,
      pipeSystem:      0,
      ManualOperation: 0,
      IssueReport:     0,
      DockServer:      0
    },
    informationBar: {
      ppm: -1,
      pressure: -1,
      online: false,
      docked: false,
      pressurized: false,
      maintain: false,
      reset: false
    },
    poweroff: { loading: false },
    tab: "mainFunction",
    reset: { loading: false },
    dialog: {
      alert: {
        model: false,
        level: "info",
        title: null,
        message: "For testing alert message",
        block: false,
      }
    }
  }),

  computed: {
    alertIcon() {
      switch (this.dialog.alert.level) {
        case "critical":
          return 'mdi-alert-circle'
        case "warning":
          return 'mdi-alert-circle'
        case "success":
          return 'mdi-check-circle'
        default:
          return 'mdi-information'
      }
    },
    alertIconColor() {
      switch (this.dialog.alert.level) {
        case "critical":
          return 'dialog-alert-gradient-icon-critical'
        case "warning":
          return 'dialog-alert-gradient-icon-warning'
        case "success":
          return 'dialog-alert-gradient-icon-success'
        default:
          return 'dialog-alert-gradient-icon-info'
      }
    },
    alertLevelText() {
      if (this.dialog.alert.title)
        return this.dialog.alert.title
      
      switch (this.dialog.alert.level) {
        case "critical":
          return '嚴重'
        case "warning":
          return '警告'
        case "success":
          return '成功'
        default:
          return '通知'
      }
    },
    convertedPressure() {
      // 轉換單位 kPa = 10Pa × 0.01
      return (this.informationBar.pressure * 0.01).toFixed(1)
    }
  },

  watch: {
    "informationBar.online": function(value) {
      if (value) {
        if (this.dialog.alert.title === '失去連線')
          this.dialog.alert.model = false
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '失去連線',
          message: '請重啟或等待PLC恢復連線',
          block: true,
        })
      }
    },
    "informationBar.maintain": function(value) {
      if (!value) {
        if (this.dialog.alert.title === '維修模式')
          this.dialog.alert.model = false
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '維修模式',
          message: '請將HMI上鎖以恢復正常運作模式',
          block: true,
        })
      }
    },
    "informationBar.reset": function(value) {
      if (!value) {
        if (this.dialog.alert.title === '安全復歸')
          this.dialog.alert.model = false
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '安全復歸',
          message: '清除PLC異常訊號以恢復正常運作模式',
          block: true,
        })
      }
    }
  },

  methods: {
    async get() {
      await ipcRenderer.invoke("main/get")
      .then(data => {
        this.informationBar.ppm         = data.ppm
        this.informationBar.pressure    = data.pressure
        this.informationBar.online      = data.online
        this.informationBar.docked      = data.docked
        this.informationBar.pressurized = data.pressurized
        this.informationBar.maintain    = data.maintain
        this.informationBar.reset       = data.reset
      })
    },
    async poweroffExecuter() {
      this.poweroff.loading = true
      ipcRenderer.send("main/poweroff")

      await sleep(600)
      this.poweroff.loading = false
    },
    //修正復歸PLC異常訊號功能
    async resetExecuter() {
      this.reset.loading = true

      // 1. 送出復歸請求，並等結果
      const ok = await ipcRenderer.invoke("main/reset");

      // 2. 顯示提示
      eventBus.$emit('alert', {
        level: ok ? 'success' : 'error',
        message: ok ? '復歸完成，PLC 異常已清除' : '復歸失敗，請再試一次或檢查 PLC 連線'
      })

      await sleep(600);
      this.reset.loading = false;
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      this.get()
    }, 500)
    this.interlock = setInterval(() => {
      ipcRenderer.invoke("main/getAlert")
      .then(data => {
        if (data) {
          eventBus.$emit('alert', {
            level:   data.level,
            title:   data.name,
            message: data.message,
          })
        }
      })
    })

    eventBus.$on('alert', (payload) => {
      console.log('Alert has benn trigger')
      console.log(payload)
      this.dialog.alert.level   = payload.level
      this.dialog.alert.title   = ('title' in payload) ? payload.title : null
      this.dialog.alert.message = payload.message
      this.dialog.alert.block   = ('block' in payload) ? payload.block : false
      this.dialog.alert.model   = true
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.interlock)
  }
};
</script>
