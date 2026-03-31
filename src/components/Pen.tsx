import { defineLeaferElement } from './factory';
import { BaseShapeProps, InteractiveProps, ClickEventProps } from './types';

export interface PenProps extends
  BaseShapeProps,
  InteractiveProps,
  ClickEventProps {
  path?: string;
  data?: string;
  children?: never;
}

export const Pen = defineLeaferElement<PenProps>('Pen', {
  transform: (props) => {
    const { path, ...rest } = props;
    // Leafer's Pen has a read-only getter for `path` (computed from drawing commands).
    // SVG path strings should be handled by Path element instead.
    if (path) {
      return { tag: 'Path', props: { ...rest, path } };
    }
    return rest;
  },
});
