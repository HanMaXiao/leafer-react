import { defineLeaferElement } from './factory';
import { BaseShapeProps, RoundedCornerProps, InteractiveProps, ClickEventProps } from './types';

export interface ImageProps extends
  BaseShapeProps,
  RoundedCornerProps,
  InteractiveProps,
  ClickEventProps {
  url?: string;
  src?: string;
  children?: never;
}

export const Image = defineLeaferElement<ImageProps>('Image');
