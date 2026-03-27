// playground/examples/ReactComponent.tsx
import React, { useState } from 'react';
import { Leafer, ReactComponent, Text } from '../../src/index';

// Card component to be rendered on canvas
const Card: React.FC<{
  title: string;
  count: number;
  color: string;
  onClick?: () => void;
}> = ({ title, count, color, onClick }) => {
  const cardStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    padding: '20px',
    background: color,
    borderRadius: '12px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'system-ui',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '8px' }}>{count}</div>
    </div>
  );
};

export const ReactComponentExample: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [counts, setCounts] = useState({ card1: 42, card2: 88, card3: 15 });

  const handleCardClick = (key: keyof typeof counts) => {
    setCounts(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  if (debug) {
    console.log('[ReactComponent] rendered, counts:', counts);
  }

  return (
    <Leafer fill="#f5f5f5">
      {/* Title */}
      <Text
        x={50}
        y={30}
        text="React Components on Leafer Canvas"
        fontSize={20}
        fontWeight="bold"
        fill="#333"
      />

      {/* Card 1 */}
      <ReactComponent
        x={80}
        y={80}
        width={200}
        height={120}
        component={Card}
        props={{
          title: 'Card 1',
          count: counts.card1,
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          onClick: () => handleCardClick('card1'),
        }}
        draggable={true}
      />

      {/* Card 2 */}
      <ReactComponent
        x={320}
        y={80}
        width={200}
        height={120}
        component={Card}
        props={{
          title: 'Card 2',
          count: counts.card2,
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          onClick: () => handleCardClick('card2'),
        }}
        draggable={true}
      />

      {/* Card 3 */}
      <ReactComponent
        x={560}
        y={80}
        width={200}
        height={120}
        component={Card}
        props={{
          title: 'Card 3',
          count: counts.card3,
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          onClick: () => handleCardClick('card3'),
        }}
        draggable={true}
      />

      {/* Instructions */}
      <Text
        x={80}
        y={240}
        text="• Click cards to increment • Drag cards to move"
        fontSize={14}
        fill="#666"
      />
    </Leafer>
  );
};

export const ReactComponentCode = `import React, { useState } from 'react';
import { Leafer, ReactComponent, Text } from '@leafer-react';

const Card: React.FC<{
  title: string;
  count: number;
  color: string;
  onClick?: () => void;
}> = ({ title, count, color, onClick }) => {
  const cardStyle = {
    width: '100%',
    height: '100%',
    padding: '20px',
    background: color,
    borderRadius: '12px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'system-ui',
    cursor: onClick ? 'pointer' : 'default',
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{count}</div>
    </div>
  );
};

export const ReactComponentExample = () => {
  const [counts, setCounts] = useState({ card1: 42, card2: 88, card3: 15 });

  return (
    <Leafer fill="#f5f5f5">
      <ReactComponent
        x={80}
        y={80}
        width={200}
        height={120}
        component={Card}
        props={{
          title: 'Card 1',
          count: counts.card1,
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          onClick: () => setCounts(c => ({ ...c, card1: c.card1 + 1 })),
        }}
        draggable={true}
      />
    </Leafer>
  );
};`.trim();
