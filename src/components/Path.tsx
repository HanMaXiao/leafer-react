import { Path } from '@leafer-ui/draw';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
// import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';
import { IPath } from '@leafer-ui/interface';

// export interface PathProps extends
//   BaseShapeProps,
//   InteractiveProps,
//   ClickEventProps {
//   path?: string;
//   data?: string;
//   children?: never;
// }
type PathProps=LeaferElementProps<Path, IPath>;
export const PathElement = defineLeaferElement<PathProps>('Path');
