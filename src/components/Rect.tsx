import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, FullInteractiveProps, EventProps } from './types';

export interface RectProps extends
  BaseShapeProps,
  RoundedCornerProps,
  FullInteractiveProps,
  EventProps {
  children?: never;
}

export const Rect = defineLeaferElement<RectProps>('Rect');
