import { h } from '../core/renderer/jsx-runtime';

export interface GroupProps {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  opacity?: number;
  visible?: boolean;
  children?: any;
}

export function Group(props: GroupProps): any {
  return h('Group', props);
}
