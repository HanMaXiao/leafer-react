// playground/examples/BasicJSX.tsx
import React, { useState } from 'react';
import { Leafer, Group, Rect, Text } from '../../src/index';

export const BasicJSX: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [count, setCount] = useState(0);

  if (debug) {
    console.log('[BasicJSX] rendered, count:', count);
  }

  return (
    <Leafer fill="#f5f5f5">
      <Group x={100} y={80} >
        {/* Rectangle */}
        <Rect
          width={200}
          height={100}
          fill="#32cd79"
          stroke="#28b367"
          strokeWidth={2}
          cornerRadius={12}
        />

        {/* Title */}
        <Text
          x={30}
          y={25}
          text="leafer-react"
          fontSize={24}
          fill="#ffffff"
          fontWeight="bold"
        />

        {/* Counter */}
        <Text
          x={30}
          y={60}
          text={`Clicked: ${count} times`}
          fontSize={16}
          fill="#ffffff"
        />
        
        {/* Click handler overlay */}
        <Rect
          width={200}
          height={100}
          fill="transparent"
          onClick={() => setCount(c => c + 1)}
        />
      </Group>

      {/* Circle (using Rect with cornerRadius) */}
      <Rect
        x={400}
        y={130}
        width={120}
        height={120}
        fill="#667eea"
        stroke="#5a67d8"
        strokeWidth={2}
        cornerRadius={60}
        draggable={true}
      />

      {/* Instructions */}
      <Text
        x={100}
        y={250}
        text="• Click green rectangle to increment • Drag shapes to move"
        fontSize={14}
        fill="#666"
      />
    </Leafer>
  );
};

export const BasicJSXCode = `import React, { useState } from 'react';
import { Leafer, Group, Rect, Text } from '../../src/index';

export const BasicJSX: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [count, setCount] = useState(0);

  return (
    <Leafer fill="#f5f5f5">
      <Group x={100} y={80} draggable={true}>
        <Rect
          width={200}
          height={100}
          fill="#32cd79"
          cornerRadius={12}
          onClick={() => setCount(c => c + 1)}
        />
        <Text
          x={30}
          y={25}
          text="leafer-react"
          fontSize={24}
          fill="#ffffff"
          fontWeight="bold"
        />
        <Text
          x={30}
          y={60}
          text={\`Clicked: \${count} times\`}
          fontSize={16}
          fill="#ffffff"
        />
      </Group>
      <Rect
        x={400}
        y={130}
        width={120}
        height={120}
        fill="#667eea"
        cornerRadius={60}
        draggable={true}
      />
    </Leafer>
  );
};`.trim();
