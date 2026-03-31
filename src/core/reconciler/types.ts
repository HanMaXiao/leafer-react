import type { Reconciler } from 'react-reconciler';

/**
 * A Leafer host instance wrapper.
 * Holds the actual Leafer UI element and its metadata.
 */
export interface LeaferHostInstance {
  /** The actual Leafer element (Rect, Group, Text, etc.) */
  instance: any;
  /** Element type string: 'Rect', 'Text', 'Group', etc. */
  type: string;
  /** Current props (for diffing) */
  props: Record<string, any>;
}

/**
 * The root container passed to the reconciler.
 * Wraps a Leafer App or Leafer instance.
 */
export interface LeaferRootContainer {
  /** The Leafer App / Leafer instance */
  app: any;
  /** All top-level children managed by reconciler */
  children: LeaferHostInstance[];
}

export type LeaferReconciler = Reconciler<
  LeaferRootContainer,
  LeaferHostInstance,
  LeaferHostInstance,
  any,
  any,
  any
>;
