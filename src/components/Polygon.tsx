import { defineLeaferElement } from './factory';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PolygonProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  points?: number[][];
  children?: never;
}

export const Polygon = defineLeaferElement<PolygonProps>('Polygon');
