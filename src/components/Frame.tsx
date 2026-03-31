import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, OverflowProps, InteractiveProps, ClickEventProps } from './types';

export interface FrameProps extends
  BaseShapeProps,
  RoundedCornerProps,
  OverflowProps,
  InteractiveProps,
  ClickEventProps {
  resizeChildren?: boolean;
  children?: any;
}

export const Frame = defineLeaferElement<FrameProps>('Frame');
