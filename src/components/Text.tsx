import { defineLeaferElement } from './factory';
import { BaseShapeProps } from './types';

export interface TextProps extends BaseShapeProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  children?: any;
}

export const Text = defineLeaferElement<TextProps>('Text', {
  transform: (props) => ({ ...props, text: props.text ?? props.children }),
});
