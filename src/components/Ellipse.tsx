import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, FullInteractiveProps, EventProps } from './types';

export interface EllipseProps extends
  BaseShapeProps,
  RoundedCornerProps,
  FullInteractiveProps,
  EventProps {
  children?: never;
}

export const Ellipse = defineLeaferElement<EllipseProps>('Ellipse');
