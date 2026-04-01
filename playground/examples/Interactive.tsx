// playground/examples/Interactive.tsx
import React, { useState } from 'react';
import { Leafer, Rect, Text, Group } from '../../src/index';

export const Interactive: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [clicks, setClicks] = useState({ rect1: 0, rect2: 0 });
  const [hovered, setHovered] = useState<string | null>(null);

  if (debug) {
    console.log('[Interactive] rendered, clicks:', clicks, 'hovered:', hovered);
  }

  return (
    <Leafer fill="#f5f5f5">
      {/* Title */}
      <Text
        x={50}
        y={30}
        text="Interactive Events Demo"
        fontSize={20}
        fontWeight="bold"
        fill="#333"
      />

      {/* Rectangle 1 - Click */}
      <Group x={100} y={80}>
        <Rect
          width={200}
          height={100}
          fill={hovered === 'rect1' ? '#3dd88a' : '#32cd79'}
          stroke="#28b367"
          strokeWidth={2}
          cornerRadius={12}
          onClick={() => setClicks(c => ({ ...c, rect1: c.rect1 + 1 }))}
        />
        <Text
          x={50}
          y={35}
          text={`Click me! (${clicks.rect1})`}
          fontSize={18}
          fill="#ffffff"
          fontWeight="bold"
        />
      </Group>

      {/* Rectangle 2 - Click */}
      <Group x={400} y={80}>
        <Rect
          width={200}
          height={100}
          fill={hovered === 'rect2' ? '#f40ea7' : '#667eea'}
          stroke="#5a67d8"
          strokeWidth={2}
          cornerRadius={12}
          hittable={true}
          onClick={() => setClicks(c => ({ ...c, rect2: c.rect2 + 1 }))}
          onMouseEnter={() => setHovered('rect2')}
          onMouseLeave={() => setHovered(null)}
        />
        <Text
          x={50}
          y={35}
          text={`Me too! (${clicks.rect2})`}
          fontSize={18}
          fill="#ffffff"
          fontWeight="bold"
        />
      </Group>

      {/* Draggable shapes */}
      <Rect
        x={100}
        y={250}
        width={100}
        height={100}
        fill="#ffa500"
        cornerRadius={8}
        draggable={true}
      />
      <Rect
        x={250}
        y={250}
        width={100}
        height={100}
        fill="#ff6b6b"
        cornerRadius={8}
        draggable={true}
      />

      {/* Instructions */}
      <Text
        x={100}
        y={400}
        text="• Click rectangles to increment • Hover for highlight • Drag bottom shapes"
        fontSize={14}
        fill="#666"
      />
    </Leafer>
  );
};

export const InteractiveCode = `import React, { useState } from 'react';
import { Leafer, Rect, Text, Group } from '@leafer-react';

export const Interactive = () => {
  const [clicks, setClicks] = useState({ rect1: 0, rect2: 0 });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Leafer fill="#f5f5f5">
      <Group x={100} y={80}>
        <Rect
          width={200}
          height={100}
          fill={hovered === 'rect1' ? '#3dd88a' : '#32cd79'}
          cornerRadius={12}
          cursor="pointer"
          onClick={() => setClicks(c => ({ ...c, rect1: c.rect1 + 1 }))}
          onMouseEnter={() => setHovered('rect1')}
          onMouseLeave={() => setHovered(null)}
        />
        <Text
          x={50}
          y={35}
          text={\`Click me! (\${clicks.rect1})\`}
          fontSize={18}
          fill="#ffffff"
        />
      </Group>
      <Rect
        x={100}
        y={250}
        width={100}
        height={100}
        fill="#ffa500"
        cornerRadius={8}
        draggable={true}
      />
    </Leafer>
  );
};`.trim();
