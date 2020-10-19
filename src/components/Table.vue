<template>
    <div class="table-wrap">
        <table class="table">
          <tbody>
            <tr>
              <th v-for="(header, name, index) in data.data[0]" :key="index" >{{ name }}</th>
            </tr>
            <tr v-for="(item, index) in data.data" :key="index">
              <td v-for="(td, name, index) in item" :key="index">
                <router-link v-if="name === 'Histone Modification'" class="table-link" :to="{path: '/info/histone/' + td}">{{ td }}</router-link>
                <router-link v-else-if="name === 'lncRNA'" class="table-link" :to="{path: '/info/lncrna/' + td}">{{ td }}</router-link>
                <router-link v-else-if="name === 'Gene'" class="table-link" :to="{path: '/info/gene/' + td}">{{ td }}</router-link>
                <router-link v-else-if="name === 'Corr'" class="table-link" :to="{path: '/info/corr/' + td}">{{ td }}</router-link>
                <p v-else>{{ td }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-pagination" v-if="max <= data.all_counts && data">
          <p class="table-pagination__text">{{max * page - max + 1}}-{{max * page > data.all_counts ? data.all_counts : max * page}} of {{data.all_counts}} items</p>
          <div class="table-pagination__item back" @click="changePage('back')">
            <img src="@/assets/images/icon_arrow.svg" alt="">
          </div>
          <div class="table-pagination__item next" @click="changePage('next')">
            <img src="@/assets/images/icon_arrow.svg" alt="">
          </div>
        </div>
        <div class="block-nodata" v-if="!data">
          <p>No data</p>
        </div>
    </div>
</template>
<script>

export default {
  name: 'table',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    max: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data: () => {
    return {
      page: 1
    }
  },
  methods: {
    changePage(direction) {
      if (direction === 'back') {
        this.page = this.page > 1 ? this.page - 1 : this.page
      } else {
        this.page = this.page < this.data.all_counts / this.max ? this.page + 1 : this.page
      }
    }
  },
  computed: {
    getPage() {
      return this.page
    }
  },
  watch: {
    async getPage () {
      let data;
      let route = this.$route.name;
      switch (route) {
        case 'result':
          this.$store.dispatch('setLoader', true)
          data = await this.$store.getters.getSearchData;
          await this.$store.dispatch('search', [data, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'histone':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchHistone', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'lncrna':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchLncrna', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'gene':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchGene', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
        case 'corr':
          this.$store.dispatch('setLoader', true)
          await this.$store.dispatch('fetchCorr', [this.$route.params.id, this.page, this.max]);
          this.$store.dispatch('setLoader', false)
          break;
      
        default:
          break;
      }
    }
  }
}
</script>