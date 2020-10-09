import axios from 'axios'
export default {
    state: {
      result: null,
      activeFilters: [],
      ranges: {
        plus: null,
        minus: null
      },
      searchData: null
    },
    mutations: {
      setRange(state, {name, val}) {
        state.ranges[name] = val
        console.log(state.ranges);
      },
      setResults(state, result) {
        state.result = result
      },
      setSearch(state, searchData) {
        state.searchData = searchData
      }
    },
    actions: {
      async search({commit}, [searchData, page, max]) {
        let result;
        let query = `http://83.149.211.146:22180/lncrna/api/v1/search/results?page=${page}&page_count=${max}&hm=[${searchData.histones}]&gene=[${searchData.genes}]&coords=[${searchData.coords}&corr_plus_threshold=[${searchData.ranges.plus}]&corr_minus_threshold=[${searchData.ranges.minus}]]`;
        // for (const iterator of searchData) {
        //   searchData
        // }
        console.log(query);
        try {
          await axios
          .post(query)
          .then(response => {
            result = response.data.response
            commit('setResults', result)
          })
          .catch(error => {
            console.log(error);
          })
        } catch (error) {
          console.error(error);
        }
        return result
      },
      setSearch({commit}, searchData) {
        commit('setSearch', searchData)
      },
      setRange({commit}, {name, val}) {
        commit('setRange', {name, val})
      },
      changeFilters({state, commit}, element) {
        let id = element.id;
        let filters = state.filters; 
        state.filters = filters.map(el => {
            let fresh = el.id === id ? element : el;
            return fresh;
        })        
        const active = filters.filter(element => element.active);
        commit('setActiveFilters', active)
        console.log(state);
      }
    },
    getters: {
        getSearchData: s => s.searchData,
        getResults: s => s.result,
        getResultPage: s => s.resultPage,
        getActiveFilters: s => s.activeFilters,
        getRanges: s => s.ranges
    }
  }
  