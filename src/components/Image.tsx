import { Image as ImageClass } from '@leafer-ui/draw';
import type { IImageInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type ImageProps = LeaferElementProps<ImageClass, IImageInputData>;

export const Image = defineLeaferElement<ImageProps>('Image');
