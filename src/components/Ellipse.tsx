import { h } from '../core/renderer/jsx-runtime';

export interface EllipseProps {
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
  children?: never;
}

export function Ellipse(props: EllipseProps): any {
  return h('Ellipse', props);
}
