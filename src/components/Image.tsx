import { Image } from '@leafer-ui/draw';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
import { IImage } from '@leafer-ui/interface';

// export interface ImageProps extends
//   BaseShapeProps,
//   RoundedCornerProps,
//   InteractiveProps,
//   ClickEventProps {
//   url?: string;
//   src?: string;
//   children?: never;
// }
type ImageProps=LeaferElementProps<Image, IImage>;
export const ImageElement = defineLeaferElement<ImageProps>('Image');
