<template>
    <main class="main">
        <Header />
        <section class="result">
            <div class="wrap">
                <h4>Search result</h4>
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

export default {
  name: 'result',
  components: {
    Header,
    Table,
    Footer
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
