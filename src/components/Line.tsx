import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface LineProps extends
  Omit<BaseShapeProps, 'fill'>,
  InteractiveProps,
  ClickEventProps {
  points?: number[][];
  children?: never;
}

export function Line(props: LineProps): any {
  return h('Line', props);
}
