import { h } from '../core/renderer/jsx-runtime';

export interface CanvasProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  cornerRadius?: number;
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: never;
}

export function Canvas(props: CanvasProps): any {
  return h('Canvas', props);
}
