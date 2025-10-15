import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductType } from '@/types';

export const ProductSelection: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div>
      <h3>Выберите кондитерское изделие</h3>
      <Select {...register('productType')}>
        <SelectTrigger>
          <SelectValue placeholder="Изделие" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(ProductType).map((type) => (
            <SelectItem key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
