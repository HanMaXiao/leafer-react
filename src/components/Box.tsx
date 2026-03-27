import { h } from '../core/renderer/jsx-runtime';

export interface BoxProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  overflow?: boolean | 'hidden' | 'visible';
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: any;
}

export function Box(props: BoxProps): any {
  return h('Box', props);
}
