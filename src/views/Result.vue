<template>
    <main class="main">
        <Header />
        <section class="result">
            <div class="wrap">
                <div class="result-header">
                  <h4 v-if="hasResults">{{ displayTitle }}</h4>
                  <h4 v-else>Nothing found, please try again</h4>
                  <a @click="download" class="button violet download" v-if="hasResults">
                    <p>Download</p>
                  </a>
                </div>
                <Table :max="10" v-if="results" :data="getTable?.table || results?.table" />
            </div>
        </section>
        <Loader />
        <Footer />
    </main>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Table from '@/components/Table'
import Loader from '@/components/Loader'
import axios from 'axios'

const store = useStore()
const results = ref(null)

const getTable = computed(() => store.getters.getResults)
const displayTitle = computed(() => results.value?.title || getTable.value?.title || '')
const hasResults = computed(() => {
  const table = results.value?.table || getTable.value?.table
  return Boolean(table?.data?.length)
})

const download = async () => {
  store.dispatch('setLoader', true)
  const query = 'http://83.149.211.146:22180/lncrna/api/v1/download'
  const searchData = await store.getters.getSearchData
  JSON.stringify(searchData)
  axios
    .get(query, searchData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf'
      },
      timeout: 1000 * 60 * 60 * 24 * 7
    })
    .then(({ data }) => {
      store.dispatch('setLoader', false)
      const downloadUrl = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', 'Table.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
}

onMounted(async () => {
  store.dispatch('setLoader', true)
  results.value = await store.getters.getResults
  store.dispatch('setLoader', false)
})
</script>
