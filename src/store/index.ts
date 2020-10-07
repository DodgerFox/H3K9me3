import Vue from 'vue'
import Vuex from 'vuex'

import dashboard from './modules/dashboard'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    dashboard,
    search
  }
})
