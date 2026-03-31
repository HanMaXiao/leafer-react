import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, FullInteractiveProps, EventProps } from './types';

export interface StarProps extends
  BaseShapeProps,
  FullInteractiveProps,
  EventProps {
  points?: number;
  innerRadius?: number;
  children?: never;
}

export function Star(props: StarProps): any {
  return h('Star', props);
}
