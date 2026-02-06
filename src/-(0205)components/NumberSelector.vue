<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        dark
        solo
        rounded
        :large="large"
        :x-large="xlarge"
        :color="color"
        class="me-2"
        :class="btnClass"
      >
        {{ prefix + select.toFixed() }}
        <svg viewBox="0 0 24 24"><title>menu-down</title><path d="M7,10L12,15L17,10H7Z" /></svg>
      </v-btn>
    </template>

    <div class="selector">
      <v-row dense>
        <v-col v-for="item in items" :key="item" cols="3">
          <a @click="select = item, $emit('input', item)">
            <div class="select-item">{{ item }}</div>
          </a>
        </v-col>
      </v-row>
    </div>
  </v-menu>
</template>

<style scoped>
svg {
  width: 24px;
  fill: #FAFAFA;
}
.selector {
  max-width: 240px;
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(235, 235, 235, 0.12);
  backdrop-filter: blur(20px);
  border-radius: 6px;
}
.select-item {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(235, 235, 235, 0.4);
  border-radius: 6px;
  color: white;
}
</style>

<script>
export default {
  name: 'NumberSelector',

  props: {
    value: {
      type: [Number, String]
    },
    color: {
      type: String,
      default: '#424242'
    },
    large: {
      type: Boolean,
      default: false
    },
    xlarge: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      default: ''
    },
    btnClass: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
  },
  
  data: () => ({
    select: 0,
    items:  []
  }),

  created() {
    for (let x = this.min; x <= this.max; x += 1) {
      this.items.push(x)
    }
    this.select = this.min
  }
}
</script>
