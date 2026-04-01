// playground/examples/EventTest.tsx
import React, { useState } from 'react';
import { Leafer, Group, Rect, Text, Ellipse, Star } from '../../src/index';

export const EventTest: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={30} text="事件测试 - 点击图形" fontSize={20} fontWeight="bold" fill="#333" />

      {/* 点击计数器 - Rect */}
      <Group x={50} y={80}>
        <Rect
          width={150}
          height={100}
          fill="#32cd79"
          stroke="#28b367"
          strokeWidth={2}
          cornerRadius={12}
        />
        <Text x={75} y={35} text={`点击次数: ${clickCount}`} fontSize={16} fill="#fff" textAlign="center" />
        <Text x={75} y={60} text="Click me!" fontSize={14} fill="#fff" textAlign="center" />
        {/* 点击区域 - 透明 Rect 用于捕获点击 */}
        <Rect
          width={150}
          height={100}
          fill="transparent"
          hitFill="all"
          onClick={() => setClickCount(c => c + 1)}
        />
      </Group>

      {/* 鼠标悬停变色 - Ellipse */}
      <Group x={230} y={80}>
        <Ellipse
          width={120}
          height={100}
          fill="#0529dd"
          stroke="#ff5252"
          strokeWidth={2}
        />
        <Text x={60} y={55} text="悬停我" fontSize={14} fill="#fff" textAlign="center" />
        <Ellipse
          width={120}
          height={100}
          fill="transparent"
          hitFill="all"
          onMouseEnter={(e: any) => {
            console.log('[EventTest] Ellipse onMouseEnter triggered!', e);
            // 通过父级 Group 的 children 访问可见 Ellipse (index 0)
            const group = e.target.parent;
            if (group && group.children && group.children[0]) {
              group.children[0].fill = '#ff8787';
            }
          }}
          onMouseLeave={(e: any) => {
            console.log('[EventTest] Ellipse onMouseLeave triggered!', e);
            const group = e.target.parent;
            if (group && group.children && group.children[0]) {
              group.children[0].fill = '#ff6b6b';
            }
          }}
        />
      </Group>

      {/* 点击变色 - Star */}
      <Group x={380} y={80}>
        <Star
          width={100}
          height={100}
          fill="#ffd93d"
          stroke="#ffcd02"
          strokeWidth={2}
          points={5}
        />
        <Text x={50} y={55} text="点击变色" fontSize={14} fill="#fff" textAlign="center" />
        <Star
          width={100}
          height={100}
          fill="transparent"
          hitFill="all"
          onClick={(e: any) => {
            console.log('[EventTest] Star onClick triggered!', e);
            const group = e.target.parent;
            if (group && group.children && group.children[0]) {
              const star = group.children[0];
              const newColor = star.fill === '#ffd93d' ? '#ff9f1a' : '#ffd93d';
              star.fill = newColor;
            }
          }}
        />
      </Group>

      {/* 说明文字 */}
      <Text x={50} y={230} text="✅ 点击事件 (onClick) 现在可以正常工作了！" fontSize={16} fill="#32cd79" fontWeight="bold" />
      <Text x={50} y={255} text="支持: onClick, onMouseEnter, onMouseLeave" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const EventTestCode = `import React, { useState } from 'react';
import { Leafer, Rect, Text, Ellipse, Star } from '@leafer-react';

export const EventTest: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [ellipseColor, setEllipseColor] = useState('#ff6b6b');
  const [starColor, setStarColor] = useState('#ffd93d');

  return (
    <Leafer fill="#f5f5f5">
      {/* 点击计数器 */}
      <Group x={50} y={80}>
        <Rect width={150} height={100} fill="#32cd79" cornerRadius={12} />
        <Text x={75} y={55} text={\`点击: \${clickCount}\`} fontSize={16} fill="#fff" textAlign="center" />
        <Rect
          width={150}
          height={100}
          fill="transparent"
          onClick={() => setClickCount(c => c + 1)}
        />
      </Group>

      {/* 鼠标悬停 */}
      <Group x={230} y={80}>
        <Ellipse width={120} height={100} fill={ellipseColor} />
        <Ellipse
          width={120}
          height={100}
          fill="transparent"
          onMouseEnter={() => setEllipseColor('#ff8787')}
          onMouseLeave={() => setEllipseColor('#ff6b6b')}
        />
      </Group>

      {/* 点击变色 */}
      <Group x={380} y={80}>
        <Star width={100} height={100} fill={starColor} points={5} />
        <Star
          width={100}
          height={100}
          fill="transparent"
          onClick={() => setStarColor(starColor === '#ffd93d' ? '#ff9f1a' : '#ffd93d')}
        />
      </Group>
    </Leafer>
  );
};`.trim();
