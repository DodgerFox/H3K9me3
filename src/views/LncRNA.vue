<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">LnkRNA: {{$route.params.id}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="lncrna">
                      <h4>{{lncrna.chart.title}}</h4>
                      <ChartPeaks :data="lncrna.chart" />
                  </div>
                  <div class="block-none" v-else>
                      <h4>There is no data</h4>
                  </div>
                </div>
                <v-select :options="['H3K27ac','H3K27me3','H3K36me3','H3K4me1','H3K4me2','H3K4me3','H3K9ac','H3K9me3','H3K79me2','H4K20me1','Methylation']"></v-select>
                <div class="block" v-if="lncrna">
                  <ChartBarplot :data="lncrna.barplot" />
                </div>
                <Links v-if="lncrna" :data="lncrna.links" />
                <Table :max="10" v-if="lncrna" :data="lncrna.table" />
                <!-- <Table :max="10" v-if="getData.table" :data="getData.table" /> -->
            </div>
        </section>
        <Loader />
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import Links from '@/components/Links';
import Loader from '@/components/Loader';
import ChartPeaks from '@/components/charts/ChartPeaks'
import ChartBarplot from '@/components/charts/ChartBarplot'
import vSelect from 'vue-select'

export default {
  name: 'lncrna',
  components: {
    Header,
    Table,
    Links,
    Loader,
    Footer,
    ChartBarplot,
    ChartPeaks,
    vSelect
  },
  data() {
    return {
      lncrna: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getHistone
    }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.lncrna = await this.$store.dispatch('fetchLncrna', [this.$route.params.id, 1, 10])
    this.$store.dispatch('setLoader', false)
  }
}

</script>
