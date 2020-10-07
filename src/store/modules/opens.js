
export default {
  state: {
    panel: false,
    workplace: false,
    transport: false,
    loader: true
  },
  mutations: {
    setState(state, element, val) {
      state[element] = val ? val : !state[element]
    }
  },
  actions: {
    changeState({commit}, element, val) {
        commit('setState', element, val)
    }
  },
  getters: {
    panel: s => s.panel,
    workplace: s => s.workplace,
    transport: s => s.transport,
    loader: s => s.loader
  }
}
