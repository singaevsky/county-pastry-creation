import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Filling {
  id: number;
  name: string;
  price: number;
}

interface Props {
  selected: { [fillingId: number]: number };
  onChange: (selected: { [fillingId: number]: number }) => void;
}

export const FillingSelection: React.FC<Props> = ({ selected, onChange }) => {
  const [fillings, setFillings] = useState<Filling[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/fillings')
      .then((res) => setFillings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleQtyChange = (id: number, qty: number) => {
    onChange({ ...selected, [id]: qty });
  };

  if (loading) return <div>Loading fillings...</div>;

  return (
    <div className="filling-selection">
      {fillings.map((f) => (
        <div key={f.id}>
          <span>{f.name} — ${f.price}</span>
          <input
            type="number"
            min={0}
            value={selected[f.id] || 0}
            onChange={(e) => handleQtyChange(f.id, parseInt(e.target.value, 10))}
          />
        </div>
      ))}
    </div>
  );
};
