// playground/examples/LeaferApp.tsx
// 示例1：使用 React 构建 Leafer 应用
import React from 'react';
import { Leafer, Rect, Text } from '../../src/index';

export const LeaferApp: React.FC<{ debug?: boolean }> = ({ debug }) => {
  if (debug) console.log('[LeaferApp] rendered');

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={30} text="1. 使用 React 构建 Leafer 应用" fontSize={20} fontWeight="bold" fill="#333" />

      <Rect x={100} y={80} width={200} height={120} fill="#32cd79" cornerRadius={12} />
      <Text x={130} y={120} text="Hello Leafer!" fontSize={24} fill="#fff" fontWeight="bold" />

      <Text x={50} y={240} text="<Leafer> 是根容器，内部使用 Leafer 图形元素" fontSize={14} fill="#666" />
      <Text x={50} y={265} text="支持 fill、width、height、editor 等配置" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const LeaferAppCode = `import { Leafer, Rect, Text } from 'leafer-react';

function App() {
  return (
    <Leafer fill="#f5f5f5">
      <Rect x={100} y={80} width={200} height={120} fill="#32cd79" cornerRadius={12} />
      <Text x={130} y={120} text="Hello Leafer!" fontSize={24} fill="#fff" />
    </Leafer>
  );
}`.trim();
