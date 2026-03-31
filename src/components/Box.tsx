import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, RoundedCornerProps, OverflowProps, InteractiveProps, ClickEventProps } from './types';

export interface BoxProps extends
  BaseShapeProps,
  RoundedCornerProps,
  OverflowProps,
  InteractiveProps,
  ClickEventProps {
  children?: any;
}

export function Box(props: BoxProps): any {
  return h('Box', props);
}
