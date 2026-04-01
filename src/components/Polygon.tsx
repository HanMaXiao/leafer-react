import { Polygon as PolygonClass } from '@leafer-ui/core';
import type { IPolygonInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type PolygonProps = LeaferElementProps<PolygonClass, IPolygonInputData>;

export const Polygon = defineLeaferElement<PolygonProps>('Polygon');
