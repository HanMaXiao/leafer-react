import { h } from '../core/renderer/jsx-runtime';

export interface ImageProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  src?: string;
  url?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  draggable?: boolean;
  editable?: boolean;
  onClick?: (e: any) => void;
  children?: never;
}

export function Image(props: ImageProps): any {
  return h('Image', props);
}
