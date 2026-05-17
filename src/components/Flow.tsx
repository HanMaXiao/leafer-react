import { Flow as FlowClass } from '@leafer-in/flow';
import type { IFlowInputData } from '@leafer-ui/interface';
import { LeaferElementProps } from '../utils/type';
import { defineLeaferElement } from './factory';

export type FlowProps = LeaferElementProps<FlowClass, IFlowInputData>;

export const Flow = defineLeaferElement<FlowProps>('Flow');
