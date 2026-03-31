import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, RoundedCornerProps, FullInteractiveProps, EventProps } from './types';

export interface RectProps extends
  BaseShapeProps,
  RoundedCornerProps,
  FullInteractiveProps,
  EventProps {
  children?: any;
}

export function Rect(props: RectProps): any {
  return h('Rect', props);
}
