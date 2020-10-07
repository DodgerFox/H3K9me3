<template>
    <div class="table-wrap">
        <table class="table">
          <tbody>
            <tr>
              <th v-for="(header, name, index) in data" :key="index" >{{name}}</th>
            </tr>
            <tr>
              <td>
                <router-link class="table-link" to="/search">H3K27ac</router-link>
              </td>
              <td>100</td>
              <td>134</td>
              <td>172</td>
              <td>51</td>
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
          length = element.length;
      }
      return length
    }
  },
  mounted(){
    
  }
}
</script>