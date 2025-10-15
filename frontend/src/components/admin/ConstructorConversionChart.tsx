import React from 'react';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: { name: string; value: number }[];
}

export const ConstructorConversionChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <FunnelChart>
      <Tooltip />
      <Funnel dataKey="value" data={data} isAnimationActive>
        <LabelList fill="#fff" stroke="none" dataKey="name" position="right" />
      </Funnel>
    </FunnelChart>
  </ResponsiveContainer>
);
