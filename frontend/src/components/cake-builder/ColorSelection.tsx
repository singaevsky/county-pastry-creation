import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ColorSelection: React.FC = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'colors' });

  return (
    <div>
      <h3>Выберите до 2 цветов</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <Input {...control.register(`colors.${index}`)} placeholder="Цвет (e.g., #FF0000)" />
          <Button type="button" onClick={() => remove(index)}>Удалить</Button>
        </div>
      ))}
      {fields.length < 2 && <Button type="button" onClick={() => append('')}>Добавить цвет</Button>}
    </div>
  );
};
