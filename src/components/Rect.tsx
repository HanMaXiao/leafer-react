import { Rect as RectClass } from '@leafer-ui/core';
import type { IRectInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type RectProps = LeaferElementProps<RectClass, IRectInputData>;

export const Rect = defineLeaferElement<RectProps>('Rect');
