import { Ellipse } from '@leafer-ui/draw';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
import { IEllipse } from '@leafer-ui/interface';


type EllipseProps=LeaferElementProps<Ellipse, IEllipse>;

export const EllipseElement = defineLeaferElement<EllipseProps>('Ellipse');
