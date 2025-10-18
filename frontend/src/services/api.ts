import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error('Network error', err);
      throw new Error('Network error');
    }
    console.error(err.response.data);
    throw err.response.data;
  },
);
