import { defineLeaferElement } from './factory';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface LineProps extends
  Omit<BaseShapeProps, 'fill'>,
  InteractiveProps,
  ClickEventProps {
  points?: number[][];
  children?: never;
}

export const Line = defineLeaferElement<LineProps>('Line');
