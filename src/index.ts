// Register Leafer element classes (Rect, Text, Group, etc.)
// Side-effect import: must run before any component renders.
// Guarded by `typeof window !== 'undefined'` to avoid SSR issues.
import './core/renderer/leafer-elements';

// 只导出类型和函数，不导入具体实现
export * from './components';
export { useLeafer } from './hooks/useLeafer';
export { useEditor } from './hooks/useEditor';
export { LeaferContext } from './context/LeaferContext';
export { render as renderToLeafer, unmount as unmountFromLeafer } from './core/reconciler';
export { registerComponent, registerElement, getElement } from './core/renderer/element-registry';
export { defineLeaferElement } from './components/factory';
export { h } from './core/renderer/jsx-runtime';
export type { LeaferElementProps, LeaferEventHandler } from './utils/type';
export { adaptComponent } from './components/adaptComponent';
export type { LeaferCanvasProps } from './components/adaptComponent';
export { parseClassName } from './utils/classname-parser';
// export {Rect} from './components/Rect';
// export {Line} from './components/Line';
// export {Path} from './components/Path';
// export {Ellipse} from './components/Ellipse';
// export {Flow} from './components/Flow';
// export {Frame} from './components/Frame';
// export {Group} from './components/Group';
// export {Image} from './components/Image';
// export {Box} from './components/Box';
// export {Text} from './components/Text';
// export {Pen} from './components/Pen';
// export {Polygon} from './components/Polygon';
// export {Star} from './components/Star';


