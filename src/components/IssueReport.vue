<template>
  <v-row style="height: 1024px" class="ma-0">
    <v-col
      v-if="loading"
      class="justify-space-around align-start ml-13 mr-13"
      style="margin-top: 110px;"
    >
      <v-skeleton-loader
        v-for="i in 5"
        :key="i"
        type="article"
      ></v-skeleton-loader>
    </v-col>
    
    <v-col v-else class="d-flex justify-space-around align-start">
      <v-expansion-panels class="ml-13 mr-13 overflow-y-auto" style="margin-top: 110px; max-height: 790px;">
        <v-expansion-panel
          v-for="item in items"
          :key="item.timestamp"
          style="background-color: rgba(255, 255, 255, 0.06)"
          class="rounded-xl"
        >
          <v-expansion-panel-header class="text-h5 pa-6">
            <div class="d-flex justify-start align-center">
              <svg viewBox="0 0 24 24"><title>alert-circle</title><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
              {{ item.name }}
            </div>
            <v-spacer></v-spacer>
            <div>
              <div class="float-right mr-4">{{ convertToTaipeiTime(item.timestamp) }}</div>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-h6 font-weight-light">
            <v-row>
              <v-col>
                {{ item.description }}
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'IssueReport',

  props: {
    count: Number
  },

  data: () => ({
    loading: true,
    items: [
      // {
      //   level: 'info',
      //   timestamp: '2025-02-14T02:09:27.969Z',
      //   name: 'interlock1',
      //   description: ''
      // }
    ],
  }),

  watch: {
    count() {
      this.get()
    }
  },

  methods: {
    async get() {
      this.loading = true
      await ipcRenderer.invoke("issueReport/get")
      .then(data => {
        if (this.items.length <= 0 || this.items[0].timestamp !== data[0].timestamp)
          this.items = data
      })
      .finally(() => {
        this.loading = false
      })
    },
    /**
     * 將UTC時間轉換為台北時間的字串格式。
     *
     * @param {string} input_time
     * @returns {string} YYYY-MM-DD HH:mm:ss
     */
    convertToTaipeiTime(input_time) {
      const date = new Date(input_time);

      const formatter = new Intl.DateTimeFormat('zh-TW', {
          timeZone: 'Asia/Taipei',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
      });

      const parts = formatter.formatToParts(date);
      const get = (type) => parts.find(p => p.type === type)?.value;

      return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
    }
  },
  mounted() {
    this.get()
  }
}
</script>

<style scoped>
svg {
  width: 25px;
  fill: #FAFAFA;
  margin-right: 16px;
}
</style>
