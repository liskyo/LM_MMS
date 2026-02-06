<template>
  <div>
    <svg
      viewBox="0 -20 1280 974"
      style="margin-top: 50px;"  
    >
      <!-- DOCK -->
      <text x="6%" y="8%" dominant-baseline="middle" text-anchor="start" fill="#ffffff" font-size="32" font-weight="400">
        ServerCache
      </text>
      <rect x="5%" y="10%" rx="10" ry="10" width="48%" height="50%" fill="#ffffff" fill-opacity="0.1" />

      <foreignObject x="29%" y="5%" width="10%" height="6%">
        <v-btn
          rounded
          block
          large
          class="text-h6"
          :style="{ background: 'rgba(255, 255, 255, 0.2)' }"
          :loading="action.ccdRecalibration.loading"
          @click="CCDRecalibrationExecuter"
        >
          CCD校正
        </v-btn>
      </foreignObject>
      <foreignObject x="40%" y="5%" width="13%" height="6%">
        <v-btn
          rounded
          block
          large
          class="text-h6"
          :style="{ background: 'rgba(255, 255, 255, 0.2)' }"
          :loading="action.launchRescanProcess.loading"
          @click="actionLaunchRescanProcess"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>refresh</title><path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>
          掃描槽位
        </v-btn>
      </foreignObject>

      <!-- Dock ID -->
      <text x="7%" y="14.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">1</text>
      <text x="7%" y="19.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">2</text>
      <text x="7%" y="24.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">3</text>
      <text x="7%" y="29.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">4</text>
      <text x="7%" y="34.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">5</text>
      <text x="7%" y="39.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">6</text>
      <text x="7%" y="44.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">7</text>
      <text x="7%" y="49.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">8</text>

      <!-- Dock Slots -->
      <rect x="9%" y="12.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[0].inUse) ? 0.4 : 0"  @click="clickDockSlot(0)" />
      <rect x="9%" y="12.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[0].id" />
      <rect x="9%" y="17.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[1].inUse) ? 0.4 : 0"  @click="clickDockSlot(1)" />
      <rect x="9%" y="17.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[1].id" />
      <rect x="9%" y="22.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[2].inUse) ? 0.4 : 0"  @click="clickDockSlot(2)" />
      <rect x="9%" y="22.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[2].id" />
      <rect x="9%" y="27.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[3].inUse) ? 0.4 : 0"  @click="clickDockSlot(3)" />
      <rect x="9%" y="27.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[3].id" />
      <rect x="9%" y="32.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[4].inUse) ? 0.4 : 0"  @click="clickDockSlot(4)" />
      <rect x="9%" y="32.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[4].id" />
      <rect x="9%" y="37.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[5].inUse) ? 0.4 : 0"  @click="clickDockSlot(5)" />
      <rect x="9%" y="37.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[5].id" />
      <rect x="9%" y="42.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[6].inUse) ? 0.4 : 0"  @click="clickDockSlot(6)" />
      <rect x="9%" y="42.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[6].id" />
      <rect x="9%" y="47.4%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.dock[7].inUse) ? 0.4 : 0"  @click="clickDockSlot(7)" />
      <rect x="9%" y="47.4%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.dockSlot === slots.dock[7].id" />

      <!-- Direction -->
      <rect x="65.5%" y="29.35%" rx="10" ry="10" width="70" height="70" fill="#ffffff" :fill-opacity="select.direction === 'mms' ? 0.8 : 0.0" />
      <foreignObject x="65.5%" y="29.35%" width="70" height="70" @click="select.direction = 'mms', select.dockSlot = null, select.mmsSlot = null">
        <svg viewBox="0 0 24 24" :class="select.direction === 'mms' ? 'arrow_activate' : 'arrow'"><title>arrow-right</title><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>
      </foreignObject>
      <rect x="65.6%" y="39.35%" rx="10" ry="10" width="70" height="70" fill="#ffffff" :fill-opacity="select.direction === 'dock' ? 0.8 : 0.0" />
      <foreignObject x="65.6%" y="39.35%" width="70" height="70" @click="select.direction = 'dock', select.dockSlot = null, select.mmsSlot = null">
        <svg viewBox="0 0 24 24" :class="select.direction === 'dock' ? 'arrow_activate' : 'arrow'"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
      </foreignObject>

      <!-- MMS -->
      <text x="85%" y="8%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="400">MMS</text>
      <rect x="75%"  y="10%" rx="10" ry="10" width="20%" height="50%" fill="#ffffff" fill-opacity="0.1" />

      <!-- MMS ID -->
      <text x="77%" y="14.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">1</text>
      <text x="77%" y="19.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">2</text>
      <text x="77%" y="24.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">3</text>
      <text x="77%" y="29.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">4</text>
      <text x="77%" y="34.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">5</text>
      <text x="77%" y="39.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">6</text>
      <text x="77%" y="44.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">7</text>
      <text x="77%" y="49.4%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">8</text>

      <!-- MMS Slots -->
      <rect x="78.8%" y="12%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[0].inUse) ? 0.4 : 0" @click="clickMMSSlot(0)" />
      <rect x="78.8%" y="12%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[0].id" />
      <rect x="78.8%" y="17%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[1].inUse) ? 0.4 : 0" @click="clickMMSSlot(1)" />
      <rect x="78.8%" y="17%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[1].id" />
      <rect x="78.8%" y="22%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[2].inUse) ? 0.4 : 0" @click="clickMMSSlot(2)" />
      <rect x="78.8%" y="22%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[2].id" />
      <rect x="78.8%" y="27%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[3].inUse) ? 0.4 : 0" @click="clickMMSSlot(3)" />
      <rect x="78.8%" y="27%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[3].id" />
      <rect x="78.8%" y="32%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[4].inUse) ? 0.4 : 0" @click="clickMMSSlot(4)" />
      <rect x="78.8%" y="32%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[4].id" />
      <rect x="78.8%" y="37%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[5].inUse) ? 0.4 : 0" @click="clickMMSSlot(5)" />
      <rect x="78.8%" y="37%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[5].id" />
      <rect x="78.8%" y="42%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[6].inUse) ? 0.4 : 0" @click="clickMMSSlot(6)" />
      <rect x="78.8%" y="42%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[6].id" />
      <rect x="78.8%" y="47%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[7].inUse) ? 0.4 : 0" @click="clickMMSSlot(7)" />
      <rect x="78.8%" y="47%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[7].id" />

      <defs>
        <linearGradient id="gradient-launch-button" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#007AFF" />
          <stop offset="100%" stop-color="#0040DD" />
        </linearGradient>
      </defs>
      <foreignObject x="77%" y="53%" width="16%" height="6%">
        <v-btn
          color="primary"
          rounded
          x-large
          block
          :style="{ fontWeight: '500', fontSize: '22px', background: 'linear-gradient(to bottom right, rgba(0, 122, 255, 1), rgba(10, 132, 255, 1))' }"
          :loading="action.launchExchangeProcess.loading"
          :disabled="!(select.dockSlot && select.mmsSlot)"
          @click="(select.direction === 'mms') ? actionLaunchExchangeDock2MMS() : actionLaunchExchangeMMS2Dock()"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
          開始置換
        </v-btn>
      </foreignObject>
    </svg>

    <v-dialog
      v-model="dialog.model"
      max-width="380"
      persistent
    >
      <v-card rounded="xl" light :style="{ background: 'rgba(255, 255, 255, 0.73)', backdropFilter: 'blur(15px)' }">
        <v-toolbar color="transparent" elevation="0">
          <v-spacer></v-spacer>
          <v-toolbar-title>{{ dialog.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>

        <v-list
          class="py-2 rounded-xl"
          color="transparent"
        >
          <v-list-item
            v-for="(task, i) in dialog.tasks"
            :key="i"
            style="height: 55px;"
          >
            <v-list-item-icon>
              <svg viewBox="0 0 24 24" v-show="task.status === 'process'"><title>arrow-right</title><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ task.name }}</v-list-item-title>
            </v-list-item-content>
            
            <v-list-item-icon>
              <v-progress-circular
                v-if="task.status === 'process'"
                indeterminate
                color="primary"
                size="20"
                width="2"
              ></v-progress-circular>
              <svg viewBox="0 0 24 24" v-else-if="task.status === 'done'" fill="#248A3D"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
              <svg viewBox="0 0 24 24" v-else-if="task.status === 'fail'" fill="#D70015"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item>
            <v-btn color="grey lighten-4" block rounded elevation="0" :disabled="dialog.closeBtn.disabled" @click="dialog.model = false">
              關閉
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { eventBus } from '@/main';

export default {
  name: 'DockServer',
  data: () => ({
    select: {
      tankId:   4,
      dockSlot: null,
      mmsSlot:  null,
      direction: "mms"
    },
    slots: {
      dock: [
        { id: 1, inUse: false },
        { id: 2, inUse: false },
        { id: 3, inUse: false },
        { id: 4, inUse: false },
        { id: 5, inUse: false },
        { id: 6, inUse: false },
        { id: 7, inUse: false },
        { id: 8, inUse: false },
      ],
      mms: [
        { id: 1, inUse: false },
        { id: 2, inUse: false },
        { id: 3, inUse: false },
        { id: 4, inUse: false },
        { id: 5, inUse: false },
        { id: 6, inUse: false },
        { id: 7, inUse: false },
        { id: 8, inUse: false },
      ]
    },
    action: {
      launchRescanProcess:    { loading: false },
      launchExchangeProcess:  { loading: false },
      ccdRecalibration: { loading: false },
    },
    dialog: {
      model: false,
      title: "無流程",
      tasks: [],
      closeBtn: { disabled: true }
    },
  }),
  
  methods: {
    getMMSlots() {
      ipcRenderer.invoke("dockServer/getMMSlots")
      .then(data => {
        this.slots.mms.forEach(item => {
          item.inUse = data[item.id - 1]
          // 檢查方向往MMS選擇的槽位不是空的，取消選取
          if (item.id === this.select.mmsSlot && this.select.direction === 'mms' && item.inUse)
            this.select.mmsSlot = null
          if (item.id === this.select.mmsSlot && this.select.direction === 'dock' && !item.inUse)
            this.select.mmsSlot = null
        })
      })
    },
    clickDockSlot(index) {
      if (
        (this.select.direction === 'mms' && this.slots.dock[index].inUse) ||
        (this.select.direction === 'dock' && !this.slots.dock[index].inUse)
      ) {
        this.select.dockSlot = this.slots.dock[index].id
      }
    },
    clickMMSSlot(index) {
      if (
        (this.select.direction === 'mms' && !this.slots.mms[index].inUse) ||
        (this.select.direction === 'dock' && this.slots.mms[index].inUse)
      ) {
        this.select.mmsSlot = this.slots.mms[index].id
      }
    },
    async getTankSlots() {
      try {
        const data = await ipcRenderer.invoke("dockServer/getTankSlots")
        this.slots.dock.forEach(item => {
          item.inUse = data[item.id - 1] ?? false
        })
        this.select.dockSlot = null

        return true
      } catch (err) {
        console.log(`讀取槽位失敗：${err.message || err}`)

        return false
      }
    },
    async actionLaunchRescanProcess() {
      this.dialog.title = "掃描槽位"
      this.dialog.tasks = [
        {
          name: "檢查手臂負載",
          status: "pending",
        },
        {
          name: "掃描中",
          status: "pending",
        },
        {
          name: "掃描完成",
          status: "pending",
        },
      ]
      this.dialog.model = true

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("dockServer/check/robotIsEmpty"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      const scanOK = await ipcRenderer.invoke("dockServer/action/robot/scanTankSlots")
      if (!scanOK) {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      const readOK = await this.getTankSlots()
      if (!readOK) {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "done"
      this.dialog.tasks[2].status = "done"
      this.dialog.closeBtn.disabled = false

      return
    },
    async actionLaunchExchangeDock2MMS() {
      console.log(`Launch server exchange process DOCK -> MMS ...`)
      this.dialog.title = "置換流程"
      this.dialog.tasks = [
        {
          name: "檢查手臂負載",
          status: "pending",
        },
        {
          name: `移動至DOCK槽位${this.select.dockSlot}`,
          status: "pending"
        },
        {
          name: "夾取Server",
          status: "pending"
        },
        {
          name: `移動至MMS槽位${this.select.mmsSlot}`,
          status: "pending"
        },
        {
          name: "安裝Server",
          status: "pending"
        },
        {
          name: "回歸原點",
          status: "pending"
        },
        {
          name: "置換完成",
          status: "pending",
        },
      ]
      this.dialog.model = true

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("dockServer/check/robotIsEmpty"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/move2slot", { slotId: this.select.dockSlot }))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[2].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/uninstallServer"))
        this.dialog.tasks[2].status = "done"
      else {
        this.dialog.tasks[2].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      this.slots.dock.forEach(item => {
        if (item.id === this.select.dockSlot)
          item.inUse = false
      })

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/move2slot", { slotId: this.select.mmsSlot + 100 }))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[4].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/installServer"))
        this.dialog.tasks[4].status = "done"
      else {
        this.dialog.tasks[4].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[5].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/return2origin"))
        this.dialog.tasks[5].status = "done"
      else {
        this.dialog.tasks[5].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[6].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },
    async actionLaunchExchangeMMS2Dock() {
      console.log(`Launch server exchange process MMS -> DOCK ...`)
      this.dialog.title = "置換流程"
      this.dialog.tasks = [
        {
          name: "檢查手臂負載",
          status: "pending",
        },
        {
          name: `移動至MMS槽位${this.select.mmsSlot}`,
          status: "pending"
        },
        {
          name: "夾取Server",
          status: "pending"
        },
        {
          name: `移動至Dock槽位${this.select.dockSlot}`,
          status: "pending"
        },
        {
          name: "安裝Server",
          status: "pending"
        },
        {
          name: "回歸原點",
          status: "pending"
        },
        {
          name: "置換完成",
          status: "pending",
        },
      ]
      this.dialog.model = true

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("dockServer/check/robotIsEmpty"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/move2slot", { slotId: this.select.mmsSlot + 100 }))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[2].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/uninstallServer"))
        this.dialog.tasks[2].status = "done"
      else {
        this.dialog.tasks[2].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/move2slot", { slotId: this.select.dockSlot }))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[4].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/installServer"))
        this.dialog.tasks[4].status = "done"
      else {
        this.dialog.tasks[4].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[5].status = "process"
      if (await ipcRenderer.invoke("dockServer/action/robot/return2origin"))
        this.dialog.tasks[5].status = "done"
      else {
        this.dialog.tasks[5].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[6].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },
    async CCDRecalibrationExecuter() {
      this.action.ccdRecalibration.loading = true
      if (await ipcRenderer.invoke("dockServer/action/robot/recalibration", { tankId: this.tankId })) {
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
      this.action.ccdRecalibration.loading = false
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getMMSlots()
    }, 500)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.arrow {
  fill: #BDBDBD;
}
.arrow_activate {
  fill: #673AB7;
}
.icon {
  width: 26px;
  height: 26px;
  fill: #FFF;
  opacity: 0.5;
  margin-right: 8px;
}
</style>
