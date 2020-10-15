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
                <v-select v-if="lncrna.barplot" :options="histones" v-model="active"></v-select>
                <div class="block" v-if="barplot">
                  <ChartBarplot :data="barplot" :labels="lncrna.barplot.labels" />
                </div>
                <Links v-if="lncrna.links" :data="lncrna.links" />
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
import lncrnaData from '@/data/lncrna.json' 

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
      lncrna: null,
      active: null,
      barplot: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getHistone
    },
    getActive () {
      return this.active
    }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    // this.lncrna = await this.$store.dispatch('fetchLncrna', [this.$route.params.id, 1, 10])
    this.lncrna = await lncrnaData
    let count = false;
    this.histones = [];
    for (const key in this.lncrna.barplot.elements) {
      if (!count) {
        count = true
        this.histones.push(key)
        this.active = key
        this.barplot = this.lncrna.barplot.elements[key]
      } else {
        this.histones.push(key)
      }
    }
    console.log(this.active, this.histones);
    this.$store.dispatch('setLoader', false)
    console.log(this.lncrna);
  },
  watch: {
    getActive(active) {
      console.log(active);
      this.barplot = this.lncrna.barplot.elements[active]
    }
  }
}

</script>
