import React, { useState } from 'react';
import { Leafer, Rect, Text, Group } from '../src';

export function BasicJSXExample() {
  const [count, setCount] = useState(0);

  return (
    <Leafer view={window} editor={true} fill="#f5f5f5">
      <Group x={100} y={100}>
        <Rect
          width={200}
          height={100}
          fill="#32cd79"
          draggable={true}
          onClick={() => setCount(count + 1)}
        />
        <Text
          x={20}
          y={35}
          text={`Clicked: ${count}`}
          fontSize={20}
          fill="#fff"
        />
      </Group>
    </Leafer>
  );
}
