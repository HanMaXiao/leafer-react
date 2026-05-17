// playground/examples/ReactCompoundComponent.tsx
// 示例5：渲染 React 复合组件（组件套组件）
import React, { useState } from 'react';
import { Leafer, Rect, Text, Group } from '../../src/index';

// 基础组件：单个卡片
function Card({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <div>
      <Text x={15} y={12} text={title} fontSize={15} fill={color} fontWeight="bold" />
      <Text x={15} y={35} text={`Count: ${count}`} fontSize={13} fill={color} />
    </div>
  );
}

// 复合组件：卡片列表
function CardList({ items }: { items: { title: string; count: number; color: string }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <Group key={i} x={i * 190} y={0}>
          <Card title={item.title} count={item.count} color={item.color} />
        </Group>
      ))}
    </div>
  );
}

export const ReactCompoundComponent: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [counts, setCounts] = useState([3, 7, 5]);

  if (debug) console.log('[ReactCompoundComponent] rendered, counts:', counts);

  const items = [
    { title: 'React', count: counts[0], color: '#667eea' },
    { title: 'Leafer', count: counts[1], color: '#32cd79' },
    { title: 'TypeScript', count: counts[2], color: '#f5576c' },
  ];

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={20} text="5. 渲染 React 复合组件" fontSize={20} fontWeight="bold" fill="#333" />

      <Group x={50} y={70}>
        <CardList items={items} />
      </Group>

      <Rect x={50} y={200} width={120} height={40} fill="#667eea" cornerRadius={8}
        onClick={() => setCounts(c => c.map(v => v + 1))} />
      <Text x={70} y={210} text="All +1" fontSize={14} fill="#fff" />

      <Text x={50} y={270} text="CardList 包裹多个 Card，Reconciler 自动递归展开" fontSize={14} fill="#666" />
      <Text x={50} y={295} text="对 Reconciler 来说，复合组件和基础组件没有区别" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const ReactCompoundComponentCode = `import { useState } from 'react';
import { Leafer, Rect, Text, Group } from 'leafer-react';

function Card({ title, count, color }) {
  return (
    <div fill={color} cornerRadius={12}>
      <Text x={15} y={12} text={title} fontSize={15} fill="#fff" />
      <Text x={15} y={35} text={\`Count: \${count}\`} fontSize={13} fill="rgba(255,255,255,0.85)" />
    </div>
  );
}

function CardList({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <Group key={i} x={i * 190}>
          <Card {...item} />
        </Group>
      ))}
    </div>
  );
}

function App() {
  const [counts, setCounts] = useState([3, 7, 5]);
  const items = [
    { title: 'React', count: counts[0], color: '#667eea' },
    { title: 'Leafer', count: counts[1], color: '#32cd79' },
  ];

  return (
    <Leafer fill="#f5f5f5">
      <Group x={50} y={70}>
        <CardList items={items} />
      </Group>
      <Rect x={50} y={200} width={120} height={40} fill="#667eea" cornerRadius={8}
        onClick={() => setCounts(c => c.map(v => v + 1))} />
    </Leafer>
  );
}`.trim();
