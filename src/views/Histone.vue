<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Histone modification: {{ route.params.id }}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="modification || getData">
                      <h4>{{ modification?.chart?.title || getData?.chart?.title }}</h4>
                      <ChartPeaks :data="modification?.chart || getData?.chart" />
                  </div>
                  <div class="block-none" v-if="!modification && !loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Table :max="10" v-if="modification" :data="getData?.table || modification?.table" />
            </div>
        </section>
        <Loader />
        <Footer />
    </main>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Table from '@/components/Table'
import Loader from '@/components/Loader'
import ChartPeaks from '@/components/charts/ChartPeaks'

const store = useStore()
const route = useRoute()
const modification = ref(null)
const getData = computed(() => store.getters.getHistone)
const loader = computed(() => store.getters.loader)

onMounted(async () => {
  store.dispatch('setLoader', true)
  modification.value = await store.dispatch('fetchHistone', [route.params.id, 1, 10])
  store.dispatch('setLoader', false)
})
</script>
