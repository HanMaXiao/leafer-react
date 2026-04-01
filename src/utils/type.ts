// utils/types.ts

// 定义一个通用类型：把 Leafer 的类类型转换成 React 组件 Props
// T 是 Leafer 的类（如 Rect），K 是它的配置接口（如 IRect）
export type LeaferElementProps<T, K> = Partial<K> & {
  children?: React.ReactNode;
  ref?: React.Ref<T>; // 如果需要支持 ref
};
