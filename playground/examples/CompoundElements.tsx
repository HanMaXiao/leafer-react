// playground/examples/CompoundElements.tsx
// 示例3：使用 React 绘制复合 Leafer 元素（基础元素组合）
import React from 'react';
import { Leafer, Rect, Text, Group, Ellipse } from '../../src/index';

// 用 Leafer 基础元素组合出一个 "卡片"
function Card({ x, y, title, color }: { x: number; y: number; title: string; color: string }) {
  return (
    <Group x={x} y={y}>
      <Rect width={180} height={100} fill={color} cornerRadius={12} />
      <Rect x={10} y={10} width={40} height={40} fill="#fff" opacity={0.3} cornerRadius={8} />
      <Text x={60} y={15} text={title} fontSize={16} fill="#fff" fontWeight="bold" />
      <Text x={60} y={40} text="复合元素组合" fontSize={12} fill="rgba(255,255,255,0.8)" />
      <Ellipse x={140} y={70} width={30} height={20} fill="rgba(255,255,255,0.25)" />
    </Group>
  );
}

export const CompoundElements: React.FC<{ debug?: boolean }> = ({ debug }) => {
  if (debug) console.log('[CompoundElements] rendered');

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={20} text="3. 复合 Leafer 元素组合" fontSize={20} fontWeight="bold" fill="#333" />

      <Card x={50} y={70} title="Card A" color="#667eea" />
      <Card x={260} y={70} title="Card B" color="#f5576c" />
      <Card x={470} y={70} title="Card C" color="#32cd79" />

      <Text x={50} y={200} text="Card 是由 Rect + Text + Ellipse 组合的函数组件" fontSize={14} fill="#666" />
      <Text x={50} y={225} text="Reconciler 自动递归展开，将子元素挂载到父 Group" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const CompoundElementsCode = `import { Leafer, Rect, Text, Group, Ellipse } from 'leafer-react';

function Card({ x, y, title, color }) {
  return (
    <Group x={x} y={y}>
      <Rect width={180} height={100} fill={color} cornerRadius={12} />
      <Text x={60} y={15} text={title} fontSize={16} fill="#fff" />
      <Ellipse x={140} y={70} width={30} height={20} fill="rgba(255,255,255,0.25)" />
    </Group>
  );
}

function App() {
  return (
    <Leafer fill="#f5f5f5">
      <Card x={50} y={70} title="Card A" color="#667eea" />
      <Card x={260} y={70} title="Card B" color="#f5576c" />
    </Leafer>
  );
}`.trim();
