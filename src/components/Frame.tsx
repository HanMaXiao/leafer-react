import { Frame as FrameClass } from '@leafer-ui/core';
import type { IFrameInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type FrameProps = LeaferElementProps<FrameClass, IFrameInputData>;

export const Frame = defineLeaferElement<FrameProps>('Frame');
