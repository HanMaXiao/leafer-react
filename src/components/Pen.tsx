import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PenProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  path?: string;
  data?: string;
  children?: never;
}

export function Pen(props: PenProps): any {
  return h('Pen', props);
}
