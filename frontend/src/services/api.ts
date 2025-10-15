import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy to backend:3000 via Vite
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ... existing

export const getSalesChart = (params: { startDate?: string; endDate?: string }) =>
  api.get('/admin/charts/sales', { params });

export const getFillingsPopularity = (params: { startDate?: string; endDate?: string }) =>
  api.get('/admin/charts/fillings-popularity', { params });

export const getConstructorConversion = (params: { startDate?: string; endDate?: string }) =>
  api.get('/admin/charts/constructor-conversion', { params });
