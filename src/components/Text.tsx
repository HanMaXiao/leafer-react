import { h } from '../core/renderer/jsx-runtime';

export interface TextProps {
  x?: number;
  y?: number;
  text?: string;
  fontSize?: number;
  fill?: string;
  stroke?: string;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  children?: any;
}

export function Text(props: TextProps): any {
  return h('Text', { ...props, text: props.text ?? props.children });
}
