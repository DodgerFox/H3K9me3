// import eventsList from '@/data/events.json'
import axios from 'axios'
export default {
    state: {
      activeArticle: null,
      articles: null
    },
    mutations: {
      setArticles(state, articles) {
        state.articles = articles
      },
      setActiveArticle(state, active) {
        state.activeArticle = active
      }
    },
    actions: {
      async setArticles({commit}) {
        let result;
        try {
          await axios
          .get('http://localhost:3000/api/articles')
          .then(responce => {
            result = responce.data
            console.log(result, 'res');
            commit('setArticles', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      setActiveArticle({commit}, active) {
        commit('setActiveArticle', active)
        console.log(active, 'active');
      }
    },
    getters: {
        getActiveArticle: s => s.activeArticle,
        getArticles: s => s.articles
    }
  }
  