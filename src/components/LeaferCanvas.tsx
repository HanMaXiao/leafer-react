import { Canvas } from '@leafer-ui/draw';
import { defineLeaferElement } from './factory';
// import { BaseShapeProps, RoundedCornerProps, InteractiveProps, ClickEventProps } from './types';
import { ICanvas } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';

// export interface CanvasProps extends
//   BaseShapeProps,
//   RoundedCornerProps,
//   InteractiveProps,
//   ClickEventProps {
//   children?: never;
// }
type CanvasProps=LeaferElementProps<Canvas, ICanvas>;
export const CanvasElement = defineLeaferElement<CanvasProps>('Canvas');
