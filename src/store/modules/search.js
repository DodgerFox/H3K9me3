
export default {
    state: {
      activeFilters: [],
      ranges: {
        plus: null,
        minus: null
      }
    },
    mutations: {
      setRange(state, {name, val}) {
        state.ranges[name] = val
        console.log(state.ranges);
      },
      // setActiveFilters(state, active) {
      //   state.activeFilters = active
      // }
    },
    actions: {
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
        getActiveFilters: s => s.activeFilters,
        getRanges: s => s.ranges
    }
  }
  