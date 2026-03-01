<template>
  <div ref="sliderEl" class="slider" :data-name="name"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import nouislider from 'nouislider'
import wnumb from 'wnumb'
import 'nouislider/distribute/nouislider.css'

const props = defineProps({
  name: {
    type: String,
    default: null
  }
})

const sliderEl = ref(null)
const store = useStore()
let sliderInstance = null

const buildSlider = () => {
  if (!sliderEl.value) return
  const isMinus = props.name === 'minus'

  sliderInstance = nouislider.create(sliderEl.value, {
    range: {
      min: isMinus ? -1 : 0,
      max: isMinus ? 0 : 1
    },
    start: [isMinus ? -0.8 : 0.1, isMinus ? -0.1 : 0.8],
    margin: 0.1,
    connect: true,
    tooltips: true,
    format: wnumb({
      decimals: 2
    })
  })

  sliderInstance.on('change', async () => {
    const val = await sliderInstance.get()
    store.dispatch('setRange', { name: props.name, val })
  })

  store.dispatch('setRange', { name: props.name, val: sliderInstance.get() })
}

onMounted(buildSlider)
onBeforeUnmount(() => {
  if (sliderInstance) {
    sliderInstance.destroy()
    sliderInstance = null
  }
})
</script>

<style>
</style>