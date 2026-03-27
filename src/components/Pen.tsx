import { h } from '../core/renderer/jsx-runtime';

export interface PenProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  path?: string;
  data?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: never;
}

export function Pen(props: PenProps): any {
  return h('Pen', props);
}
