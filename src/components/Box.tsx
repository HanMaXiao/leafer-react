import { Box as BoxClass } from '@leafer-ui/core';
import type { IBoxInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type BoxProps = LeaferElementProps<BoxClass, IBoxInputData>;

export const Box = defineLeaferElement<BoxProps>('Box');
