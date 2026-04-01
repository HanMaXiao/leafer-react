import { IStar } from '@leafer-ui/interface';
import { defineLeaferElement } from './factory';
import { Star } from '@leafer-ui/core';
import { LeaferElementProps } from '../utils/type';

// export interface StarProps extends
//   BaseShapeProps,
//   FullInteractiveProps,
//   EventProps {
//   points?: number;
//   innerRadius?: number;
//   children?: never;
// }
type StarProps=LeaferElementProps<Star, IStar>;
export const StarElement = defineLeaferElement<StarProps>('Star');
