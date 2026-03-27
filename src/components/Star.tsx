import { h } from '../core/renderer/jsx-runtime';

export interface StarProps {
  // 基本属性接口
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  points?: number;
  innerRadius?: number;
  // 交互属性接口
  draggable?: boolean;
  editable?: boolean;
  hittable?: boolean;
  hitFill?: 'path' | 'pixel' | 'all' | 'none';
  hitChildren?: boolean;
  hitSelf?: boolean;
  hitStroke?: 'path' | 'pixel' | 'all' | 'none';
  // 事件处理器接口
  onClick?: (e: any) => void;
  onDoubleClick?: (e: any) => void;
  onMouseDown?: (e: any) => void;
  onMouseUp?: (e: any) => void;
  onMouseMove?: (e: any) => void;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
  onPointerDown?: (e: any) => void;
  onPointerUp?: (e: any) => void;
  onPointerMove?: (e: any) => void;
  onPointerEnter?: (e: any) => void;
  onPointerLeave?: (e: any) => void;
  children?: never;
}

export function Star(props: StarProps): any {
  return h('Star', props);
}
