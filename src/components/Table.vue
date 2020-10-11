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
                <p v-else>{{ td }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-pagination" v-if="max <= getLength() && data">
          <p class="table-pagination__text">{{max * page - max + 1}}-{{max * page}} of {{getLength()}} items</p>
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
    getLength() {
      let length;
      for (const key in this.data) {
          const element = this.data[key];
          console.log(key);
          length = element.length;
      }
      return length
    },
    changePage(direction) {
      if (direction === 'back') {
        this.page = this.page > 1 ? this.page - 1 : this.page
      } else {
        this.page = this.page < this.getLength() / this.max ? this.page + 1 : this.page
      }
      console.log(this.getLength());
      console.log(this.page);
    }
  },
  computed: {
    getPage() {
      return this.page
    }
  },
  watch: {
    async getPage () {
      let data, action;
      let route = this.$route.name;
      switch (route) {
        case 'result':
          data = await this.$store.getters.getSearchData;
          action = await this.$store.dispatch('search', [data, this.page, this.max]);
          break;
        case 'histone':
          action = await this.$store.dispatch('fetchHistone', [this.$route.params.id, this.page, this.max]);
          break;
        case 'gene':
          action = await this.$store.dispatch('fetchGene', [this.$route.params.id, this.page, this.max]);
          break;
      
        default:
          break;
      }
      console.log(route);
      
      console.log(action);
    }
  },
  mounted(){
    console.log(this.data);
  }
}
</script>