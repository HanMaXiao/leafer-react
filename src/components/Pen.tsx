import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PenProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  path?: string;
  data?: string;
  children?: never;
}

export function Pen(props: PenProps): any {
  const { path, ...rest } = props;
  // Leafer's Pen has a read-only getter for `path` (computed from drawing commands).
  // SVG path strings should be handled by Path element instead.
  if (path) {
    return h('Path', { ...rest, path });
  }
  return h('Pen', rest);
}
