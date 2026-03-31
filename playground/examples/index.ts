// playground/examples/index.ts
import type { Example } from './types';
import { LeaferApp, LeaferAppCode } from './LeaferApp';
import { BasicElements, BasicElementsCode } from './BasicElements';
import { CompoundElements, CompoundElementsCode } from './CompoundElements';
import { ReactBasicComponent, ReactBasicComponentCode } from './ReactBasicComponent';
import { ReactCompoundComponent, ReactCompoundComponentCode } from './ReactCompoundComponent';
import { CustomElement, CustomElementCode } from './CustomElement';
import { Interactive, InteractiveCode } from './Interactive';
import { Animation, AnimationCode } from './Animation';
import { EventTest, EventTestCode } from './EventTest';

export const EXAMPLES: Example[] = [
  {
    id: 'leafer-app',
    name: '1. 构建 Leafer 应用',
    description: '使用 React 构建 Leafer 应用',
    component: LeaferApp,
    code: LeaferAppCode,
  },
  {
    id: 'basic-elements',
    name: '2. 基础元素',
    description: '使用 React 绘制 Leafer 基础元素',
    component: BasicElements,
    code: BasicElementsCode,
  },
  {
    id: 'compound-elements',
    name: '3. 复合元素组合',
    description: '使用 React 绘制复合 Leafer 元素',
    component: CompoundElements,
    code: CompoundElementsCode,
  },
  {
    id: 'react-basic',
    name: '4. React 基础组件',
    description: '渲染 React 基础组件（使用 div 容器）',
    component: ReactBasicComponent,
    code: ReactBasicComponentCode,
  },
  {
    id: 'react-compound',
    name: '5. React 复合组件',
    description: '渲染 React 复合组件（组件套组件）',
    component: ReactCompoundComponent,
    code: ReactCompoundComponentCode,
  },
  {
    id: 'custom-element',
    name: '6. 自定义元素',
    description: '自定义 Leafer 元素注册成 React 组件',
    component: CustomElement,
    code: CustomElementCode,
  },
  {
    id: 'interactive',
    name: '交互事件',
    description: '点击、拖拽等交互',
    component: Interactive,
    code: InteractiveCode,
  },
  {
    id: 'animation',
    name: '动画效果',
    description: '状态驱动动画',
    component: Animation,
    code: AnimationCode,
  },
  {
    id: 'event-test',
    name: '事件测试',
    description: '测试各种事件',
    component: EventTest,
    code: EventTestCode,
  },
];

export * from './types';
export { LeaferApp, LeaferAppCode } from './LeaferApp';
export { BasicElements, BasicElementsCode } from './BasicElements';
export { CompoundElements, CompoundElementsCode } from './CompoundElements';
export { ReactBasicComponent, ReactBasicComponentCode } from './ReactBasicComponent';
export { ReactCompoundComponent, ReactCompoundComponentCode } from './ReactCompoundComponent';
export { CustomElement, CustomElementCode } from './CustomElement';
export { Interactive, InteractiveCode } from './Interactive';
export { Animation, AnimationCode } from './Animation';
export { EventTest, EventTestCode } from './EventTest';
