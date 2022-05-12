import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, user) {
      state.user = JSON.parse(user)
      sessionStorage.setItem('user', user || 'null')
    }
  },
  actions: {
  },
  modules: {
  }
})
