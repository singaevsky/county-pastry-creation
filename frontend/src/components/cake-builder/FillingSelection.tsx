import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useFillings } from '@/hooks/useProducts';

export const FillingSelection: React.FC = () => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'fillings' });
  const { data: fillingsOptions } = useFillings(); // From DB
  const productType = watch('productType'); // For dynamic max (handled in WizardSteps)

  return (
    <div>
      <h3>Выберите до 5 начинок</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <Select {...control.register(`fillings.${index}`)}>
            <SelectTrigger>
              <SelectValue placeholder="Начинка" />
            </SelectTrigger>
            <SelectContent>
              {fillingsOptions?.map((filling) => (
                <SelectItem key={filling.id} value={filling.name}>{filling.name} ({filling.cost} ₽)</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={() => remove(index)}>Удалить</Button>
        </div>
      ))}
      {fields.length < 5 && <Button type="button" onClick={() => append('')}>Добавить</Button>}
    </div>
  );
};
