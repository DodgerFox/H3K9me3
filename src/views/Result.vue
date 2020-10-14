<template>
    <main class="main">
        <Header />
        <section class="result">
            <div class="wrap">
                <div class="result-header">
                  <h4 v-if="getTable && results">{{ results.title || getTable.title}}</h4>
                  <h4 v-if="!getTable && !results ">Nothing found, please try again</h4>
                  <a :href=link class="button violet download" v-if="getTable && results">
                    <p>Download</p>
                  </a>
                </div>
                <Table :max="10" v-if="results" :data="getTable.table || results.table" />
            </div>
        </section>
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Table from '@/components/Table';
import axios from 'axios'

export default {
  name: 'result',
  components: {
    Header,
    Table,
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
      console.log(this.$store.getters.getResults);
      return this.$store.getters.getResults
    }
  },
  methods: {
    async download() {
        let query = `http://83.149.211.146:22180/lncrna/api/v1/search/results`;
        let searchData = await this.$store.getters.searchData;
        JSON.stringify(searchData)
        try {
          await axios
          .post(query, searchData, {headers: {'Content-Type': 'application/json'}, timeout: 60000, responseType: 'blob'})
          .then(response => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response]));
            this.download = downloadUrl;
            let link = document.querySelector('.download');
            link.setAttribute('download', 'file.zip'); //any other extension
            link.click();
            link.remove();
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.log(error);
        }
      }
  },
  async mounted () {
    this.results = await this.$store.getters.getResults
    // this.download()
    console.log(this.results);
  }
}

</script>
