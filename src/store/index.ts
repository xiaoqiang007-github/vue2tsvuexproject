import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, user) {
      // 解决JSON.parse序列化异常的情况(JSON.parse('null'))
      try {
        state.user = JSON.parse(user || 'null')
        sessionStorage.setItem('user', user)
      } catch (e) {
        console.log('setUser error', e)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
