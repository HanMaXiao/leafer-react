// playground/examples/BasicElements.tsx
// 示例2：使用 React 绘制 Leafer 基础元素
import React from 'react';
import { Leafer, Rect, Ellipse, Star, Line, Text, Group, Frame, Polygon } from '../../src/index';

export const BasicElements: React.FC<{ debug?: boolean }> = ({ debug }) => {
  if (debug) console.log('[BasicElements] rendered');

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={20} text="2. 基础元素一览" fontSize={20} fontWeight="bold" fill="#333" />

      <Group x={50} y={60}>
        <Rect width={100} height={80} fill="#32cd79" cornerRadius={8} />
        <Text y={95} text="Rect" fontSize={14} fill="#333" />
      </Group>
      <Frame x={200} y={100} draggable={true} width={400} height={150} fill="#e0e0e0" cornerRadius={12}>
        <Text x={20} y={20} text="Frame 容器 (带背景)" fontSize={14} fontWeight="bold" fill="#495057" />
        <Rect x={20} y={35} width={80} height={50} fill="#a78bfa" cornerRadius={8} />
        <Ellipse x={115} y={35} width={80} height={50} fill="#f472b6" />
        <Star x={210} y={35} width={50} height={50} fill="#34d399" corners={6} />
        <Polygon x={275} y={35} width={50} height={50} fill="#fbbf24" />
      </Frame>
      <Group x={170} y={60}>
        <Ellipse width={100} height={80} fill="#ff6b6b" />
        <Text y={95} text="Ellipse" fontSize={14} fill="#333" />
      </Group>

      <Group x={290} y={60}>
        <Star width={100} height={100} fill="#ffd93d" corners={5} />
        <Text y={105} text="Star" fontSize={14} fill="#333" />
      </Group>

      <Group x={420} y={60}>
        <Line points={[0, 40, 80, 10, 160, 40]} stroke="#845ef7" strokeWidth={3} />
        <Text y={60} text="Line" fontSize={14} fill="#333" />
      </Group>

      <Text x={50} y={210} text="每个元素直接映射到 Leafer 原生图形实例" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const BasicElementsCode = `import { Leafer, Rect, Ellipse, Star, Line, Text, Group } from 'leafer-react';

function App() {
  return (
    <Leafer fill="#f5f5f5">
      <Rect width={100} height={80} fill="#32cd79" cornerRadius={8} />
      <Ellipse x={150} width={100} height={80} fill="#ff6b6b" />
      <Star x={280} width={100} height={100} fill="#ffd93d" points={5} />
      <Line points={[0, 40, 80, 10, 160, 40]} stroke="#845ef7" strokeWidth={3} />
    </Leafer>
  );
}`.trim();
