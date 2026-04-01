import { Text as TextClass } from '@leafer-ui/core';
import type { ITextInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type TextProps = LeaferElementProps<TextClass, ITextInputData>;

export const Text = defineLeaferElement<TextProps>('Text', {
  transform: (props) => ({ ...props, text: props.text ?? props.children }),
});
