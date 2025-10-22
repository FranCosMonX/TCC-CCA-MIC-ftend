import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.18.44:5000',
  headers:{
    'Content-Type': 'application/json',
  },
  timeout: 100000
})

export default api;