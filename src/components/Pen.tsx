import { Pen as PenClass } from '@leafer-ui/core';
import type { IPenInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type PenProps = LeaferElementProps<PenClass, IPenInputData>;

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
