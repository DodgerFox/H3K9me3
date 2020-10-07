<template>
    <main class="main">
        <Header />
        <section class="detail">
            <div class="wrap">
                <h2 class="section-title">Search result</h2>
                <div class="block">
                    <h4>Chart of peaks distribution</h4>
                    <ChartPeaks :data="getTable" />
                </div>
                <Table :max="10" v-if="getTable" :data="getTable" />
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
      articles: [],
      user: {}
    }
  },
  computed: {
    getTable () {
      return this.$store.getters.getDashboardTable
    }
  },
  async mounted () {
    this.articles = await this.$store.dispatch('getDashboard')
  }
}

</script>
