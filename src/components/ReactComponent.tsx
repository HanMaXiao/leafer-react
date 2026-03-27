import { h } from '../core/renderer/jsx-runtime';

export interface ReactComponentProps {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  opacity?: number;
  draggable?: boolean;
  editable?: boolean;
  shouldUpdate?: (oldProps: any, newProps: any) => boolean;
  onClick?: (e: any) => void;
  onInteraction?: (action: string, data: any) => void;
  children?: never;
  [key: string]: any;
}

export function ReactComponent(props: ReactComponentProps): any {
  return h('ReactComponent', props);
}
