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
        <div class="table-pagination" v-if="max <= getLength()">
          <p class="table-pagination__text">1-{{max}} of {{getLength()}} items</p>
          <div class="table-pagination__item back">
            <img src="@/assets/images/icon_arrow.svg" alt="">
          </div>
          <div class="table-pagination__item next">
            <img src="@/assets/images/icon_arrow.svg" alt="">
          </div>
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
  methods: {
    getLength() {
      let length;
      for (const key in this.data) {
          const element = this.data[key];
          console.log(key);
          length = element.length;
      }
      return length
    }
  },
  mounted(){
    console.log(this.data);
  }
}
</script>