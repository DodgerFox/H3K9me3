<template>
    <main class="main">
        <Header />
        <section class="result">
            <div class="wrap">
                <div class="result-header">
                  <h4 v-if="getTable && results">{{ results.title || getTable.title}}</h4>
                  <h4 v-if="!getTable && !results ">Nothing found, please try again</h4>
                  <a @click="download" class="button violet download" v-if="getTable && results">
                    <p>Download</p>
                  </a>
                </div>
                <Table :max="10" v-if="results" :data="getTable.table || results.table" />
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
import Loader from '@/components/Loader';
import axios from 'axios'

export default {
  name: 'result',
  components: {
    Header,
    Table,
    Loader,
    Footer
  },
  data() {
    return {
      results: null,
      link: null
    }
  },
  computed: {
    getTable () {
      return this.$store.getters.getResults
    }
  },
  methods: {
    async download() {
      let query = `http://83.149.211.146:22180/lncrna/api/v1/download`;
        let searchData = await this.$store.getters.getSearchData;
        JSON.stringify(searchData)
        try {
          this.$store.dispatch('setLoader', true)
          await axios
          .post(query, searchData, {headers: {'Content-Type': 'application/json'}, timeout: 60000})
          .then(response => {
            window.open(response, '_blank')
            this.$store.dispatch('setLoader', false)
          })
          .catch(error => {
            this.$store.dispatch('setLoader', false)
            console.log(error);
          })
        } catch (error) {
          console.log(error);
        }
      }
  },
  async mounted () {
    this.$store.dispatch('setLoader', true)
    this.results = await this.$store.getters.getResults
    this.$store.dispatch('setLoader', false)
  }
}

</script>
