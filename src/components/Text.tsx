import { IText } from '@leafer-ui/interface';
import { defineLeaferElement } from './factory';
// import { BaseShapeProps } from './types';
import { LeaferElementProps } from '../utils/type';

// export interface TextProps extends BaseShapeProps {
//   text?: string;
//   fontSize?: number;
//   fontFamily?: string;
//   fontWeight?: string;
//   textAlign?: 'left' | 'center' | 'right';
//   children?: any;
// }
type TextProps=LeaferElementProps<Text, IText>;
export const TextElement = defineLeaferElement<TextProps>('Text', {
  transform: (props) => ({ ...props, text: props.text ?? props.children }),
});
