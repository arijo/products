import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const username = 'admin';
  const password = 'password';
  const auth = btoa(`${username}:${password}`);
  config.headers.Authorization = `Basic ${auth}`;
  return config;
});

export default api;