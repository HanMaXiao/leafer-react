import { IRect } from '@leafer-ui/interface';
import { defineLeaferElement } from './factory';
import{Rect} from '@leafer-ui/core';
import { LeaferElementProps } from '../utils/type';
// export interface RectProps extends
//   BaseShapeProps,
//   RoundedCornerProps,
//   FullInteractiveProps,
//   TransformProps,
//   EventProps {
//   children?: never;
// }
type RectProps=LeaferElementProps<Rect, IRect>;
export const RectElement = defineLeaferElement<RectProps>('Rect');
