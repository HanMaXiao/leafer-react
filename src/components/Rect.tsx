import { h } from '../core/renderer/jsx-runtime';

export interface RectProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: any;
}

export function Rect(props: RectProps): any {
  return h('Rect', props);
}
