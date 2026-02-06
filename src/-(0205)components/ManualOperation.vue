<template>
  <v-row style="height: 1024px" class="ma-0">
    <v-col cols="auto" style="width: 40%;" class="d-flex justify-space-around align-center ml-4">
      <v-img
        :aspect-ratio="1"
        src="@/assets/TMRobot.png"
      ></v-img>
      <div class="robot-reset-btn">
        <v-btn
          color="#4f545c"
          rounded
          x-large
          :disabled="globalDisabled"
          :loading="returnOrigin.loading"
          @click="returnOriginExecuter"
        >
          <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
          回到原點
        </v-btn>
      </div>
    </v-col>
    <v-col class="mr-9" style="margin-top: 100px;">
      <v-row dense>
        <v-col cols="12">
          <v-card
            class="mr-4 ml-4 mt-6"
            color="#2f3136"
            rounded="xl"
          >
            <div class="pa-4">
              <div class="text-h5">手臂</div>
            </div>

            <v-divider></v-divider>

            <div class="pa-4 d-flex align-center">
              <span class="text-h6 ms-1">
                TANK
              </span>

              <v-spacer></v-spacer>

              <NumberSelector
                v-model="location.tank.select"
                :min="1"
                :max="18"
                color="#4f545c"
                prefix="移至 SLOT "
                xlarge
              />
              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="location.tank.execute.loading"
                @click="locationTankExecuter"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                執行
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            class="mr-4 ml-4"
            color="#2f3136"
            rounded="xl"
          >

            <div class="pa-4 d-flex align-center">
              <span class="text-h6 ms-1">
                儲物槽
              </span>

              <v-spacer></v-spacer>

              <NumberSelector
                v-model="location.storage.select"
                :min="1"
                :max="18"
                color="#4f545c"
                prefix="移至 SLOT "
                xlarge
              />
              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="location.storage.execute.loading"
                @click="locationStorageExecuter"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                執行
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            class="mr-4 ml-4"
            color="#2f3136"
            rounded="xl"
          >
            <div class="pa-4 d-flex align-center">
              <span class="text-h6 ms-1">
                理線蓋
              </span>

              <v-spacer></v-spacer>

              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="wireCover.open.loading"
                @click="wireCoverExecuter('open')"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                開啟
              </v-btn>
              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="wireCover.close.loading"
                @click="wireCoverExecuter('close')"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                關閉
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            class="mr-4 ml-4"
            color="#2f3136"
            rounded="xl"
          >
            <div class="pa-4 d-flex align-center">
              <span class="text-h6 ms-1">
                夾爪動作
              </span>

              <v-spacer></v-spacer>

              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="gripper.install.loading"
                @click="gripperExecuter('install')"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                安裝
              </v-btn>
              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="gripper.uninstall.loading"
                @click="gripperExecuter('uninstall')"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                移除
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense class="mt-4">
        <v-col>
          <v-card
            class="mr-4 ml-4 mt-6"
            color="#2f3136"
            rounded="xl"
          >
            <div class="pa-4">
              <div class="text-h5">其他</div>
            </div>

            <v-divider></v-divider>

            <div class="pa-4 d-flex align-center">
              <span class="text-h6 ms-1 mr-2">
                TANK
              </span>
              <NumberSelector
                v-model="tankId"
                :min="4"
                :max="4"
                color="#4f545c"
                xlarge
              />
              <span class="text-h6">
                上蓋
              </span>

              <v-spacer></v-spacer>

              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="tankCover.open.loading"
                @click="tankCoverExecuter('open')"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                開啟
              </v-btn>
              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="tankCover.close.loading"
                @click="tankCoverExecuter('close')"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                關閉
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            class="mr-4 ml-4"
            color="#2f3136"
            rounded="xl"
          >
            <div class="pa-4 d-flex align-center">
              <span class="text-h6 ms-1 mr-2">
                TANK
              </span>
              <NumberSelector
                v-model="tankId"
                :min="4"
                :max="4"
                color="#4f545c"
                xlarge
              />
              <span class="text-h6">
                CCD校正
              </span>

              <v-spacer></v-spacer>

              <v-btn
                class="me-2"
                color="#4f545c"
                rounded
                x-large
                :disabled="globalDisabled"
                :loading="ccdRecalibration.loading"
                @click="CCDRecalibrationExecuter"
              >
                <svg viewBox="0 0 24 24"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
                執行
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.robot-reset-btn {
  position: fixed;
  bottom: 20%;
  left: 21%;
  transform: translateX(-20%);
}
svg {
  width: 25px;
  fill: #FAFAFA;
  margin-right: 8px;
}
</style>

<script>
import NumberSelector from '@/components/NumberSelector.vue';

import { ipcRenderer } from 'electron';
import { eventBus } from '@/main';
// const sleep = m => new Promise(r => setTimeout(r, m))

export default {
  name: 'ManualOperation',

  components: {
    NumberSelector
  },

  computed: {
    globalDisabled() {
      return (
        this.returnOrigin.loading ||
        this.location.tank.execute.loading ||
        this.location.storage.execute.loading ||
        this.wireCover.open.loading ||
        this.wireCover.close.loading ||
        this.gripper.install.loading ||
        this.gripper.uninstall.loading ||
        this.tankCover.open.loading ||
        this.tankCover.close.loading ||
        this.ccdRecalibration.loading
      )
    }
  },

  data: () => ({
    tankId: 4,
    returnOrigin: { loading: false },
    location: {
      tank: {
        select: 1,
        execute: { loading: false },
      },
      storage: {
        select: 1,
        execute: { loading: false },
      }
    },
    wireCover: {
      open:    { loading: false },
      close:   { loading: false },
    },
    gripper: {
      install:   { loading: false },
      uninstall: { loading: false },
    },
    tankCover: {
      open:    { loading: false },
      close:   { loading: false },
    },
    ccdRecalibration: { loading: false },
  }),

  methods: {
    async returnOriginExecuter() {
      this.returnOrigin.loading = true
      if (await ipcRenderer.invoke("manualOperation/action/robot/return2origin")) {
        eventBus.$emit('alert', {
          level: 'success',
          title: '成功',
          message: '回手臂原點成功',
        })
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '失敗',
          message: '回手臂原點失敗',
        })
      }
      this.returnOrigin.loading = false
    },
    async locationTankExecuter() {
      this.location.tank.execute.loading = true
      if (await ipcRenderer.invoke("manualOperation/action/robot/move2slot", { slotId: this.location.tank.select })) {
        eventBus.$emit('alert', {
          level: 'success',
          title: '成功',
          message: `移動至TANK Slot${this.location.tank.select}上空成功`,
        })
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '失敗',
          message: `移動至TANK Slot${this.location.tank.select}上空失敗`,
        })
      }
      this.location.tank.execute.loading = false
    },
    async locationStorageExecuter() {
      this.location.storage.execute.loading = true
      if (await ipcRenderer.invoke("manualOperation/action/robot/move2slot", { slotId: this.location.storage.select + 100 })) {
        eventBus.$emit('alert', {
          level: 'success',
          title: '成功',
          message: `移動至MMS Slot${this.location.storage.select}上空成功`,
        })
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '失敗',
          message: `移動至MMS Slot${this.location.storage.select}上空失敗`,
        })
      }
      this.location.storage.execute.loading = false
    },
    async gripperExecuter(action) {
      if (action === "install") {
        this.gripper.install.loading = true
        if (await ipcRenderer.invoke("manualOperation/action/robot/installServer")) {
          eventBus.$emit('alert', {
            level: 'success',
            title: '成功',
            message: '安裝Server成功',
          })
        }
        else {
          eventBus.$emit('alert', {
            level: 'warning',
            title: '失敗',
            message: '安裝Server失敗',
          })
        }
        this.gripper.install.loading = false
      }
      else if (action === "uninstall") {
        this.gripper.uninstall.loading = true
        if (await ipcRenderer.invoke("manualOperation/action/robot/uninstallServer")) {
          eventBus.$emit('alert', {
            level: 'success',
            title: '成功',
            message: '移除Server成功',
          })
        }
        else {
          eventBus.$emit('alert', {
            level: 'warning',
            title: '失敗',
            message: '移除Server失敗',
          })
        }
        this.gripper.uninstall.loading = false
      }
    },
    async wireCoverExecuter(action) {
      if (action === "open") {
        this.wireCover.open.loading = true
        if (await ipcRenderer.invoke("manualOperation/action/robot/openWireCover")) {
          eventBus.$emit('alert', {
            level: 'success',
            title: '成功',
            message: '開啟理線蓋成功',
          })
        }
        else {
          eventBus.$emit('alert', {
            level: 'warning',
            title: '失敗',
            message: '開啟理線蓋失敗',
          })
        }
        this.wireCover.open.loading = false
      }
      else if (action === "close") {
        this.wireCover.close.loading = true
        if (await ipcRenderer.invoke("manualOperation/action/robot/closeWireCover")) {
          eventBus.$emit('alert', {
            level: 'success',
            title: '成功',
            message: '關閉理線蓋成功',
          })
        }
        else {
          eventBus.$emit('alert', {
            level: 'warning',
            title: '失敗',
            message: '關閉理線蓋失敗',
          })
        }
        this.wireCover.close.loading = false
      }
    },
    async tankCoverExecuter(action) {
      if (action === "open") {
        this.tankCover.open.loading = true
        if (await ipcRenderer.invoke("manualOperation/action/tank/openCover", { tankId: this.tankId })) {
          eventBus.$emit('alert', {
            level: 'success',
            title: '成功',
            message: `開啟TANK${this.tankId}上蓋成功`,
          })
        }
        else {
          eventBus.$emit('alert', {
            level: 'warning',
            title: '失敗',
            message: `開啟TANK${this.tankId}上蓋失敗`,
          })
        }
        this.tankCover.open.loading = false
      }
      else if (action === "close") {
        this.tankCover.close.loading = true
        if (await ipcRenderer.invoke("manualOperation/action/tank/closeCover", { tankId: this.tankId })) {
          eventBus.$emit('alert', {
            level: 'success',
            title: '成功',
            message: `關閉TANK${this.tankId}上蓋成功`,
          })
        }
        else {
          eventBus.$emit('alert', {
            level: 'warning',
            title: '失敗',
            message: `關閉TANK${this.tankId}上蓋失敗`,
          })
        }
        this.tankCover.close.loading = false
      }
    },
    async CCDRecalibrationExecuter() {
      this.ccdRecalibration.loading = true
      if (await ipcRenderer.invoke("manualOperation/action/robot/recalibration", { tankId: this.tankId })) {
        eventBus.$emit('alert', {
          level: 'success',
          title: '成功',
          message: 'CCD校點執行成功',
        })
      }
      else {
        eventBus.$emit('alert', {
          level: 'warning',
          title: '失敗',
          message: 'CCD校點執行失敗',
        })
      }
      this.ccdRecalibration.loading = false
    }
  },
}
</script>
