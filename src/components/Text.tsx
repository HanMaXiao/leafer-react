import { h } from '../core/renderer/jsx-runtime';
import { BaseShapeProps } from './types';

export interface TextProps extends BaseShapeProps {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  children?: any;
}

export function Text(props: TextProps): any {
  return h('Text', { ...props, text: props.text ?? props.children });
}
