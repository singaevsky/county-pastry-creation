import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@ui/input';
import { Button } from '@ui/button';

export const FillingSelection: React.FC = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'fillings' });

  return (
    <div>
      <h3>Выберите до 3 начинок</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <Input {...control.register(`fillings.${index}`)} placeholder="Начинка (e.g., крем)" />
          <Button type="button" onClick={() => remove(index)}>Удалить</Button>
        </div>
      ))}
      {fields.length < 3 && <Button type="button" onClick={() => append('')}>Добавить</Button>}
    </div>
  );
};
