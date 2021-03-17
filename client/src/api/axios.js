import axios from 'axios'

const todoAPI = axios.create({
  baseURL: 'https://todo-ror-vue.herokuapp.com'
})

export default todoAPI
