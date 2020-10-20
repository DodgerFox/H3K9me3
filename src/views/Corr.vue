<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 v-if="getdata || corr" class="section-title">{{getData.title || corr.title}}</h2>
                <div class="block">
                  <div class="block-wrap" v-if="getData || corr">
                      <h4>{{corr.chart.title}}</h4>
                      <ChartCombo :data="getData.chart || corr.chart" />
                  </div>
                  <div class="block-none" v-else>
                      <h4>There is no data</h4>
                  </div>
                </div>
                <Links v-if="corr" :data="corr.links" />
                <Table :max="10" v-if="getData || corr" :data="getData.table || corr.table" />
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
import ChartCombo from '@/components/charts/ChartCombo'

export default {
  name: 'lncrna',
  components: {
    Header,
    Table,
    Links,
    Footer,
    ChartCombo
  },
  data() {
    return {
      corr: null
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getCorr
    }
  },
  async mounted () {
    this.corr = await this.$store.dispatch('fetchCorr', [this.$route.query, 1, 10])
    console.log(this.corr);
  }
}

</script>
