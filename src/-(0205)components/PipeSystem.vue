<template>
  <svg
    viewBox="0 0 1280 974"
    style="margin-top: 50px;"
  >
    <text x="6%" y="12%" dominant-baseline="middle" text-anchor="start" fill="#ffffff" font-size="36" font-weight="300">
      補液管路
    </text>
    <rect x="5%" y="15%" rx="10" ry="10" width="90%" height="30%" fill="#ffffff" fill-opacity="0.1" />

    <text x="19%" y="23%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      補液桶
    </text>
    <foreignObject x="15%" y="25%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#757575"><title>cup-water</title><path d="M18.32,8H5.67L5.23,4H18.77M12,19A3,3 0 0,1 9,16C9,14 12,10.6 12,10.6C12,10.6 15,14 15,16A3,3 0 0,1 12,19M3,2L5,20.23C5.13,21.23 5.97,22 7,22H17C18,22 18.87,21.23 19,20.23L21,2H3Z" /></svg>
    </foreignObject>
    <rect x="13%" y="36%" rx="15" ry="15" width="12%" height="6%" fill="#ffffff" fill-opacity="0.1" />
    <text x="19%" y="39.2%" dominant-baseline="middle" text-anchor="middle" :fill="(!feedingPipe.tank.topLimit && feedingPipe.tank.bottomLimit) ? '#27CD41' : '#FF9F0B'" font-size="24" font-weight="300">
      {{ (!feedingPipe.tank.topLimit && feedingPipe.tank.bottomLimit) ? '液位正常' : (!feedingPipe.tank.bottomLimit) ? '液位過低' : '液位過高' }}
    </text>

    <line x1="23%" y1="30%" x2="34%" y2="30%" stroke="#ffffff" stroke-width="4" stroke-opacity="0.6" />
    <text x="39%" y="23%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      幫浦
    </text>
    <foreignObject x="35%" y="25%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#388E3C"><title>pump</title><path d="M2 21V15H3.5C3.18 14.06 3 13.05 3 12C3 7.03 7.03 3 12 3H22V9H20.5C20.82 9.94 21 10.95 21 12C21 16.97 16.97 21 12 21H2M5 12C5 13.28 5.34 14.47 5.94 15.5L9.4 13.5C9.15 13.06 9 12.55 9 12C9 11.35 9.21 10.75 9.56 10.26L6.3 7.93C5.5 9.08 5 10.5 5 12M12 19C14.59 19 16.85 17.59 18.06 15.5L14.6 13.5C14.08 14.4 13.11 15 12 15L11.71 15L11.33 18.97L12 19M12 9C13.21 9 14.26 9.72 14.73 10.76L18.37 9.1C17.27 6.68 14.83 5 12 5V9M12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11Z" /></svg>
    </foreignObject>
    <rect x="31%" y="36%" rx="15" ry="15" width="16%" height="6%" fill="#ffffff" fill-opacity="0.1" />
    <rect v-show="feedingPipe.liquidpump.status === 'on'" x="31.5%" y="36.6%" rx="10" ry="10" width="7%" height="4.8%" fill="#ffffff" fill-opacity="0.7" />
    <text x="35%" y="39.2%" dominant-baseline="middle" text-anchor="middle" :fill="feedingLiquidPumpStatusOnColor" font-size="24" font-weight="400" @click="actionPump('on')">
      ON
    </text>
    <rect v-show="feedingPipe.liquidpump.status === 'off'" x="39.5%" y="36.6%" rx="10" ry="10" width="7%" height="4.8%" fill="#ffffff" fill-opacity="0.7" />
    <text x="43%" y="39.2%" dominant-baseline="middle" text-anchor="middle" :fill="feedingLiquidPumpStatusOffColor" font-size="24" font-weight="400" @click="actionPump('off')">
      OFF
    </text>

    <line x1="44%" y1="30%" x2="55%" y2="30%" stroke="#ffffff" stroke-width="4" stroke-opacity="0.6" />
    <text x="59%" y="23%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      液體流量計
    </text>
    <foreignObject x="55%" y="25%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#00ACC1"><title>water</title><path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" /></svg>
    </foreignObject>
    <rect x="52%" y="36%" rx="15" ry="15" width="14%" height="6%" fill="#ffffff" fill-opacity="0.1" />
    <text x="56%" y="39.2%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="300">
      {{ feedingPipe.liquidFlowSensor.value.toFixed(0) }}
    </text>
    <rect x="60.5%" y="36.6%" rx="10" ry="10" width="5%" height="4.8%" fill="#ffffff" fill-opacity="0.3" />
    <text x="63%" y="39.2%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="24" font-weight="400">
      L/m
    </text>

    <line x1="63%" y1="30%" x2="74%" y2="30%" stroke="#ffffff" stroke-width="4" stroke-opacity="0.6" />
    <text x="79%" y="23%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      上罩出水口
    </text>
    <foreignObject x="75%" y="25%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#FFA000"><title>valve</title><path d="M4 22H2V2H4M22 2H20V22H22M17.24 5.34L13.24 9.34A3 3 0 0 0 9.24 13.34L5.24 17.34L6.66 18.76L10.66 14.76A3 3 0 0 0 14.66 10.76L18.66 6.76Z" /></svg>
    </foreignObject>
    <rect x="71%" y="36%" rx="15" ry="15" width="16%" height="6%" fill="#ffffff" fill-opacity="0.1" />
    <rect v-show="feedingPipe.liquidOutlet.status === 'open'" x="71.5%" y="36.6%" rx="10" ry="10" width="7%" height="4.8%" fill="#ffffff" fill-opacity="0.7" />
    <text x="75%" y="39.2%" dominant-baseline="middle" text-anchor="middle" :fill="feedingLiquidOutletStatusOnColor" font-size="24" font-weight="400" @click="actionLiquidOutlet('open')">
      ON
    </text>
    <rect v-show="feedingPipe.liquidOutlet.status === 'close'" x="79.5%" y="36.6%" rx="10" ry="10" width="7%" height="4.8%" fill="#ffffff" fill-opacity="0.7" />
    <text x="83%" y="39.2%" dominant-baseline="middle" text-anchor="middle" :fill="feedingLiquidOutletStatusOffColor" font-size="24" font-weight="400" @click="actionLiquidOutlet('close')">
      OFF
    </text>


    <text x="6%" y="52%" dominant-baseline="middle" text-anchor="start" fill="#ffffff" font-size="36" font-weight="300">
      回收管路
    </text>
    <rect x="5%" y="55%" rx="10" ry="10" width="90%" height="30%" fill="#ffffff" fill-opacity="0.1" />

    <text x="19%" y="63%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      上罩氣體入口
    </text>
    <foreignObject x="15%" y="65%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#757575"><title>location-enter</title><path d="M14 12L10 8V11H2V13H10V16M22 12A10 10 0 0 1 2.46 15H4.59A8 8 0 1 0 4.59 9H2.46A10 10 0 0 1 22 12Z" /></svg>
    </foreignObject>

    <line x1="23%" y1="70%" x2="34%" y2="70%" stroke="#ffffff" stroke-width="4" stroke-opacity="0.6" />
    <text x="39%" y="63%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      空氣流量計
    </text>
    <foreignObject x="35%" y="65%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#1E88E5"><title>hvac</title><path d="M8.58 14C8.3 13.55 8.11 13.03 8.06 12.5H15.94C15.89 13.03 15.7 13.55 15.47 14H8.58M12 16C10.97 16 10.08 15.61 9.38 15H14.63C13.92 15.61 13.03 16 12 16M12 8C13.03 8 13.92 8.39 14.63 9H9.38C10.08 8.39 10.97 8 12 8M8.58 10H15.42C15.7 10.45 15.89 10.97 15.94 11.5H8.06C8.11 10.97 8.3 10.45 8.58 10M3 3V21H21V3H3M12 18C8.67 18 6 15.33 6 12S8.67 6 12 6 18 8.67 18 12 15.33 18 12 18Z" /></svg>
    </foreignObject>
    <rect x="32%" y="76%" rx="15" ry="15" width="14%" height="6%" fill="#ffffff" fill-opacity="0.1" />
    <text x="35.5%" y="79.2%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="300">
      {{ recyclePipe.airFlowSensor.value.toFixed(0) }}
    </text>
    <rect x="39%" y="76.6%" rx="10" ry="10" width="6.5%" height="4.8%" fill="#ffffff" fill-opacity="0.3" />
    <text x="42.25%" y="79.2%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="24" font-weight="400">
      L/mm
    </text>

    <line x1="44%" y1="70%" x2="55%" y2="70%" stroke="#ffffff" stroke-width="4" stroke-opacity="0.6" />
    <text x="59%" y="63%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      濾心
    </text>
    <foreignObject x="55%" y="65%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#D81B60"><title>air-filter</title><path d="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z" /></svg>
    </foreignObject>

    <line x1="63%" y1="70%" x2="74%" y2="70%" stroke="#ffffff" stroke-width="4" stroke-opacity="0.6" />
    <text x="79%" y="63%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="300">
      抽氣馬達
    </text>
    <foreignObject x="75%" y="65%" width="100" height="100">
      <svg viewBox="0 0 24 24" fill="#388E3C"><title>fan</title><path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" /></svg>
    </foreignObject>
    <rect x="71%" y="76%" rx="15" ry="15" width="16%" height="6%" fill="#ffffff" fill-opacity="0.1" />
    <rect v-show="recyclePipe.airPump.status === 'on'" x="71.5%" y="76.6%" rx="10" ry="10" width="7%" height="4.8%" fill="#ffffff" fill-opacity="0.7" />
    <text x="75%" y="79.2%" dominant-baseline="middle" text-anchor="middle" :fill="recycleAirPumpStatusOnColor" font-size="24" font-weight="400" @click="actionExhauster('on')">
      ON
    </text>
    <rect v-show="recyclePipe.airPump.status === 'off'" x="79.5%" y="76.6%" rx="10" ry="10" width="7%" height="4.8%" fill="#ffffff" fill-opacity="0.7" />
    <text x="83%" y="79.2%" dominant-baseline="middle" text-anchor="middle" :fill="recycleAirPumpStatusOffColor" font-size="24" font-weight="400" @click="actionExhauster('off')">
      OFF
    </text>
  </svg>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'PipeSystem',

  data: () => ({
    feedingPipe: {
      tank: {
        topLimit:    false,
        bottomLimit: false,
      },
      liquidpump: {
        status: "off",
      },
      liquidFlowSensor: {
        value: 153,
      },
      liquidOutlet: {
        status: "close"
      }
    },
    recyclePipe: {
      airInlet: {},
      airFlowSensor: {
        value: 13
      },
      filter: {},
      airPump: {
        status: "off"
      },
    }
  }),

  computed: {
    // feeding
    feedingLiquidPumpStatusOnColor: function() {
      if (this.feedingPipe.liquidpump.status === "on")
        return "#388E3C"
      return "#9E9E9E"
    },
    feedingLiquidPumpStatusOffColor: function() {
      if (this.feedingPipe.liquidpump.status === "off")
        return "#D32F2F"
      return "#9E9E9E"
    },
    feedingLiquidOutletStatusOnColor: function() {
      if (this.feedingPipe.liquidOutlet.status === "open")
        return "#388E3C"
      return "#9E9E9E"
    },
    feedingLiquidOutletStatusOffColor: function() {
      if (this.feedingPipe.liquidOutlet.status === "close")
        return "#D32F2F"
      return "#9E9E9E"
    },
    // recycle
    recycleAirPumpStatusOnColor: function() {
      if (this.recyclePipe.airPump.status === "on")
        return "#388E3C"
      return "#9E9E9E"
    },
    recycleAirPumpStatusOffColor: function() {
      if (this.recyclePipe.airPump.status === "off")
        return "#D32F2F"
      return "#9E9E9E"
    },
  },

  methods: {
    async get() {
      await ipcRenderer.invoke("pipeSystem/get")
      .then(data => {
        this.feedingPipe.tank.topLimit = data.liquidTopLimit
        this.feedingPipe.tank.bottomLimit = data.liquidBottomLimit
        this.feedingPipe.liquidpump.status = (data.liquidPumpOpened) ? 'on' : 'off'
        this.feedingPipe.liquidFlowSensor.value = data.liquidFlow
        this.feedingPipe.liquidOutlet.status = (data.liquidOutletSwitchOpened) ? 'open' : 'close'

        this.recyclePipe.airFlowSensor.value = data.airFlow
        this.recyclePipe.airPump.status = (data.airPumpOpened) ? 'on' : 'off'
      })
    },
    // feeding
    actionLiquidOutlet(action) {
      this.feedingPipe.liquidOutlet.status = action
      ipcRenderer.send("pipeSystem/setLiquidOutlet", action)
    },
    actionPump(action) {
      this.feedingPipe.liquidpump.status = action
      ipcRenderer.send("pipeSystem/setLiquidPump", action)
    },
    // recycle
    actionExhauster(action) {
      this.recyclePipe.airPump.status = action
      ipcRenderer.send("pipeSystem/setAirPump", action)
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.get()
    }, 700)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
