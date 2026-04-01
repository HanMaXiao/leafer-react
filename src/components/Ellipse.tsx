import { Ellipse as EllipseClass } from '@leafer-ui/draw';
import type { IEllipseInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type EllipseProps = LeaferElementProps<EllipseClass, IEllipseInputData>;

export const Ellipse = defineLeaferElement<EllipseProps>('Ellipse');
