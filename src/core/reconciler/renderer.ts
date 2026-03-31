import Reconciler from 'react-reconciler';
import type { ReactNode } from 'react';
import { hostConfig } from './host-config';
import type { LeaferRootContainer, LeaferReconciler } from './types';
import type { App } from '@leafer-ui/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reconciler: LeaferReconciler = Reconciler(hostConfig as any);

// Store roots to support re-render and unmount
const roots = new WeakMap<App, { container: LeaferRootContainer; root: any }>();

/**
 * Render a React element tree into a Leafer App.
 */
export function render(element: ReactNode, app: App): void {
  let entry = roots.get(app);

  if (!entry) {
    const container: LeaferRootContainer = { app, children: [] };
    const root = reconciler.createContainer(
      container,
      0, // concurrentRoot
      null, // hydrationCallbacks
      false, // isStrictMode
      null, // concurrentUpdatesByDefaultOverride
      '', // identifierPrefix
      (error: Error) => console.error('[Leafer Reconciler]', error),
      () => {}, // onCaughtError
      () => {}, // onRecoverableError
      () => {}, // onDefaultTransitionIndicator
    );
    entry = { container, root };
    roots.set(app, entry);
  }

  reconciler.updateContainer(element, entry.root, null, null);
}

/**
 * Unmount the React tree from a Leafer App.
 */
export function unmount(app: App): void {
  const entry = roots.get(app);
  if (entry) {
    reconciler.updateContainer(null, entry.root, null, null);
    roots.delete(app);
  }
}
