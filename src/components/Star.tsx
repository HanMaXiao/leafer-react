import { defineLeaferElement } from './factory';
import { BaseShapeProps, FullInteractiveProps, EventProps } from './types';

export interface StarProps extends
  BaseShapeProps,
  FullInteractiveProps,
  EventProps {
  points?: number;
  innerRadius?: number;
  children?: never;
}

export const Star = defineLeaferElement<StarProps>('Star');
