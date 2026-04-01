import { Canvas as CanvasClass } from '@leafer-ui/draw';
import type { ICanvasInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type CanvasProps = LeaferElementProps<CanvasClass, ICanvasInputData>;

export const Canvas = defineLeaferElement<CanvasProps>('Canvas');
