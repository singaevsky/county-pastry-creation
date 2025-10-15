import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SalesChart } from './SalesChart';
import { FillingsPopularityChart } from './FillingsPopularityChart';
import { ConstructorConversionChart } from './ConstructorConversionChart';
import {
  useSalesData,
  useFillingsPopularity,
  useConstructorConversion,
} from '../../hooks/useAdminData';

export const AdminDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const { data: sales } = useSalesData(startDate, endDate);
  const { data: fillings } = useFillingsPopularity(startDate, endDate);
  const { data: conversion } = useConstructorConversion(startDate, endDate);

  const handleFilter = () => {
    // Trigger refetch via query keys
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input type="date" value={startDate || ''} onChange={(e) => setStartDate(e.target.value)} />
          <Input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} />
          <Button onClick={handleFilter}>Применить</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>График продаж</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={sales?.data || []} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Популярность начинок</CardTitle>
        </CardHeader>
        <CardContent>
          <FillingsPopularityChart data={fillings?.data || []} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Конверсия конструктора</CardTitle>
        </CardHeader>
        <CardContent>
          <ConstructorConversionChart data={conversion?.data || []} />
        </CardContent>
      </Card>
    </div>
  );
};
