import { h } from '../core/renderer/jsx-runtime';

export interface PolygonProps {
  x?: number;
  y?: number;
  points?: number[][];
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: never;
}

export function Polygon(props: PolygonProps): any {
  return h('Polygon', props);
}
