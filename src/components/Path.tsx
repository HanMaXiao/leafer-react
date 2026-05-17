import { Path as PathClass } from '@leafer-ui/draw';
import type { IPathInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type PathProps = LeaferElementProps<PathClass, IPathInputData>;

export const Path = defineLeaferElement<PathProps>('Path');
