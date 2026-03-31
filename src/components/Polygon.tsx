import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PolygonProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  points?: number[][];
  children?: never;
}

export function Polygon(props: PolygonProps): any {
  return h('Polygon', props);
}
