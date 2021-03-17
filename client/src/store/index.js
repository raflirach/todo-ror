import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    isAdd: false,
    prioritySort: '',
    undoneSort: '',
    doneSort: ''
  },
  mutations: {
    insertTodo (state, payload) {
      state.todos = payload
    },
    changeIsAdd (state, payload) {
      state.isAdd = payload
    },
    changePrioritySort (state, payload) {
      state.prioritySort = payload
    },
    changeUndoneSort (state, payload) {
      state.undoneSort = payload
    },
    changeDoneSort (state, payload) {
      state.doneSort = payload
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
  },
  getters: {
    doneTodo: state => {
      if (state.doneSort === 'title') {
        return state.todos.filter(todo => todo.status === true)
          .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      } else {
        return state.todos.filter(todo => todo.status === true)
          .sort((a, b) => (a.due_date > b.due_date) ? 1 : ((b.due_date > a.due_date) ? -1 : 0))
      }
    },
    undoneTodo: state => {
      if (state.undoneSort === 'title') {
        return state.todos.filter(todo => todo.status === false && todo.priority === false)
          .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      } else {
        return state.todos.filter(todo => todo.status === false && todo.priority === false)
          .sort((a, b) => (a.due_date > b.due_date) ? 1 : ((b.due_date > a.due_date) ? -1 : 0))
      }
    },
    priorityTodo: state => {
      if (state.prioritySort === 'title') {
        return state.todos.filter(todo => todo.status === false && todo.priority === true)
          .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      } else {
        return state.todos.filter(todo => todo.status === false && todo.priority === true)
          .sort((a, b) => (a.due_date > b.due_date) ? 1 : ((b.due_date > a.due_date) ? -1 : 0))
      }
    }
  }
})
