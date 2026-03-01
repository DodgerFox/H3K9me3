import { createStore } from 'vuex'

import dashboard from './modules/dashboard'
import search from './modules/search'
import info from './modules/info'
import opens from './modules/opens'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    dashboard,
    search,
    info,
    opens
  }
})
