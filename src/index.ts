import '@leafer-ui/web'; // 导入web渲染器，确保canvas功能可用
import './core/renderer/leafer-elements';

export * from './components';
export { useLeafer } from './hooks/useLeafer';
export { useEditor } from './hooks/useEditor';
export { useReactComponent } from './hooks/useReactComponent';
export { LeaferContext } from './context/LeaferContext';

export { render as renderToLeafer, unmount as unmountFromLeafer } from './core/reconciler';

export type { IPresetRenderer } from './core/elements/preset-renderers';
export { registerPresetRenderer, clearPresetRenderers, CardRenderer, ButtonRenderer } from './core/elements/preset-renderers';