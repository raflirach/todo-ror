import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    isAdd: false
  },
  mutations: {
    insertTodo (state, payload) {
      state.todos = payload
    },
    changeIsAdd (state, payload) {
      state.isAdd = payload
    }
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
    },
    async fetchTodo ({ commit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/todos',
          headers: {
            'Access-Token': localStorage.access_token
          }
        })
        commit('insertTodo', data)
      } catch (err) {
        console.log(err.response.data)
      }
    },
    async addTodo ({ commit }, payload) {
      const { title, dueDate, status, priority } = payload
      try {
        await axios({
          method: 'POST',
          url: '/todos',
          headers: {
            'Access-Token': localStorage.access_token
          },
          data: {
            title,
            due_date: dueDate,
            status,
            priority
          }
        })
        commit('changeIsAdd', false)
        this.dispatch('fetchTodo')
      } catch (err) {
        console.log(err.response.data)
      }
    },
    async deleteTodo (_, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/todos/${id}`,
          headers: {
            'Access-Token': localStorage.access_token
          }
        })
        this.dispatch('fetchTodo')
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }
})
