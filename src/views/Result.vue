<template>
    <main class="main">
        <Header />
        <section class="result">
            <div class="wrap">
                <!-- <h4 v-if="getTable">{{ getTable.title }}</h4> -->
                <!-- <h4 v-if="!getTable">Nothing found, please try again</h4> -->
                <h4 v-if="results">{{ results.title }}</h4>
                <h4 v-if="!results">Nothing found, please try again</h4>
                <!-- <Table :max="10" v-if="getTable" :data="getTable.table" /> -->
                <Table :max="10" v-if="results" :data="results.table" />
            </div>
        </section>
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import result from '@/data/result.json'

export default {
  name: 'result',
  components: {
    Header,
    Table,
    Footer
  },
  data() {
    return {
      results: null
    }
  },
  computed: {
    getTable () {
      console.log(this.$store.getters.getResults);
      return this.$store.getters.getResults
    }
  },
  async mounted () {
    this.results = await result
    // this.results = await this.$store.getters.getResults
    console.log(this.results);
  }
}

</script>
