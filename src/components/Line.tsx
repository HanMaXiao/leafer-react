import { h } from '../core/renderer/jsx-runtime';

export interface LineProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  points?: number[][];
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: never;
}

export function Line(props: LineProps): any {
  return h('Line', props);
}
