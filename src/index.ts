import '@leafer-ui/web'; // 导入web渲染器，确保canvas功能可用
import './core/renderer/leafer-elements';

export * from './components';
export { useLeafer } from './hooks/useLeafer';
export { useEditor } from './hooks/useEditor';
export { LeaferContext } from './context/LeaferContext';

export { render as renderToLeafer, unmount as unmountFromLeafer } from './core/reconciler';
export { registerComponent } from './core/renderer/element-registry';