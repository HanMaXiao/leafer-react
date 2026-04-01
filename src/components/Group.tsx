import { Group as GroupClass } from '@leafer-ui/core';
import type { IGroupInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type GroupProps = LeaferElementProps<GroupClass, IGroupInputData>;

export const Group = defineLeaferElement<GroupProps>('Group');
