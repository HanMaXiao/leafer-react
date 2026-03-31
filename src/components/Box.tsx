import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, OverflowProps, InteractiveProps, ClickEventProps } from './types';

export interface BoxProps extends
  BaseShapeProps,
  RoundedCornerProps,
  OverflowProps,
  InteractiveProps,
  ClickEventProps {
  children?: any;
}

export const Box = defineLeaferElement<BoxProps>('Box');
