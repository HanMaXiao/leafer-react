// playground/examples/CustomElement.tsx
// 示例6：自定义 Leafer 元素注册成 React 组件
import React from 'react';
import { Leafer, Text, Group, registerElement, defineLeaferElement, LeaferElementProps } from '../../src/index';
import { UI, registerUI } from '@leafer-ui/core';
import type { IUIInputData } from '@leafer-ui/interface';

// 1. 定义属性接口
interface IDiamondInputData extends IUIInputData {
  stroke?: string;
  strokeWidth?: number;
}

// 2. 定义自定义 Leafer 图形类
class Diamond extends UI {
  public get __tag() { return 'Diamond'; }

  declare public stroke: IDiamondInputData['stroke'];
  declare public strokeWidth: IDiamondInputData['strokeWidth'];

  constructor(data: IDiamondInputData = {}) {
    super(data);
  }

  __draw(canvas: any): void {
    const { context } = canvas;
    const w = (this.width as number) || 60;
    const h = (this.height as number) || 60;
    const sw = (this.strokeWidth as number) || 0;

    context.beginPath();
    context.moveTo(w / 2, sw);
    context.lineTo(w - sw, h / 2);
    context.lineTo(w / 2, h - sw);
    context.lineTo(sw, h / 2);
    context.closePath();

    if (this.fill) {
      context.fillStyle = this.fill as string;
      context.fill();
    }
    if (this.stroke) {
      context.strokeStyle = this.stroke as string;
      context.lineWidth = sw;
      context.stroke();
    }
  }
}

// 3. 注册 UI 元素（函数式方式，避免装饰器）
registerUI()(Diamond);

// 4. 注册元素到 leafer-react
registerElement('Diamond', Diamond);

// 5. 定义 React 组件类型和组件
export type DiamondProps = LeaferElementProps<Diamond, IDiamondInputData>;
export const DiamondElement = defineLeaferElement<DiamondProps>('Diamond');

export const CustomElement: React.FC<{ debug?: boolean }> = ({ debug }) => {
  if (debug) console.log('[CustomElement] rendered');

  return (
    <Leafer fill="#f5f5f5">
      <Text x={50} y={20} text="6. 自定义元素注册" fontSize={20} fontWeight="bold" fill="#333" />

      <Group x={80} y={80}>
        <DiamondElement width={80} height={80} fill="#667eea" stroke="#5a67d8" strokeWidth={2} />
        <Text y={95} text="Diamond" fontSize={14} fill="#333" />
      </Group>

      <Group x={220} y={80}>
        <DiamondElement width={100} height={100} fill="#f5576c" stroke="#e04656" strokeWidth={2} />
        <Text y={115} text="Big" fontSize={14} fill="#333" />
      </Group>

      <Group x={400} y={80}>
        <DiamondElement width={60} height={60} fill="#ffd93d" />
        <DiamondElement x={70} width={40} height={40} fill="#32cd79" />
        <Text y={75} text="Multiple" fontSize={14} fill="#333" />
      </Group>

      <Text x={50} y={240} text="registerElement('Diamond', Diamond);" fontSize={12} fill="#667" fontFamily="monospace" />
      <Text x={50} y={260} text="defineLeaferElement<DiamondProps>('Diamond');" fontSize={12} fill="#667" fontFamily="monospace" />
      <Text x={50} y={285} text="注册后返回的组件可在 JSX 中使用" fontSize={14} fill="#666" />
    </Leafer>
  );
};

export const CustomElementCode = `import { registerElement, defineLeaferElement, LeaferElementProps } from 'leafer-react';
import { UI, registerUI } from '@leafer-ui/core';
import type { IUIInputData } from '@leafer-ui/interface';

// 1. 定义属性接口
interface IDiamondInputData extends IUIInputData {
  stroke?: string;
  strokeWidth?: number;
}

// 2. 定义自定义 Leafer 图形类
class Diamond extends UI {
  public get __tag() { return 'Diamond'; }

  declare public stroke: IDiamondInputData['stroke'];
  declare public strokeWidth: IDiamondInputData['strokeWidth'];

  constructor(data: IDiamondInputData = {}) {
    super(data);
  }

  __draw(canvas) {
    const { context } = canvas;
    const w = this.width || 60;
    const h = this.height || 60;
    const sw = this.strokeWidth || 0;

    context.beginPath();
    context.moveTo(w / 2, sw);
    context.lineTo(w - sw, h / 2);
    context.lineTo(w / 2, h - sw);
    context.lineTo(sw, h / 2);
    context.closePath();

    if (this.fill) {
      context.fillStyle = this.fill;
      context.fill();
    }
    if (this.stroke) {
      context.strokeStyle = this.stroke;
      context.lineWidth = sw;
      context.stroke();
    }
  }
}

// 3. 注册 UI 元素（函数式方式，避免装饰器）
registerUI()(Diamond);

// 4. 注册元素到 leafer-react
registerElement('Diamond', Diamond);

// 5. 定义 React 组件类型和组件
export type DiamondProps = LeaferElementProps<Diamond, IDiamondInputData>;
export const DiamondElement = defineLeaferElement<DiamondProps>('Diamond');

// 6. 在 JSX 中使用
function App() {
  return (
    <Leafer fill="#f5f5f5">
      <DiamondElement width={80} height={80} fill="#667eea" stroke="#5a67d8" strokeWidth={2} />
    </Leafer>
  );
}`.trim();
