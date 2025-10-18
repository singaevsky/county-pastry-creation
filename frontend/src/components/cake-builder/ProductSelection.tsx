import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  basePrice: number;
}

interface Props {
  selected: string;
  onSelect: (slug: string) => void;
}

export const ProductSelection: React.FC<Props> = ({ selected, onSelect }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="product-selection">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.slug)}
          className={selected === p.slug ? 'selected' : ''}
        >
          {p.name} — ${p.basePrice}
        </button>
      ))}
    </div>
  );
};
