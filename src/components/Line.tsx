import { ILine } from '@leafer-ui/interface';
import { defineLeaferElement } from './factory';
import { Line } from '@leafer-ui/core';
import { LeaferElementProps } from '../utils/type';

// export interface LineProps extends
//   Omit<BaseShapeProps, 'fill'>,
//   InteractiveProps,
//   ClickEventProps {
//   points?: number[][];
//   children?: never;
// }
type LineProps=LeaferElementProps<Line, ILine>;
export const LineElement = defineLeaferElement<LineProps>('Line');
