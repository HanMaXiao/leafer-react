import { h } from '../core/renderer/jsx-runtime';
import { TransformProps } from './types';

export interface GroupProps extends TransformProps {
  x?: number;
  y?: number;
  children?: any;
}

export function Group(props: GroupProps): any {
  return h('Group', props);
}
