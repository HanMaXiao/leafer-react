// playground/examples/ReactBasicComponent.tsx
// 示例4：渲染 React 基础组件（使用 div 等 HTML 容器）
import React from 'react';
import { Leafer, Rect, Text, Group } from '../../src/index';

// 一个用 div 容器包裹的卡片组件
function Card({ title, color }: { title: string; color: string }) {
  return (
    <div>
      <Rect width={40} height={40} x={10} y={10} fill={color} opacity={0.3} cornerRadius={8} />
      <Text x={60} y={15} text={title} fontSize={16} fill={color} fontWeight="bold" />
    </div>
  );
}

export const ReactBasicComponent: React.FC<{ debug?: boolean }> = ({ debug }) => {
  if (debug) console.log('[ReactBasicComponent] rendered');

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={20} text="4. 渲染 React 基础组件" fontSize={20} fontWeight="bold" fill="#333" />

      <Group x={50} y={70}>
        <Card title="Card with div" color="#667eea" />
      </Group>
      <Group x={280} y={70}>
        <Card title="Another Card" color="#f5576c" />
      </Group>

      <Text x={50} y={200} text='<div fill="..."> 自动映射为 Leafer Frame (带背景) 或 Group (无背景)' fontSize={14} fill="#666" />
      <Text x={50} y={225} text="函数组件由 Reconciler 自动展开，无需特殊处理" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const ReactBasicComponentCode = `import { Leafer, Rect, Text, Group } from 'leafer-react';

// div 带 fill 会映射为 Frame，不带 fill 映射为 Group
function Card({ title, color }) {
  return (
    <div fill={color} cornerRadius={12}>
      <Rect width={40} height={40} x={10} y={10} fill="#fff" opacity={0.3} />
      <Text x={60} y={15} text={title} fontSize={16} fill="#fff" />
    </div>
  );
}

function App() {
  return (
    <Leafer fill="#f5f5f5">
      <Group x={50} y={70}>
        <Card title="Card with div" color="#667eea" />
      </Group>
    </Leafer>
  );
}`.trim();
