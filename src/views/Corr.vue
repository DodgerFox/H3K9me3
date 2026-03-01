<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                                <h2 v-if="getData || corr" class="section-title">{{getData?.title || corr?.title}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="getData || corr">
                                            <h4>{{corr?.chart?.title}}</h4>
                                            <ChartCombo :data="getData?.chart || corr?.chart" />
                  </div>
                  <div class="block-none" v-if="!getData && !loader">
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Links v-if="corr" :data="corr?.links" />
                <Table class="table-wrap_long" :max="10" title="Data by choosen Correlation" v-if="getData || corr" :data="getData?.table || corr?.table" />
                <Loader />
            </div>
        </section>
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
import Links from '@/components/Links'
import Loader from '@/components/Loader'
import ChartCombo from '@/components/charts/ChartCombo'

const store = useStore()
const route = useRoute()
const corr = ref(null)
const getData = computed(() => store.getters.getCorr)
const loader = computed(() => store.getters.loader)

onMounted(async () => {
  store.dispatch('setLoader', true)
  corr.value = await store.dispatch('fetchCorr', [route.query, 1, 10])
  store.dispatch('setLoader', false)
})
</script>
