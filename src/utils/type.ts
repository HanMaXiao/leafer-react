import React from 'react';
import type { IUIInputData } from '@leafer-ui/interface';

// 定义一个通用类型：把 Leafer 的类类型转换成 React 组件 Props
// T - Leafer 元素类（如 Rect）
// K - Leafer 元素的输入数据接口（默认为 IUIInputData，可传 IRectInputData 等精确类型）
// Omit 'children' because Leafer uses IUI[] while React uses ReactNode

export type LeaferEventHandler = (e: any) => void;

export type LeaferElementProps<T, K extends IUIInputData = IUIInputData> = Partial<Omit<K, 'children'>> & {
  children?: React.ReactNode;
  ref?: React.Ref<T>;
  // Event handlers (mapped by reconciler to Leafer events)
  onClick?: LeaferEventHandler;
  onTap?: LeaferEventHandler;
  onDoubleClick?: LeaferEventHandler;
  onPointerDown?: LeaferEventHandler;
  onPointerUp?: LeaferEventHandler;
  onPointerMove?: LeaferEventHandler;
  onPointerEnter?: LeaferEventHandler;
  onPointerLeave?: LeaferEventHandler;
  // Lifecycle callback
  onCreated?: (instance: T) => void;
};
