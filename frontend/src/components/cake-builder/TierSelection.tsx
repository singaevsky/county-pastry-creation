import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TierSelection: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div>
      <h3>Выберите количество ярусов</h3>
      <Select {...register('tiers')}>
        <SelectTrigger>
          <SelectValue placeholder="Ярусы" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5].map((tier) => (
            <SelectItem key={tier} value={tier.toString()}>{tier}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
