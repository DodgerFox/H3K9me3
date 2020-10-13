<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Histone modification: {{$route.params.id}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="modification || getData">
                      <h4>{{ modification.chart.title || getData.chart.title }}</h4>
                      <ChartPeaks :data="modification.chart || getData.chart" />
                  </div>
                  <div class="block-none" v-else>
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Table :max="10" v-if="modification" :data="modification.table || getData.table" />
                <!-- <Table :max="10" v-if="getData.table" :data="getData.table" /> -->
            </div>
        </section>
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import ChartPeaks from '@/components/charts/ChartPeaks'
import histone from '@/data/histone.json'

export default {
  name: 'histone',
  components: {
    Header,
    Table,
    Footer,
    ChartPeaks
  },
  data() {
    return {
      modification: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getHistone
    }
  },
  async mounted () {
    this.modification = await this.$store.dispatch('fetchHistone', [this.$route.params.id, 1, 10])
    this.modification = histone
    console.log(this.modification);
    // console.log(this.$route.params.id, 'route');
  }
}

</script>
