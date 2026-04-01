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
    console.log('[reconciler] render - CREATING new container');
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
  } else {
    console.log('[reconciler] render - UPDATING existing container');
  }

  (reconciler as any).updateContainerSync(element, entry.root, null, null);
  const flushed = (reconciler as any).flushSyncWork();
  console.log('[reconciler] flushSyncWork returned:', flushed);
  console.log('[reconciler] app children after update:', app.children?.length, app.children?.map((c: any) => c.constructor?.name));
}

/**
 * Unmount the React tree from a Leafer App.
 */
export function unmount(app: any): void {
  const entry = roots.get(app);
  if (entry) {
    (reconciler as any).updateContainerSync(null, entry.root, null, null);
    (reconciler as any).flushSyncWork();
    roots.delete(app);
  }
}
