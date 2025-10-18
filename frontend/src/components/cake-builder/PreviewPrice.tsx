import React from 'react';
import { Card } from '@/components/ui/card';

interface Props { price: number | null; }

export const PreviewPrice: React.FC<Props> = ({ price }) => (
  <Card className="p-4">
    <h3>Предварительная стоимость: {price ? `${price} ₽` : 'Расчет...'}</h3>
    <p>Включая НДС и доставку. 50% предоплата.</p>
  </Card>
);
