import axios from 'axios'

const todoAPI = axios.create({
  baseURL: 'http://localhost:3000'
})

export default todoAPI