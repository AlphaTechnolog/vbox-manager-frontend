import axios from 'axios'

export const api = axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER_IP}:8080/`,
})
