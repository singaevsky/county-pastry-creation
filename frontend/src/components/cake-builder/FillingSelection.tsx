import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '@ui/input';
import { Button } from '@ui/button';

export function FillingSelection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fillings",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input {...control.register(`fillings.${index}.value`)} placeholder="Начинка (например, крем)" />
          <Button type="button" onClick={() => remove(index)}>Удалить</Button>
        </div>
      ))}
      {fields.length < 3 && (
        <Button type="button" onClick={() => append({ value: '' })}>
          Добавить начинку
        </Button>
      )}
    </div>
  );
}
