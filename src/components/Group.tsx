import { defineLeaferElement } from './factory';
import { TransformProps } from './types';

export interface GroupProps extends TransformProps {
  x?: number;
  y?: number;
  children?: any;
}

export const Group = defineLeaferElement<GroupProps>('Group');
