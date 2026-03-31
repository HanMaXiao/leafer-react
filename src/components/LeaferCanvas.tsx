import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, RoundedCornerProps, InteractiveProps, ClickEventProps } from './types';

export interface CanvasProps extends
  BaseShapeProps,
  RoundedCornerProps,
  InteractiveProps,
  ClickEventProps {
  children?: never;
}

export function Canvas(props: CanvasProps): any {
  return h('Canvas', props);
}
