// playground/examples/index.ts
import type { Example } from './types';
import { BasicJSX, BasicJSXCode } from './BasicJSX';
import { ReactComponentExample, ReactComponentCode } from './ReactComponent';
import { Interactive, InteractiveCode } from './Interactive';
import { Animation, AnimationCode } from './Animation';
import { EventTest, EventTestCode } from './EventTest';

export const EXAMPLES: Example[] = [
  {
    id: 'basic-jsx',
    name: '基础 JSX 语法',
    description: '使用 JSX 创建 Leafer 图形',
    component: BasicJSX,
    code: BasicJSXCode,
  },
  {
    id: 'event-test',
    name: '事件测试',
    description: '测试 onClick, onMouseEnter 等事件',
    component: EventTest,
    code: EventTestCode,
  },
  {
    id: 'react-component',
    name: 'React 组件渲染',
    description: '在 Canvas 上渲染 React UI',
    component: ReactComponentExample,
    code: ReactComponentCode,
  },
  {
    id: 'interactive',
    name: '交互事件',
    description: '演示点击、拖拽等事件',
    component: Interactive,
    code: InteractiveCode,
  },
  {
    id: 'animation',
    name: '动画效果',
    description: '状态驱动的动画',
    component: Animation,
    code: AnimationCode,
  },
];

export * from './types';
export { BasicJSX, BasicJSXCode } from './BasicJSX';
export { EventTest, EventTestCode } from './EventTest';
export { ReactComponentExample, ReactComponentCode } from './ReactComponent';
export { Interactive, InteractiveCode } from './Interactive';
export { Animation, AnimationCode } from './Animation';
