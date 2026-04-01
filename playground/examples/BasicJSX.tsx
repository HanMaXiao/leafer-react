// playground/examples/BasicJSX.tsx
import React, { useState } from 'react';
import { Leafer, Group, Rect, Text, Ellipse, Star, Polygon, Line, Path, Pen, Box } from '../../src/index';

export const BasicJSX: React.FC<{ debug?: boolean }> = ({ debug }) => {
  const [count, setCount] = useState(0);

  if (debug) {
    console.log('[BasicJSX] rendered, count:', count);
  }

  return (
    <Leafer fill="#f5f5f5">
      {/* 标题 */}
      <Text x={50} y={20} text="Leafer React - 所有元素展示" fontSize={20} fontWeight="bold" fill="#333" />

      {/* Row 1: 基础图形 */}
      {/* Rect - 矩形 */}
      <Group x={50} y={60}>
        <Rect width={100} height={80} fill="#32cd79" stroke="#28b367" strokeWidth={2} cornerRadius={8} />
        <Text y={95} text="Rect" fontSize={14} fill="#fff" textAlign="center" x={50} />
      </Group>

      {/* Ellipse - 椭圆 */}
      <Group x={170} y={60}>
        <Ellipse width={100} height={80} fill="#ff6b6b" stroke="#ff5252" strokeWidth={2} />
        <Text y={95} text="Ellipse" fontSize={14} fill="#fff" textAlign="center" x={50} />
      </Group>

      {/* Star - 星形 */}
      <Group x={290} y={60}>
        <Star width={100} height={100} fill="#ffd93d" stroke="#ffcd02" strokeWidth={2} corners={5} />
        <Text y={105} text="Star" fontSize={14} fill="#fff" textAlign="center" x={50} />
      </Group>

      {/* Polygon - 多边形 (三角形) */}
      <Group x={410} y={60}>
        <Polygon width={100} height={100} fill="#6bcf7f" stroke="#4fd1c5" strokeWidth={2} />
        <Text y={105} text="Polygon" fontSize={14} fill="#fff" textAlign="center" x={50} />
      </Group>

      {/* Line - 线条 */}
      <Group x={530} y={60}>
        <Line x={10} y={20} width={80} height={2} stroke="#845ef7" strokeWidth={3} />
        <Line x={10} y={40} width={80} height={2} stroke="#ec4899" strokeWidth={3} />
        <Text y={70} text="Line" fontSize={14} fill="#666" />
      </Group>

      {/* Row 2: Path 和 Pen */}
      {/* Path - 路径 */}
      <Group x={50} y={180}>
        <Path x={0} y={0} width={150} height={80} path={"M10,40 Q40,10 75,40 T140,40" as any} fill="none" stroke="#f59e0b" strokeWidth={3} />
        <Text y={95} text="Path (曲线)" fontSize={14} fill="#666" />
      </Group>

      {/* Pen - 画笔 */}
      <Group x={220} y={180}>
        <Pen x={0} y={0} width={150} height={80} path={"M10,40 L40,10 L70,40 L100,10 L130,40" as any} fill="none" stroke="#8b5cf6" strokeWidth={3} />
        <Text y={95} text="Pen (折线)" fontSize={14} fill="#666" />
      </Group>

      {/* Row 3: Box 容器示例 */}
      <Box x={50} y={300} width={650} height={120} fill="#f8f9fa" stroke="#dee2e6" strokeWidth={1} cornerRadius={12}>
        <Text x={20} y={20} text="Box 容器 (可包含子元素)" fontSize={14} fontWeight="bold" fill="#495057" />
        <Rect x={20} y={35} width={80} height={50} fill="#a78bfa" cornerRadius={8} />
        <Ellipse x={115} y={35} width={80} height={50} fill="#f472b6" />
        <Star x={210} y={35} width={50} height={50} fill="#34d399" corners={6} />
        <Polygon x={275} y={35} width={50} height={50} fill="#fbbf24" />
      </Box>

      {/* 交互说明 */}
      <Text x={50} y={450} text="✅ 所有 Leafer 元素都可通过 JSX 语法使用！" fontSize={16} fill="#32cd79" fontWeight="bold" />
      <Text x={50} y={475} text="支持的元素: Rect, Ellipse, Star, Polygon, Line, Path, Pen, Box, Group" fontSize={14} fill="#666" />
      <Text x={50} y={500} text="更多元素: Image, Canvas, ReactComponent 可查看其他示例" fontSize={14} fill="#999" />
    </Leafer>
  );
};

export const BasicJSXCode = `import React from 'react';
import {
  Leafer,
  Group,
  Rect,
  Ellipse,
  Star,
  Polygon,
  Line,
  Path,
  Pen,
  Box,
  Text
} from '@leafer-react';

export const BasicJSX: React.FC = () => {
  return (
    <Leafer fill="#f5f5f5">
      {/* 矩形 */}
      <Rect x={50} y={60} width={100} height={80} fill="#32cd79" cornerRadius={8} />

      {/* 椭圆 */}
      <Ellipse x={170} y={60} width={100} height={80} fill="#ff6b6b" />

      {/* 星形 */}
      <Star x={290} y={60} width={100} height={100} fill="#ffd93d" points={5} />

      {/* 多边形 */}
      <Polygon x={410} y={60} width={100} height={100} fill="#6bcf7f" />

      {/* 线条 */}
      <Line x={50} y={180} width={200} stroke="#845ef7" strokeWidth={3} />

      {/* 路径 */}
      <Path x={50} y={220} path="M0,40 Q40,10 80,40" stroke="#f59e0b" strokeWidth={3} />

      {/* 画笔 */}
      <Pen x={200} y={220} path="M0,40 L40,10 L80,40" stroke="#8b5cf6" strokeWidth={3} />

      {/* 容器 */}
      <Box x={50} y={300} width={400} height={100} fill="#f8f9fa">
        <Text x={20} y={20} text="Box Content" />
      </Box>
    </Leafer>
  );
};`.trim();
