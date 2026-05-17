import Reconciler from 'react-reconciler';
import type { ReactNode } from 'react';
import { hostConfig } from './host-config';
import type { LeaferRootContainer, LeaferReconciler } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reconciler: LeaferReconciler = Reconciler(hostConfig as any);

// Store roots to support re-render and unmount
const roots = new WeakMap<any, { container: LeaferRootContainer; root: any }>();

/**
 * Render a React element tree into a Leafer App.
 */
export function render(element: ReactNode, app: any): void {
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

  // Sync API: elements are created and added to the tree immediately.
  // The caller must trigger a Leafer re-render afterwards (e.g. forceRender).
  (reconciler as any).updateContainerSync(element, entry.root, null, null);
  (reconciler as any).flushSyncWork();
}

/**
 * Unmount the React tree from a Leafer App.
 */
export function unmount(app: any): void {
  const entry = roots.get(app);
  if (entry) {
    reconciler.updateContainer(null, entry.root, null, null);
    roots.delete(app);
  }
}
