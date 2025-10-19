import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Filling {
  id: number;
  name: string;
  price: number;
}

interface FillingFormValues {
  fillings: string[];
}

interface FillingSelectionProps {
  onSelect: (filling: Filling) => void;
}

function DefaultFillingSelection({ onSelect }: FillingSelectionProps) {
  const [fillings, setFillings] = useState<Filling[]>([]);

  useEffect(() => {
    api.get<Filling[]>('/fillings').then(response => setFillings(response.data));
  }, []);

  return (
    <div>
      {fillings.map(filling => (
        <div key={filling.id} onClick={() => onSelect(filling)}>
          {filling.name} - {filling.price} ₽
        </div>
      ))}
    </div>
  );
}

export { DefaultFillingSelection as default };

type FillingFormValues = {
  fillings: { value: string }[];
};

type FillingFieldArrayProps = {
  control: any;
};

const FillingFieldArray: React.FC<FillingFieldArrayProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fillings'
  });

  return (
    <div>
      <h3>Выберите до 3 начинок</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <Input {...control.register(`fillings.${index}.value`)} placeholder="Начинка (e.g., крем)" />
          <Button type="button" onClick={() => remove(index)}>Удалить</Button>
        </div>
      ))}
      {fields.length < 3 && (
        <Button type="button" onClick={() => append({ value: '' })}>
          Добавить
        </Button>
      )}
    </div>
  );
};
