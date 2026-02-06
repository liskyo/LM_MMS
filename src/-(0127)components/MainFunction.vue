<template>
  <div>
    <svg
      viewBox="0 -20 1280 974"
      style="margin-top: 50px;"  
    >
      <!-- TANK -->
      <text x="6%" y="8%" dominant-baseline="middle" text-anchor="start" fill="#ffffff" font-size="32" font-weight="400">
        TANK
      </text>
      <foreignObject x="13%" y="5%" width="8%" height="10%">
        <NumberSelector
          v-model="select.tankId"
          :min="4"
          :max="4"
          color="grey darken-3"
          large
          btnClass="text-h6"
        />
      </foreignObject>
      <rect x="5%" y="10%" rx="10" ry="10" width="48%" height="77.5%" fill="#ffffff" fill-opacity="0.1" />
      <foreignObject x="35%" y="5%" width="13%" height="6%">
        <v-btn
          rounded
          block
          large
          class="text-h6"
          :style="{ background: 'rgba(255, 255, 255, 0.2)' }"
          @click="getTankSlots()"
        >
          獲取槽位
        </v-btn>
      </foreignObject>
      <foreignObject x="49%" y="5%" width="13%" height="6%">
        <v-btn
          rounded
          block
          large
          class="text-h6"
          :style="{ background: 'rgba(255, 255, 255, 0.2)' }"
          :loading="action.launchRescanProcess.loading"
          @click="actionLaunchRescanProcess()"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>refresh</title><path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>
          掃描槽位
        </v-btn>
      </foreignObject>

      <!-- Network Switch -->
      <rect x="53.5%" y="10%" rx="10" ry="10" width="8.5%" height="77.5%" fill="#ffffff" fill-opacity="0.1" />
      <text x="57.5%" y="48.75%" fill="#ffffff" dominant-baseline="middle" text-anchor="middle" font-size="34" font-weight="300" style="writing-mode: vertical-lr;">Network Switch</text>

      <!-- Tank ID -->
      <text x="7%" y="13%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">1</text>
      <text x="7%" y="17%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">2</text>
      <text x="7%" y="21%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">3</text>
      <text x="7%" y="25%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">4</text>
      <text x="7%" y="29%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">5</text>
      <text x="7%" y="33%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">6</text>
      <text x="7%" y="37%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">7</text>
      <text x="7%" y="41%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">8</text>
      <text x="7%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">9</text>
      <text x="7%" y="49%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">10</text>
      <text x="7%" y="53%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">11</text>
      <text x="7%" y="57%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">12</text>
      <text x="7%" y="61%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">13</text>
      <text x="7%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">14</text>
      <text x="7%" y="69%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">15</text>
      <text x="7%" y="73%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">16</text>
      <text x="7%" y="77%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">17</text>
      <text x="7%" y="81%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">18</text>
      <text x="7%" y="85%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="400">19</text>

      <!-- Tank Slots -->
      <rect x="9%" y="11%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[0].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[0].inUse) || (select.direction === 'tank' && !slots.tank[0].inUse)) ? select.tankSlot = slots.tank[0].id : null }" />
      <rect x="9%" y="11%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[0].id" />
      <rect x="9%" y="15%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[1].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[1].inUse) || (select.direction === 'tank' && !slots.tank[1].inUse)) ? select.tankSlot = slots.tank[1].id : null }" />
      <rect x="9%" y="15%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[1].id" />
      <rect x="9%" y="19%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[2].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[2].inUse) || (select.direction === 'tank' && !slots.tank[2].inUse)) ? select.tankSlot = slots.tank[2].id : null }" />
      <rect x="9%" y="19%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[2].id" />
      <rect x="9%" y="23%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[3].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[3].inUse) || (select.direction === 'tank' && !slots.tank[3].inUse)) ? select.tankSlot = slots.tank[3].id : null }" />
      <rect x="9%" y="23%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[3].id" />
      <rect x="9%" y="27%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[4].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[4].inUse) || (select.direction === 'tank' && !slots.tank[4].inUse)) ? select.tankSlot = slots.tank[4].id : null }" />
      <rect x="9%" y="27%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[4].id" />
      <rect x="9%" y="31%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[5].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[5].inUse) || (select.direction === 'tank' && !slots.tank[5].inUse)) ? select.tankSlot = slots.tank[5].id : null }" />
      <rect x="9%" y="31%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[5].id" />
      <rect x="9%" y="35%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[6].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[6].inUse) || (select.direction === 'tank' && !slots.tank[6].inUse)) ? select.tankSlot = slots.tank[6].id : null }" />
      <rect x="9%" y="35%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[6].id" />
      <rect x="9%" y="39%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[7].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[7].inUse) || (select.direction === 'tank' && !slots.tank[7].inUse)) ? select.tankSlot = slots.tank[7].id : null }" />
      <rect x="9%" y="39%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[7].id" />
      <rect x="9%" y="43%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[8].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[8].inUse) || (select.direction === 'tank' && !slots.tank[8].inUse)) ? select.tankSlot = slots.tank[8].id : null }" />
      <rect x="9%" y="43%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[8].id" />
      <rect x="9%" y="47%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[9].inUse) ? 0.4 : 0"  @click="() => { ((select.direction === 'mms' && slots.tank[9].inUse) || (select.direction === 'tank' && !slots.tank[9].inUse)) ? select.tankSlot = slots.tank[9].id : null }" />
      <rect x="9%" y="47%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[9].id" />
      <rect x="9%" y="51%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[10].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[10].inUse) || (select.direction === 'tank' && !slots.tank[10].inUse)) ? select.tankSlot = slots.tank[10].id : null }" />
      <rect x="9%" y="51%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[10].id" />
      <rect x="9%" y="55%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[11].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[11].inUse) || (select.direction === 'tank' && !slots.tank[11].inUse)) ? select.tankSlot = slots.tank[11].id : null }" />
      <rect x="9%" y="55%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[11].id" />
      <rect x="9%" y="59%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[12].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[12].inUse) || (select.direction === 'tank' && !slots.tank[12].inUse)) ? select.tankSlot = slots.tank[12].id : null }" />
      <rect x="9%" y="59%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[12].id" />
      <rect x="9%" y="63%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[13].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[13].inUse) || (select.direction === 'tank' && !slots.tank[13].inUse)) ? select.tankSlot = slots.tank[13].id : null }" />
      <rect x="9%" y="63%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[13].id" />
      <rect x="9%" y="67%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[14].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[14].inUse) || (select.direction === 'tank' && !slots.tank[14].inUse)) ? select.tankSlot = slots.tank[14].id : null }" />
      <rect x="9%" y="67%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[14].id" />
      <rect x="9%" y="71%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[15].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[15].inUse) || (select.direction === 'tank' && !slots.tank[15].inUse)) ? select.tankSlot = slots.tank[15].id : null }" />
      <rect x="9%" y="71%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[15].id" />
      <rect x="9%" y="75%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[16].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[16].inUse) || (select.direction === 'tank' && !slots.tank[16].inUse)) ? select.tankSlot = slots.tank[16].id : null }" />
      <rect x="9%" y="75%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[16].id" />
      <rect x="9%" y="79%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[17].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[17].inUse) || (select.direction === 'tank' && !slots.tank[17].inUse)) ? select.tankSlot = slots.tank[17].id : null }" />
      <rect x="9%" y="79%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[17].id" />
      <rect x="9%" y="83%" rx="10" ry="10" width="43%" height="3.5%" fill="#ffffff" :fill-opacity="(slots.tank[18].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && slots.tank[18].inUse) || (select.direction === 'tank' && !slots.tank[18].inUse)) ? select.tankSlot = slots.tank[18].id : null }" />
      <rect x="9%" y="83%" rx="10" ry="10" width="43%" height="3.5%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.tankSlot === slots.tank[18].id" />

      <!-- Direction -->
      <rect x="65.5%" y="29.35%" rx="10" ry="10" width="70" height="70" fill="#ffffff" :fill-opacity="select.direction === 'mms' ? 0.8 : 0.0" />
      <foreignObject x="65.5%" y="29.35%" width="70" height="70" @click="select.direction = 'mms', select.tankSlot = null, select.mmsSlot = null">
        <svg viewBox="0 0 24 24" :class="select.direction === 'mms' ? 'arrow_activate' : 'arrow'"><title>arrow-right</title><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>
      </foreignObject>
      <rect x="65.6%" y="39.35%" rx="10" ry="10" width="70" height="70" fill="#ffffff" :fill-opacity="select.direction === 'tank' ? 0.8 : 0.0" />
      <foreignObject x="65.6%" y="39.35%" width="70" height="70" @click="select.direction = 'tank', select.tankSlot = null, select.mmsSlot = null">
        <svg viewBox="0 0 24 24" :class="select.direction === 'tank' ? 'arrow_activate' : 'arrow'"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>
      </foreignObject>

      <!-- MMS -->
      <text x="85%" y="8%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="400">
        MMS
      </text>
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
      <rect x="78.8%" y="12%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[0].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[0].inUse) || (select.direction === 'tank' && slots.mms[0].inUse)) ? select.mmsSlot = slots.mms[0].id : null }" />
      <rect x="78.8%" y="12%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[0].id" />
      <rect x="78.8%" y="17%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[1].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[1].inUse) || (select.direction === 'tank' && slots.mms[1].inUse)) ? select.mmsSlot = slots.mms[1].id : null }" />
      <rect x="78.8%" y="17%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[1].id" />
      <rect x="78.8%" y="22%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[2].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[2].inUse) || (select.direction === 'tank' && slots.mms[2].inUse)) ? select.mmsSlot = slots.mms[2].id : null }" />
      <rect x="78.8%" y="22%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[2].id" />
      <rect x="78.8%" y="27%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[3].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[3].inUse) || (select.direction === 'tank' && slots.mms[3].inUse)) ? select.mmsSlot = slots.mms[3].id : null }" />
      <rect x="78.8%" y="27%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[3].id" />
      <rect x="78.8%" y="32%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[4].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[4].inUse) || (select.direction === 'tank' && slots.mms[4].inUse)) ? select.mmsSlot = slots.mms[4].id : null }" />
      <rect x="78.8%" y="32%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[4].id" />
      <rect x="78.8%" y="37%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[5].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[5].inUse) || (select.direction === 'tank' && slots.mms[5].inUse)) ? select.mmsSlot = slots.mms[5].id : null }" />
      <rect x="78.8%" y="37%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[5].id" />
      <rect x="78.8%" y="42%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[6].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[6].inUse) || (select.direction === 'tank' && slots.mms[6].inUse)) ? select.mmsSlot = slots.mms[6].id : null }" />
      <rect x="78.8%" y="42%" rx="10" ry="10" width="15%" height="4%" fill-opacity="0" stroke="white" stroke-width="3" v-show="select.mmsSlot === slots.mms[6].id" />
      <rect x="78.8%" y="47%" rx="10" ry="10" width="15%" height="4%" fill="#ffffff" :fill-opacity="(slots.mms[7].inUse) ? 0.4 : 0" @click="() => { ((select.direction === 'mms' && !slots.mms[7].inUse) || (select.direction === 'tank' && slots.mms[7].inUse)) ? select.mmsSlot = slots.mms[7].id : null }" />
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
          :disabled="!(select.tankSlot && select.mmsSlot) || !status.tankCoverOpened"
          @click="(select.direction === 'mms') ? actionLaunchExchangeTank2MMS() : actionLaunchExchangeMMS2Tank()"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
          開始置換
        </v-btn>
      </foreignObject>
      <!-- Replenish Process : 液位確認 -->
      <text x="67.5%" y="65.5%" dominant-baseline="middle" text-anchor="middle"
            fill="#ffffff" font-size="28" font-weight="400">
        液位確認
      </text>

      <!-- 背景卡片（高度與對接流程一致 20%） -->
      <rect x="62.8%" y="67.6%" rx="10" ry="10" width="15.8%" height="20%"
            fill="#ffffff" fill-opacity="0.1" />

      <!-- TANK液高 -->
      <text x="63.8%" y="70%" dominant-baseline="middle" text-anchor="start"
            fill="#ffffff" font-size="18" fill-opacity="0.7">
        TANK液高
      </text>
      <text x="77.5%" y="70%" dominant-baseline="middle" text-anchor="end"
            fill="#ffffff" font-size="18">
        {{ status.tankLiquidHeight }} mm
      </text>

      <!-- 目標液高 -->
      <text x="63.8%" y="73.5%" dominant-baseline="middle" text-anchor="start"
            fill="#ffffff" font-size="18" fill-opacity="0.7">
        目標液高
      </text>
      <text x="77.5%" y="73.5%" dominant-baseline="middle" text-anchor="end"
            fill="#ffffff" font-size="18">
        {{ status.targetLiquidHeight }} mm
      </text>

      <!-- 狀態條 -->
      <rect
        v-bind:fill="status.tankLiquidHeight < status.targetLiquidHeight ? '#ff5252' : '#27CD41'"
        x="63.7%"
        y="76.2%"
        width="14%"
        height="4%"
        rx="12" ry="12"
        fill-opacity="0.9"
      />
      <text
        x="70.7%"
        y="78.2%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#ffffff"
        font-size="16"
        font-weight="600"
      >
        {{ status.tankLiquidHeight < status.targetLiquidHeight ? '液位過低！請補液' : '液位正常' }}
      </text>

      <!-- 確認液位按鈕（呼叫 getLiquidLevel 並更新確認時間） -->
      <foreignObject x="63.7%" y="81.5%" width="14%" height="4.5%">
        <v-btn
          rounded
          small
          block
          :style="{ fontWeight: '500', fontSize: '14px', background: 'rgba(255, 255, 255, 0.25)' }"
          @click="getLiquidLevel"
        >
          確認液位
        </v-btn>
      </foreignObject>

      <!-- 確認時間（同一行、短格式右對齊不超出區域，每次 getLiquidLevel 呼叫時更新） -->
      <text x="63.8%" y="86%" dominant-baseline="middle" text-anchor="start"
            fill="#ffffff" font-size="12" fill-opacity="0.8">
        確認時間
      </text>
      <text x="77.5%" y="86%" dominant-baseline="middle" text-anchor="end"
            fill="#ffffff" font-size="12">
        {{ liquidLevelConfirmedAtCompact }}
      </text>
      <!-- Replenish Process 
      <text x="67.5%" y="65.5%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="400">
        液位確認
      </text>
      <rect x="62.8%" y="67.6%" rx="10" ry="10" width="15.8%" height="20%" fill="#ffffff" fill-opacity="0.1" />
      <text x="63.8%" y="71%" dominant-baseline="start" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        TANK液高
      </text>
      <text x="77.5%" y="71%" dominant-baseline="end" text-anchor="end" fill="#ffffff" font-size="18" font-weight="400">
        {{ status.tankLiquidHeight }} mm
      </text>
      <text x="63.8%" y="74%" dominant-baseline="start" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        目標液高
      </text>
      <text x="77.5%" y="74%" dominant-baseline="end" text-anchor="end" fill="#ffffff" font-size="18" font-weight="400">
        {{ status.targetLiquidHeight }} mm
      </text>
      <text
        x="70%"
        y="79%"
        dominant-baseline="middle"
        text-anchor="middle"
        :fill="status.tankLiquidHeight < status.targetLiquidHeight ? '#ff5252' : '#4caf50'"
        font-size="20"
        font-weight="600"
      >
        {{ status.tankLiquidHeight < status.targetLiquidHeight ? '液位過低！請補液' : '液位正常' }}
      </text>
      -->
      <!-- 原有功能移除
      <text x="63.8%" y="77%" dominant-baseline="start" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        補液槽
      </text>
      <text x="77.5%" y="77%" dominant-baseline="end" text-anchor="end" :fill="(status.replenishTankNormal) ? '#27CD41' : '#FF9500'" font-size="18" font-weight="400">
        {{ (status.replenishTankNormal) ? '正常' : '液體不足' }}
      </text>
      <text x="63.8%" y="80%" dominant-baseline="start" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        幫浦
      </text>
      <text x="77.5%" y="80%" dominant-baseline="end" text-anchor="end" :fill="(status.pumpEnabled) ? '#FF9500' : '#FFFFFF'" font-size="18" font-weight="400">
        {{ (status.pumpEnabled) ? '已啟動' : '未啟動' }}
      </text>
      <foreignObject x="63.7%" y="81.8%" width="14%" height="6%">
        <v-btn
          rounded
          large
          block
          :style="{ fontWeight: '500', fontSize: '18px', background: 'linear-gradient(to bottom right, rgba(0, 122, 255, 1), rgba(10, 132, 255, 1))' }"
          :loading="action.launchReplenishProcess.loading"
          :disabled="!status.tankCoverOpened"
          @click="actionLaunchReplenishProcess"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
          開始補液
        </v-btn>
      </foreignObject>
      -->

      <!-- Un-Docking Process -->
      <text x="84%" y="65.5%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="400">
        對接流程
      </text>
      <rect x="79.2%" y="67.6%" rx="10" ry="10" width="15.8%" height="20%" fill="#ffffff" fill-opacity="0.1" />
      <!-- 對接狀態
      <text x="80.2%" y="71%" dominant-baseline="start" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        對接狀態
      </text>
      <text x="94%" y="71%" dominant-baseline="end" text-anchor="end" :fill="(status.docked) ? '#27CD41' : '#FFFFFF'" font-size="18" font-weight="400">
        {{ (status.docked) ? '已對接' : '未對接' }}
      </text>
      -->
      <text x="80.2%" y="72%" dominant-baseline="middle" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        氣密狀態
      </text>
      <text x="94%" y="72%" dominant-baseline="middle" text-anchor="end" :fill="(status.airTighted) ? '#27CD41' : '#FFFFFF'" font-size="18" font-weight="400">
        {{ (status.airTighted) ? '已達成' : '未達成' }}
      </text>
      <text x="80.2%" y="76%" dominant-baseline="middle" text-anchor="start" fill="#ffffff" font-size="18" font-weight="400" fill-opacity="0.7">
        TANK上蓋
      </text>
      <text x="94%" y="76%" dominant-baseline="middle" text-anchor="end" :fill="(status.tankCoverOpened) ? '#FF9500' : '#FFFFFF'" font-size="18" font-weight="400">
        {{ (status.tankCoverOpened) ? '開啟' : '關閉' }}
      </text>

      <foreignObject x="80.1%" y="80.8%" width="14%" height="6%">
        <v-btn
          v-if="status.tankCoverOpened"
          rounded
          large
          block
          :style="{ fontWeight: '500', fontSize: '18px', background: 'linear-gradient(to bottom right, rgba(255, 60, 47, 1), rgba(215, 0, 21, 1))' }"
          :loading="action.launchUndockingProcess.loading"
          @click="actionLaunchUndockingProcess"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
          解除對接
        </v-btn>
        <v-btn
          v-else
          rounded
          large
          block
          :style="{ fontWeight: '500', fontSize: '18px', background: 'linear-gradient(to bottom right, rgba(0, 122, 255, 1), rgba(10, 132, 255, 1))' }"
          :loading="action.launchDockingProcess.loading"
          @click="actionLaunchDockingProcess"
        >
          <svg viewBox="0 0 24 24" class="icon"><title>gesture-tap</title><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" /></svg>
          開始對接
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
import NumberSelector from '@/components/NumberSelector.vue';

// import { eventBus } from '@/main';
import { ipcRenderer } from 'electron';

const sleep = m => new Promise(r => setTimeout(r, m))

export default {
  name: 'MainFunction',

  components: {
    NumberSelector
  },

  data: () => ({
    select: {
      tankId:   4,
      tankSlot: null,
      mmsSlot:  null,
      direction: "mms"
    },
    status: {
      tankLiquidHeight: 0,
      targetLiquidHeight: 620,
      replenishTankNormal: true,
      pumpEnabled: false,
      docked: false,
      airTighted: false,
      tankCoverOpened: false,
      liquidLevelConfirmedAt: null,
    },
    slots: {
      tank: [
        { id: 1,  hostname: "GIGABMC0001", rackStart: 1,  rackSize: 1, inUse: false },
        { id: 2,  hostname: "GIGABMC0002", rackStart: 2,  rackSize: 1, inUse: false },
        { id: 3,  hostname: "GIGABMC0003", rackStart: 3,  rackSize: 1, inUse: false },
        { id: 4,  hostname: "GIGABMC0004", rackStart: 4,  rackSize: 1, inUse: false },
        { id: 5,  hostname: "GIGABMC0005", rackStart: 5,  rackSize: 1, inUse: false },
        { id: 6,  hostname: "GIGABMC0006", rackStart: 6,  rackSize: 1, inUse: false },
        { id: 7,  hostname: "GIGABMC0007", rackStart: 7,  rackSize: 1, inUse: false },
        { id: 8,  hostname: "GIGABMC0008", rackStart: 8,  rackSize: 1, inUse: false },
        { id: 9,  hostname: "GIGABMC0009", rackStart: 9,  rackSize: 1, inUse: false },
        { id: 10, hostname: "GIGABMC0010", rackStart: 10, rackSize: 1, inUse: false },
        { id: 11, hostname: "GIGABMC0011", rackStart: 11, rackSize: 1, inUse: false },
        { id: 12, hostname: "GIGABMC0012", rackStart: 12, rackSize: 1, inUse: false },
        { id: 13, hostname: "GIGABMC0013", rackStart: 13, rackSize: 1, inUse: false },
        { id: 14, hostname: "GIGABMC0014", rackStart: 14, rackSize: 1, inUse: false },
        { id: 15, hostname: "GIGABMC0015", rackStart: 15, rackSize: 1, inUse: false },
        { id: 16, hostname: "GIGABMC0016", rackStart: 16, rackSize: 1, inUse: false },
        { id: 17, hostname: "GIGABMC0017", rackStart: 17, rackSize: 1, inUse: false },
        { id: 18, hostname: "GIGABMC0018", rackStart: 18, rackSize: 1, inUse: false },
        { id: 19, hostname: "GIGABMC0019", rackStart: 19, rackSize: 1, inUse: false },
      ],
      mms: [
        { id: 1, hostname: "", inUse: false },
        { id: 2, hostname: "", inUse: false },
        { id: 3, hostname: "", inUse: false },
        { id: 4, hostname: "", inUse: false },
        { id: 5, hostname: "", inUse: false },
        { id: 6, hostname: "", inUse: false },
        { id: 7, hostname: "", inUse: false },
        { id: 8, hostname: "", inUse: false },
      ]
    },
    action: {
      launchRescanProcess:    { loading: false },
      launchExchangeProcess:  { loading: false },
      launchReplenishProcess: { loading: false },
      launchDockingProcess:   { loading: false },
      launchUndockingProcess: { loading: false },
    },
    dialog: {
      model: false,
      title: "無流程",
      tasks: [
        // {
        //   name: "抽氣",
        //   status: "pending",
        // },
      ],
      closeBtn: { disabled: true }
    },
  }),
  
  computed: {
    liquidLevelConfirmedAtFormatted() {
      const at = this.status.liquidLevelConfirmedAt
      if (!at) return ''
      try {
        const d = new Date(at)
        return d.toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      } catch (_) {
        return at
      }
    },
    // 液位確認區內顯示用：較短格式避免超出區域
    liquidLevelConfirmedAtCompact() {
      const at = this.status.liquidLevelConfirmedAt
      if (!at) return '—'
      try {
        const d = new Date(at)
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const h = String(d.getHours()).padStart(2, '0')
        const min = String(d.getMinutes()).padStart(2, '0')
        return `${m}/${day} ${h}:${min}`
      } catch (_) {
        return '—'
      }
    },
  },
  methods: {
    getLiquidLevel() {
      ipcRenderer.invoke("mainFunction/getLiquidLevel").then((data) => {
        if (data) {
          this.status.tankLiquidHeight = Number(data.tankLiquidHeight) || 0
          if (data.targetLiquidHeight != null) this.status.targetLiquidHeight = Number(data.targetLiquidHeight) || 620
        }
      }).catch(() => {})
    },
    async confirmLiquidLevel() {
      this.action.confirmLiquidLevel.loading = true
      try {
        const result = await ipcRenderer.invoke("mainFunction/confirmLiquidLevel", {
          tankLiquidHeight: this.status.tankLiquidHeight,
          targetLiquidHeight: this.status.targetLiquidHeight,
        })
        if (result && result.success && result.confirmedAt) {
          this.status.liquidLevelConfirmedAt = result.confirmedAt
          this.$toast?.success?.('液位確認已送出')
        }
      } catch (err) {
        this.$toast?.error?.(`液位確認失敗：${err.message || err}`)
      } finally {
        this.action.confirmLiquidLevel.loading = false
      }
    },
    getMMSlots() {
      ipcRenderer.invoke("mainFunction/getMMSlots")
      .then(data => {
        this.slots.mms.forEach(item => {
          item.inUse = data[item.id - 1]
          // 檢查方向往MMS選擇的槽位不是空的，取消選取
          if (item.id === this.select.mmsSlot && this.select.direction === 'mms' && item.inUse)
            this.select.mmsSlot = null
          if (item.id === this.select.mmsSlot && this.select.direction === 'tank' && !item.inUse)
            this.select.mmsSlot = null
        })
      })
    },
    // getTankSlots() {
    //   ipcRenderer.invoke("mainFunction/getTankSlots")
    //   .then(data => {
    //     this.slots.tank.forEach(item => {
    //       item.inUse = data[item.id - 1]
    //     })
    //   })
    //   this.select.tankSlot = null
    // },
    
    //修改後的確認槽位狀態
    async getTankSlots () {
      try {
        const data = await ipcRenderer.invoke("mainFunction/getTankSlots")   // ← IPC
        this.slots.tank.forEach(item => {
          item.inUse = data[item.id - 1] ?? false          // 容錯：防止 undefined
        })
        this.select.tankSlot = null
        return true                                        // ✔︎ 成功
      } catch (err) {
        this.$toast?.error(`讀取槽位失敗：${err.message || err}`)
        return false                                       // ✘ 失敗
      }
    },
    // action
    // async actionLaunchRescanProcess() {
    //   this.dialog.title = "掃描槽位"
    //   this.dialog.tasks = [
    //     {
    //       name: "檢查手臂負載",
    //       status: "pending",
    //     },
    //     {
    //       name: "掃描中",
    //       status: "pending",
    //     },
    //     {
    //       name: "移動回原點",
    //       status: "pending",
    //     },
    //   ]
    //   this.dialog.model = true

    //   this.dialog.tasks[0].status = "process"
    //   if (await ipcRenderer.invoke("mainFunction/check/robotIsEmpty"))
    //     this.dialog.tasks[0].status = "done"
    //   else {
    //     this.dialog.tasks[0].status = "fail"
    //     this.dialog.closeBtn.disabled = false
    //     return
    //   }

    //   this.dialog.tasks[1].status = "process"
    //   if (await ipcRenderer.invoke("mainFunction/action/robot/scanTankSlots"))
    //     this.dialog.tasks[1].status = "done"
    //   else {
    //     this.dialog.tasks[1].status = "fail"
    //     this.dialog.closeBtn.disabled = false
    //     return
    //   }
    //     this.getTankSlots()

    //   this.dialog.tasks[2].status = "process"
    //   if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
    //     this.dialog.tasks[2].status = "done"
    //   else {
    //     this.dialog.tasks[2].status = "fail"
    //     this.dialog.closeBtn.disabled = false
    //     return
    //   }

    //   this.dialog.closeBtn.disabled = false
    //   return
    // },

    // 修正後action
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
        // {
        //   name: "移動回原點",
        //   status: "pending",
        // },
      ]
      this.dialog.model = true

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("mainFunction/check/robotIsEmpty"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      // this.dialog.tasks[1].status = "process"
      // if (await ipcRenderer.invoke("mainFunction/action/robot/scanTankSlots"))
      //   this.dialog.tasks[1].status = "done"
      // else {
      //   this.dialog.tasks[1].status = "fail"
      //   this.dialog.closeBtn.disabled = false
      //   return
      // }
      //   this.getTankSlots()

      //修改版的掃描槽位動作流程1
      this.dialog.tasks[1].status = "process"
      const scanOK = await ipcRenderer.invoke("mainFunction/action/robot/scanTankSlots")
      if (!scanOK) {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      /* ▼ 讀 PLC 的 301~319 線圈並更新畫面 ---------- */
      const readOK = await this.getTankSlots()           // ← 加上 await
      if (!readOK) {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      /* ▲------------------------------------------------ */
      this.dialog.tasks[1].status = "done"


      // this.dialog.tasks[2].status = "process"
      // if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
      //   this.dialog.tasks[2].status = "done"
      // else {
      //   this.dialog.tasks[2].status = "fail"
      //   this.dialog.closeBtn.disabled = false
      //   return
      // }

      this.dialog.tasks[2].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },

    // // 修正後action
    // async actionLaunchRescanProcess() {
    //   // 一開始把「關閉」按鈕鎖住、啟動 loading
    //   this.dialog.closeBtn.disabled = true;
    //   this.action.launchRescanProcess.loading = true;

    //   // 1. 初始化 dialog 與任務列表，全部設成 pending
    //   this.dialog.title = '掃描槽位';
    //   this.dialog.tasks = [
    //     { name: '檢查手臂負載', status: 'pending' },
    //     { name: '掃描中',       status: 'pending' },
    //     { name: '移動回原點',   status: 'pending' },
    //   ];
    //   this.dialog.model = true;

    //   // 第 0 步：檢查手臂負載
    //   this.dialog.tasks[0].status = 'process';
    //   if (await ipcRenderer.invoke('mainFunction/check/robotIsEmpty')) {
    //     this.dialog.tasks[0].status = 'done';
    //   } else {
    //     this.dialog.tasks[0].status = 'fail';
    //     this.dialog.closeBtn.disabled = false;
    //     this.action.launchRescanProcess.loading = false;
    //     return;
    //   }

    //   // 第 1 步：掃描槽位
    //   this.dialog.tasks[1].status = 'process';
    //   const slotsStatus = await ipcRenderer.invoke('mainFunction/action/robot/scanTankSlots');
    //   if (Array.isArray(slotsStatus) && slotsStatus.length === this.slots.tank.length) {
    //     this.dialog.tasks[1].status = 'done';
    //     // 更新畫面上的槽位狀態
    //     this.slots.tank.forEach((item, idx) => {
    //       item.inUse = slotsStatus[idx];
    //     });
    //     this.select.tankSlot = null;
    //   } else {
    //     this.dialog.tasks[1].status = 'fail';
    //     this.dialog.closeBtn.disabled = false;
    //     this.action.launchRescanProcess.loading = false;
    //     return;
    //   }

    //   // 第 2 步：移動回原點
    //   this.dialog.tasks[2].status = 'process';
    //   if (await ipcRenderer.invoke('mainFunction/action/robot/return2origin')) {
    //     this.dialog.tasks[2].status = 'done';
    //   } else {
    //     this.dialog.tasks[2].status = 'fail';
    //     this.dialog.closeBtn.disabled = false;
    //     this.action.launchRescanProcess.loading = false;
    //     return;
    //   }

    //   // 全部結束，解鎖按鈕並關閉 loading
    //   this.dialog.closeBtn.disabled = false;
    //   this.action.launchRescanProcess.loading = false;
    // },

    //模擬掃描槽位
    //   async actionLaunchRescanProcess() {
    //     // 先鎖住「關閉」按鈕
    //     this.dialog.closeBtn.disabled = true;

    //     // 設定對話框標題與任務列表，跳過第 0、2 步驟
    //     this.dialog.title = '掃描槽位';
    //     this.dialog.tasks = [
    //       { name: '檢查手臂負載', status: 'done' },
    //       { name: '掃描中',       status: 'pending' },
    //       { name: '移動回原點',   status: 'done' },
    //     ];
    //     // 顯示對話框並啟動 loading
    //     this.dialog.model = true;
    //     this.action.launchRescanProcess.loading = true;

    //     // 執行掃描任務
    //     this.dialog.tasks[1].status = 'process';
    //     let scanned = [];
    //     try {
    //       scanned = await ipcRenderer.invoke('mainFunction/action/robot/scanTankSlots');
    //       this.dialog.tasks[1].status = 'done';

    //       // 更新槽位狀態（假設 this.slots.tank 已有 19 個項目）
    //       this.slots.tank.forEach((item, idx) => {
    //         item.inUse = scanned[idx];
    //       });
    //       // 清空選擇（可選）
    //       this.select.tankSlot = null;
    //     } catch (e) {
    //       this.dialog.tasks[1].status = 'fail';
    //       console.error('模擬掃描失敗：', e);
    //     } finally {
    //       // 任務結束後，不論成敗都關閉 loading，並開啟「關閉」按鈕
    //       this.action.launchRescanProcess.loading = false;
    //       this.dialog.closeBtn.disabled = false;
    //     }
    //   },

    async actionLaunchExchangeTank2MMS() {
      console.log(`Launch server exchange process TANK -> MMS ...`)
      this.dialog.title = "置換流程"
      this.dialog.tasks = [
        {
          name: "檢查手臂負載",
          status: "pending",
        },
        {
          name: `移動至TANK槽位${this.select.tankSlot}`,
          status: "pending"
        },
        {
          name: "打開理線蓋",
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
      if (await ipcRenderer.invoke("mainFunction/check/robotIsEmpty"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/move2slot", { slotId: this.select.tankSlot }))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[2].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/openWireCover"))
        this.dialog.tasks[2].status = "done"
      else {
        this.dialog.tasks[2].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/uninstallServer"))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      this.slots.tank.forEach(item => {
        if (item.id === this.select.tankSlot)
          item.inUse = false
      })

      this.dialog.tasks[4].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/move2slot", { slotId: this.select.mmsSlot + 100 }))
        this.dialog.tasks[4].status = "done"
      else {
        this.dialog.tasks[4].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[5].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/installServer"))
        this.dialog.tasks[5].status = "done"
      else {
        this.dialog.tasks[5].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[6].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
        this.dialog.tasks[6].status = "done"
      else {
        this.dialog.tasks[6].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[7].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },
    async actionLaunchExchangeMMS2Tank() {
      console.log(`Launch server exchange process MMS -> TANK ...`)
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
          name: `移動至TANK槽位${this.select.tankSlot}`,
          status: "pending"
        },
        {
          name: "安裝Server",
          status: "pending"
        },
        {
          name: "關閉理線蓋",
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
      if (await ipcRenderer.invoke("mainFunction/check/robotIsEmpty"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/move2slot", { slotId: this.select.mmsSlot + 100 }))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[2].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/uninstallServer"))
        this.dialog.tasks[2].status = "done"
      else {
        this.dialog.tasks[2].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/move2slot", { slotId: this.select.tankSlot }))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[4].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/installServer"))
        this.dialog.tasks[4].status = "done"
      else {
        this.dialog.tasks[4].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[5].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/closeWireCover"))
        this.dialog.tasks[5].status = "done"
      else {
        this.dialog.tasks[5].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      this.slots.tank.forEach(item => {
        if (item.id === this.select.tankSlot)
          item.inUse = true
      })

      this.dialog.tasks[6].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
        this.dialog.tasks[6].status = "done"
      else {
        this.dialog.tasks[6].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[7].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },
    async actionLaunchReplenishProcess() {
      this.dialog.title = "補液流程"
      this.dialog.tasks = [
        {
          name: "移動至補液原點",
          status: "pending",
        },
        {
          name: "啟動幫浦",
          status: "pending",
        },
        {
          name: "補液中 | TANK液高: 580mm",
          status: "pending",
        },
        {
          name: "關閉幫浦",
          status: "pending",
        },
        {
          name: "移動回原點",
          status: "pending",
        },
        {
          name: "補液完成",
          status: "pending",
        },
      ]
      this.dialog.model = true

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/move2slot", { slotId: 10 }))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/startReplenish"))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[2].status = "process"
      await sleep(100)
      this.dialog.tasks[2].status = "done"

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/endReplenish"))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[4].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
        this.dialog.tasks[4].status = "done"
      else {
        this.dialog.tasks[4].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[5].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },
    async actionLaunchDockingProcess() {
      this.dialog.title = "對接流程"
      this.dialog.tasks = [
        // {
        //   name: "伸出上罩電動缸",
        //   status: "pending",
        // },
        {
          name: "回歸原點",
          status: "pending",
        },
        //{
        //  name: "啟動抽氣機",
        //  status: "pending",
        //},
        {
          name: "等待氣密 | -0.1 KPA",
          status: "pending",
        },
        {
          name: "等待CCD校正",
          status: "pending",
        },
        {
          name: `開啟TANK${this.select.tankId}上蓋`,
          status: "pending",
        },
        {
          name: `掃描TANK${this.select.tankId} Server槽位`,
          status: "pending",
        },
        {
          name: "對接完成",
          status: "pending",
        },
      ]
      this.dialog.model = true

      // this.dialog.tasks[0].status = "process"
      // if (await ipcRenderer.invoke("mainFunction/action/extendActuator"))
      //   this.dialog.tasks[0].status = "done"
      // else {
      //   this.dialog.tasks[0].status = "fail"
      //   this.dialog.closeBtn.disabled = false
      //   return
      // }

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      
      //todo 新增
      // this.dialog.tasks[2].status = "process"
      // await sleep(100)
      // this.dialog.tasks[2].status = "done"

      //啟動抽氣機
      //this.dialog.tasks[1].status = "process"
      //if (await ipcRenderer.invoke("mainFunction/action/airPump", { action: "on" }))
      //  this.dialog.tasks[1].status = "done"
      //else {
      //  this.dialog.tasks[1].status = "fail"
      //  this.dialog.closeBtn.disabled = false
      //  return
      //}

      //todo 新增
      // this.dialog.tasks[3].status = "process"
      // await sleep(100)
      // this.dialog.tasks[3].status = "done"

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/waitForAirTightness"))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }


      this.dialog.tasks[2].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/recalibration", { tankId: this.select.tankId }))
        this.dialog.tasks[2].status = "done"
      else {
        this.dialog.tasks[2].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }
      this.getTankSlots()

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("manualOperation/action/tank/openCover", { tankId: this.select.tankId }))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[4].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/scanTankSlots"))
        this.dialog.tasks[4].status = "done"
      else {
        this.dialog.tasks[4].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.status.tankCoverOpened = true
      this.dialog.tasks[5].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },
    async actionLaunchUndockingProcess() {
      this.dialog.title = "脫離流程"
      this.dialog.tasks = [
        {
          name: "回歸原點",
          status: "pending",
        },
        {
          name: `關閉TANK${this.select.tankId}上蓋`,
          status: "pending",
        },
        {
          name: "等待濃度下降 | 10000 / 100 PPM",
          status: "pending",
        },
        {
          name: "關閉抽氣機",
          status: "pending",
        },
        // {
        //   name: "收回上罩電動缸",
        //   status: "pending",
        // },
        {
          name: "脫離完成",
          status: "pending",
        },
      ]
      this.dialog.model = true

      this.dialog.tasks[0].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/robot/return2origin"))
        this.dialog.tasks[0].status = "done"
      else {
        this.dialog.tasks[0].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      this.dialog.tasks[1].status = "process"
      if (await ipcRenderer.invoke("manualOperation/action/tank/closeCover", { tankId: this.select.tankId }))
        this.dialog.tasks[1].status = "done"
      else {
        this.dialog.tasks[1].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      //todo 新增 偵測氟化液濃度
      this.dialog.tasks[2].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/waitForConcentrationDecrease"))
        this.dialog.tasks[2].status = "done"
      else {
        this.dialog.tasks[2].status = "fail"
        this.dialog.closeBtn.disabled = false
        return;
      }

      this.dialog.tasks[3].status = "process"
      if (await ipcRenderer.invoke("mainFunction/action/airPump", { action: "off" }))
        this.dialog.tasks[3].status = "done"
      else {
        this.dialog.tasks[3].status = "fail"
        this.dialog.closeBtn.disabled = false
        return
      }

      // this.dialog.tasks[4].status = "process"
      // if (await ipcRenderer.invoke("mainFunction/action/retractActuator"))
      //   this.dialog.tasks[4].status = "done"
      // else {
      //   this.dialog.tasks[4].status = "fail"
      //   this.dialog.closeBtn.disabled = false
      //   return
      // }

      this.status.tankCoverOpened = false
      this.dialog.tasks[4].status = "done"
      this.dialog.closeBtn.disabled = false
      return
    },

    // async dryRun() {
    //   this.dialog.closeBtn.disabled = true
    //   for(let i = 0; i < this.dialog.tasks.length; i += 1) {
    //     this.dialog.tasks[i].status = "process"
    //     await sleep(100)
    //     this.dialog.tasks[i].status = "done"
    //   }
    //   this.dialog.closeBtn.disabled = false
    // }
  },

  mounted() {
    this.getLiquidLevel()
    this.timer = setInterval(() => { this.getMMSlots() }, 500)
    this.liquidLevelTimer = setInterval(() => { this.getLiquidLevel() }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.liquidLevelTimer)
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
  /* color: #FFFFFF; */
  fill: #FFF;
  opacity: 0.3;
  margin-right: 8px;
}
</style>
