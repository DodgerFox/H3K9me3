// import eventsList from '@/data/events.json'
import axios from 'axios'
export default {
    state: {
      dashboardTable: null
    },
    mutations: {
      setTableDashboard(state, table) {
        state.dashboardTable = table
      }
    },
    actions: {
      async getDashboard({commit}) {
        let result;
        try {
          await axios
          .get('http://83.149.211.146:22180/lncrna/api/v1/dashboard')
          .then(responce => {
            result = responce.data
            commit('setTableDashboard', result)
            console.log(result);
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
        getDashboardTable: s => s.dashboardTable
    }
  }
  