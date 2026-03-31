import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, RoundedCornerProps, FullInteractiveProps, EventProps } from './types';

export interface EllipseProps extends
  BaseShapeProps,
  RoundedCornerProps,
  FullInteractiveProps,
  EventProps {
  children?: never;
}

export function Ellipse(props: EllipseProps): any {
  return h('Ellipse', props);
}
