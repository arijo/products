import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const authState = localStorage.getItem('auth');
  if (authState) {
    try {
      const { username } = JSON.parse(authState);
      const password = 'password';
      const auth = btoa(`${username}:${password}`);
      config.headers.Authorization = `Basic ${auth}`;
    } catch (error) {
      console.error('Error parsing auth state:', error);
    }
  }
  return config;
});

export default api;