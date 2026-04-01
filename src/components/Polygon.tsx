import { Polygon } from '@leafer-ui/core';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
// import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';
import { IPolygon } from '@leafer-ui/interface';

// export interface PolygonProps extends
//   BaseShapeProps,
//   InteractiveProps,
//   ClickEventProps {
//   points?: number[][];
//   children?: never;
// }
type PolygonProps=LeaferElementProps<Polygon, IPolygon>;
export const PolygonElement = defineLeaferElement<PolygonProps>('Polygon');
