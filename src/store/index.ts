import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user') || 'null') // 当前登录用户状态
  },
  mutations: {
    setUser (state, user) {
      try {
        sessionStorage.setItem('user', user)
        state.user = JSON.parse(user)
      } catch (e) {
        console.log(e)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
