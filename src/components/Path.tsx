import { defineLeaferElement } from './factory';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PathProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  path?: string;
  data?: string;
  children?: never;
}

export const Path = defineLeaferElement<PathProps>('Path');
