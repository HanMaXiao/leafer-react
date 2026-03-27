import { h } from '../core/renderer/jsx-runtime';

export interface StarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  points?: number;
  innerRadius?: number;
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: never;
}

export function Star(props: StarProps): any {
  return h('Star', props);
}
