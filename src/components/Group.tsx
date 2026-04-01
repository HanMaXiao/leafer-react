import { IGroup } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
// import { TransformProps } from './types';
import { Group } from '@leafer-ui/core';

// export interface GroupProps extends TransformProps {
//   x?: number;
//   y?: number;
//   children?: any;
// }

type GroupProps=LeaferElementProps<Group, IGroup>;
export const GroupElement = defineLeaferElement<GroupProps>('Group');
