<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">LncRNA: {{ route.params.id }}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="lncrna">
            <h4>{{lncrna?.chart?.title}}</h4>
            <ChartPeaks :data="lncrna?.chart" />
                  </div>
                  <div class="block-none" v-if="!lncrna && !loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <v-select v-if="barplot" :options="histones" v-model="active"></v-select>
                <div class="block" v-if="barplot">
                  <ChartBarplot :data="barplot" :labels="lncrna?.barplot?.labels" />
                </div>
                <Links v-if="lncrna" :data="lncrna?.links" />
                <Table :max="10" title="Data by choosen lncRNA" v-if="lncrna" :data="getData?.table || lncrna?.table" />
            </div>
        </section>
        <Loader />
        <Footer />
    </main>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Table from '@/components/Table'
import Links from '@/components/Links'
import Loader from '@/components/Loader'
import ChartPeaks from '@/components/charts/ChartPeaks'
import ChartBarplot from '@/components/charts/ChartBarplot'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const store = useStore()
const route = useRoute()

const lncrna = ref(null)
const active = ref(null)
const barplot = ref(null)
const histones = ref([])

const getData = computed(() => store.getters.getLncrna)
const loader = computed(() => store.getters.loader)

onMounted(async () => {
  store.dispatch('setLoader', true)
  lncrna.value = await store.dispatch('fetchLncrna', [route.params.id, 1, 10])
  store.dispatch('setLoader', false)

  histones.value = []
  if (lncrna.value?.barplot?.elements) {
    let count = false
    for (const key in lncrna.value.barplot.elements) {
      if (!count) {
        count = true
        histones.value.push(key)
        active.value = key
        barplot.value = lncrna.value.barplot.elements[key]
      } else {
        histones.value.push(key)
      }
    }
  }
})

watch(active, (value) => {
  if (value && lncrna.value?.barplot?.elements) {
    barplot.value = lncrna.value.barplot.elements[value]
  }
})
</script>
