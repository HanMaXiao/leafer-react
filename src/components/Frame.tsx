import { IFrame } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
// import { BaseShapeProps, RoundedCornerProps, OverflowProps, InteractiveProps, ClickEventProps } from './types';
import { Frame } from '@leafer-ui/core';

// export interface FrameProps extends
//   BaseShapeProps,
//   RoundedCornerProps,
//   OverflowProps,
//   InteractiveProps,
//   ClickEventProps {
//   resizeChildren?: boolean;
//   children?: any;
// }
type FrameProps=LeaferElementProps<Frame, IFrame>;
export const FrameElement = defineLeaferElement<FrameProps>('Frame');
