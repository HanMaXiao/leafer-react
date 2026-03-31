import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, InteractiveProps, ClickEventProps } from './types';

export interface CanvasProps extends
  BaseShapeProps,
  RoundedCornerProps,
  InteractiveProps,
  ClickEventProps {
  children?: never;
}

export const Canvas = defineLeaferElement<CanvasProps>('Canvas');
