import { Line as LineClass } from '@leafer-ui/core';
import type { ILineInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type LineProps = LeaferElementProps<LineClass, ILineInputData>;

export const Line = defineLeaferElement<LineProps>('Line');
