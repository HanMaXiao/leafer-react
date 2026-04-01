import { Star as StarClass } from '@leafer-ui/core';
import type { IStarInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type StarProps = LeaferElementProps<StarClass, IStarInputData>;

export const Star = defineLeaferElement<StarProps>('Star');
