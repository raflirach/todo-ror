import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async register (_, payload) {
      try {
        const { email, password } = payload
        await axios({
          method: 'POST',
          url: '/register',
          data: {
            email,
            password
          }
        })
        router.push('/login')
      } catch (err) {
        console.log(err.response.data)
      }
    },
    async login (_, payload) {
      try {
        const { email, password } = payload
        const { data } = await axios({
          method: 'POST',
          url: '/login',
          data: {
            email,
            password
          }
        })
        localStorage.access_token = data['Access-Token']
        router.push('/')
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }
})
