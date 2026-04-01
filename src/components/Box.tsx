import { Box} from '@leafer-ui/core';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';
import { IBox } from '@leafer-ui/web';

type BoxProps = LeaferElementProps<Box, IBox>;

export const BoxElement = defineLeaferElement<BoxProps>('Box');
