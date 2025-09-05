import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers:{
    'Content-Type': 'application/json',
  },
  timeout: 100000
})

export default api;