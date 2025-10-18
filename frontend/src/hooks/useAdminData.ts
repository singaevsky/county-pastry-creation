import { useQuery } from '@tanstack/react-query'; // Assume installed for data fetching
import {
  getSalesChart,
  getFillingsPopularity,
  getConstructorConversion,
} from '../services/api';

export const useSalesData = (startDate?: string, endDate?: string) =>
  useQuery({
    queryKey: ['sales', startDate, endDate],
    queryFn: () => getSalesChart({ startDate, endDate }),
  });

export const useFillingsPopularity = (startDate?: string, endDate?: string) =>
  useQuery({
    queryKey: ['fillings', startDate, endDate],
    queryFn: () => getFillingsPopularity({ startDate, endDate }),
  });

export const useConstructorConversion = (startDate?: string, endDate?: string) =>
  useQuery({
    queryKey: ['conversion', startDate, endDate],
    queryFn: () => getConstructorConversion({ startDate, endDate }),
  });
