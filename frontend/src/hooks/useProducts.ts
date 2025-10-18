import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useProducts = () => useQuery({
  queryKey: ['products'],
  queryFn: () => api.get('/recipes/products').then(res => res.data),
});

export const useFillings = () => useQuery({
  queryKey: ['fillings'],
  queryFn: () => api.get('/recipes/fillings').then(res => res.data),
});
