import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, FullInteractiveProps, EventProps, TransformProps } from './types';

export interface RectProps extends
  BaseShapeProps,
  RoundedCornerProps,
  FullInteractiveProps,
  TransformProps,
  EventProps {
  children?: never;
}

export const Rect = defineLeaferElement<RectProps>('Rect');
