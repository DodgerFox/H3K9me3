<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Gene: {{$route.params.id}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="modification.chart">
                      <h4>{{modification.chart.title}}</h4>
                      <ChartPeaks :data="modification.chart" />
                  </div>
                  <div class="block-none" v-else>
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Links v-if="modification.links" :data="modification.links" />
                <Table :max="10" v-if="modification.table" :data="modification.table" />
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
import Links from '@/components/Links';
import ChartPeaks from '@/components/charts/ChartPeaks'
import histone from '@/data/gene.json'

export default {
  name: 'gene',
  components: {
    Header,
    Table,
    Links,
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
    this.modification = histone
    console.log(this.modification);
    await this.$store.dispatch('fetchGene', [this.$route.params.id, 1, 10])
  }
}

</script>
