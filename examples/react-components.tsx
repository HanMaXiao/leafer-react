import React, { useState } from 'react';
import { Leafer, ReactComponent } from '../src';

const CardComponent: React.FC<{
  title: string;
  count: number;
  width: number;
  height: number;
  onCountChange: (val: number) => void;
}> = ({ title, count, width, height, onCountChange }) => {
  return (
    <div
      style={{
        width,
        height,
        padding: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: 'system-ui',
      }}
      onClick={() => onCountChange(count + 1)}
    >
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{count}</div>
    </div>
  );
};

export function ReactComponentsExample() {
  const [counts, setCounts] = useState({ card1: 0, card2: 0 });

  return (
    <Leafer view={'window'} editor={true} fill="#f5f5f5">
      <ReactComponent
        x={100}
        y={100}
        width={250}
        height={150}
        component={CardComponent}
        props={{
          title: 'Card 1',
          count: counts.card1,
          onCountChange: (val) => setCounts({ ...counts, card1: val }),
        }}
        draggable={true}
      />
      <ReactComponent
        x={400}
        y={100}
        width={250}
        height={150}
        component={CardComponent}
        props={{
          title: 'Card 2',
          count: counts.card2,
          onCountChange: (val) => setCounts({ ...counts, card2: val }),
        }}
        draggable={true}
      />
    </Leafer>
  );
}
