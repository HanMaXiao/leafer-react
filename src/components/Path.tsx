import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PathProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  path?: string;
  data?: string;
  children?: never;
}

export function Path(props: PathProps): any {
  return h('Path', props);
}
