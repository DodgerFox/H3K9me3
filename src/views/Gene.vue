<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Gene: {{ route.params.id }}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="gene">
                      <h4>{{gene?.chart?.title}}</h4>
                      <ChartPeaks :data="getData?.chart || gene?.chart" />
                  </div>
                  <div class="block-none" v-if="!gene && !loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Links v-if="gene" :data="getData?.links || gene?.links" />
                <Table title="Data by choosen lncRNA" :max="10" v-if="gene" :data="getData?.table || gene?.table" />
                <Table class="double-top" :num='2' :max="10" v-if="gene" :data="getData?.other_peaks_table || gene?.other_peaks_table" />
            </div>
        </section>
        <Footer />
        <Loader />
    </main>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Table from '@/components/Table'
import Links from '@/components/Links'
import Loader from '@/components/Loader'
import ChartPeaks from '@/components/charts/ChartPeaks'

const store = useStore()
const route = useRoute()
const gene = ref(null)
const getData = computed(() => store.getters.getGene)
const loader = computed(() => store.getters.loader)

onMounted(async () => {
  store.dispatch('setLoader', true)
  gene.value = await store.dispatch('fetchGene', [route.params.id, 1, 10, 1, 10])
  store.dispatch('setLoader', false)
})
</script>
