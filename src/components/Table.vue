<template>
    <div class="table-wrap">
      <h4 v-if="data.title">{{ data.title }}</h4>
        <table class="table">
          <tbody>
            <tr>
              <th v-for="(header, name, index) in data?.data?.[0]" :key="index">{{ name }}</th>
            </tr>
            <tr v-for="(item, index) in data?.data" :key="index">
              <td v-for="(td, name, index) in item" :key="index">
                <RouterLink v-if="name === 'Histone Modification' && td != 'None'" class="table-link" :to="{path: '/info/histone/' + td}">{{ td }}</RouterLink>
                <RouterLink v-else-if="name === 'lncRNA' && td != 'None'" class="table-link" :to="{path: '/info/lncrna/' + td}">{{ td }}</RouterLink>
                <RouterLink v-else-if="name === 'Gene' && td != 'None'" class="table-link" :to="{path: '/info/gene/' + td}">{{ td }}</RouterLink>
                <RouterLink v-else-if="name === 'Corr' && td != 'None'" class="table-link" :to="{name: 'corr', query: {peak: item['Peak Id'], lncrna: item.lncRNA, hm: item['Histone Modification']}}">{{ td }}</RouterLink>
                <p v-else>{{ td }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-pagination" v-if="paginationShow">
          <p class="table-pagination__text">{{max * page - max + 1}}-{{max * page > data.all_counts ? data.all_counts : max * page}} of {{ data.all_counts ? data.all_counts : 'many'}} items</p>
          <div class="table-pagination__item back" @click="changePage('back')">
            <img src="@/assets/images/icon_arrow.svg">
          </div>
          <div class="table-pagination__item next" @click="changePage('next')">
            <img src="@/assets/images/icon_arrow.svg">
          </div>
        </div>
        <div class="block-nodata" v-if="!data">
          <p>No data</p>
        </div>
        <div class="block-nodata" v-if="data.all_counts === 0">
          <p>Nothing found</p>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  data: {
    type: [Array, Object],
    required: true
  },
  max: {
    type: Number,
    required: false,
    default: 10
  },
  num: {
    type: Number,
    required: false,
    default: 1
  }
})

const store = useStore()
const route = useRoute()
const page = ref(1)

const paginationShow = computed(() => {
  if (!props.data?.data) return false
  if (props.data.all_counts && props.data.data.length >= props.max) {
    return props.max < props.data.all_counts
  }
  return props.data.data.length === props.max
})

const changePage = (direction) => {
  if (direction === 'back') {
    page.value = page.value > 1 ? page.value - 1 : page.value
    return
  }

  const total = props.data?.all_counts
  const limit = total ? Math.ceil(total / props.max) : Infinity
  page.value = page.value < limit ? page.value + 1 : page.value
}

watch(page, async () => {
  let data
  switch (route.name) {
    case 'result':
      store.dispatch('setLoader', true)
      data = await store.getters.getSearchData
      await store.dispatch('search', [data, page.value, props.max])
      store.dispatch('setLoader', false)
      break
    case 'histone':
      store.dispatch('setLoader', true)
      await store.dispatch('fetchHistone', [route.params.id, page.value, props.max])
      store.dispatch('setLoader', false)
      break
    case 'lncrna':
      store.dispatch('setLoader', true)
      await store.dispatch('fetchLncrna', [route.params.id, page.value, props.max])
      store.dispatch('setLoader', false)
      break
    case 'gene':
      store.dispatch('setLoader', true)
      if (props.num === 2) {
        await store.dispatch('fetchGene', [route.params.id, store.getters.getGeneData[1], store.getters.getGeneData[2], page.value, props.max])
      } else {
        await store.dispatch('fetchGene', [route.params.id, page.value, props.max, store.getters.getGeneData[3], store.getters.getGeneData[4]])
      }
      store.dispatch('setLoader', false)
      break
    case 'corr':
      store.dispatch('setLoader', true)
      await store.dispatch('fetchCorr', [route.query, page.value, props.max])
      store.dispatch('setLoader', false)
      break
    default:
      break
  }
})
</script>