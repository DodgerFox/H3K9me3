// import eventsList from '@/data/events.json'
import axios from 'axios'
export default {
    state: {
      histone: null
    },
    mutations: {
      setArticles(state, articles) {
        state.articles = articles
      }
    },
    actions: {
      async fetchHistone({commit}, histone) {
        let result;
        try {
          await axios
          .post(`http://83.149.211.146:22180/lncrna/api/v1/info/modification?hm=${histone}`)
          .then(response => {
            result = response.data.response
            commit('setHistone', result)
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
        getHistone: s => s.histone
    }
  }
  