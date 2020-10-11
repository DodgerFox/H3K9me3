import axios from 'axios'
export default {
    state: {
      result: null,
      activeFilters: [],
      ranges: {
        plus: [0.10, 0.80],
        minus: [0.10, 0.80]
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
      async search({commit, state}, [searchData, page, max]) {
        let result;
        console.log(searchData, 'sd');
        let query = `http://83.149.211.146:22180/lncrna/api/v1/search/results?page=${page}&page_count=${max}`;
        for (const iterator in searchData) {
          let str = searchData[iterator] && searchData[iterator].length > 0 ? `&${iterator}=[${searchData[iterator]}]` : ''; 
          query = query + str;
        }
        query = query + '&tresholds=' + `[[${state.ranges.plus}],[${state.ranges.munis}]]`;
        console.log(query);
        try {
          console.log('start');
          await axios
          .post(query)
          .then(response => {
            console.log(response,'res');
            result = response.data
            commit('setResults', result)
          })
          .catch(error => {
            console.log(error, 'er');
          })
        } catch (error) {
          console.error(error, 'er2');
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
  