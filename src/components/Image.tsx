import { h } from '../core/renderer/jsx-runtime';
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

export function Image(props: ImageProps): any {
  return h('Image', props);
}
