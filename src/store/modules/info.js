// import eventsList from '@/data/events.json'
import axios from 'axios'
export default {
    state: {
      histone: null,
      gene: null,
      lncrna: null
    },
    mutations: {
      setHistone(state, result) {
        state.histone = result
      },
      setGene(state, result) {
        state.gene = result
      },
      setLncrna(state, result) {
        state.lncrna = result
      }
    },
    actions: {
      async fetchHistone({commit}, [histone, page, max]) {
        let result;
        let query = `http://83.149.211.146:22180/lncrna/api/v1/info/modification?hm=${histone}&page=${page}&page_count=${max}`;
        try {
          await axios
          .get(query)
          .then(response => {
            result = response.data
            commit('setHistone', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      async fetchGene({commit}, [gene, page, max]) {
        let result;
        try {
          await axios
          .get(`http://83.149.211.146:22180/lncrna/api/v1/info/gene?gene=${gene}&page=${page}&page_count=${max}`)
          .then(response => {
            result = response.data
            commit('setGene', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      async fetchLncrna({commit}, [lncrna, page, max]) {
        let result;
        try {
          await axios
          .get(`http://83.149.211.146:22180/lncrna/api/v1/info/lncrna?lncrna=${lncrna}&page=${page}&page_count=${max}`)
          .then(response => {
            result = response.data
            commit('setLncrna', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      }
    },
    getters: {
        getHistone: s => s.histone,
        getGene: s => s.gene,
        getLncrna: s => s.lncrna
    }
  }
  