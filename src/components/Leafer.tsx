import React, { useLayoutEffect, useRef, ReactNode } from 'react';
import { Leafer as LeaferCore } from '@leafer-ui/core';
import '@leafer-ui/web';
import { LeaferContext } from '../context/LeaferContext';
import { render, unmount } from '../core/reconciler';

export interface LeaferProps {
  view?: HTMLElement | string;
  width?: number;
  height?: number;
  fill?: string;
  editor?: boolean | Record<string, any>;
  children?: ReactNode;
  onAppReady?: (app: LeaferCore) => void;
}

export const Leafer: React.FC<LeaferProps> = ({
  view,
  width,
  height,
  fill,
  editor = false,
  children,
  onAppReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<LeaferCore | null>(null);

  // Initialize Leafer app (runs once)
  useLayoutEffect(() => {
    const viewElement =
      typeof view === 'string'
        ? document.getElementById(view)
        : view || containerRef.current;

    if (!viewElement) {
      console.error('[Leafer] view element not found');
      return;
    }

    const rect = viewElement.getBoundingClientRect();
    const actualWidth = width || rect.width;
    const actualHeight = height || rect.height;

    const leafer = new LeaferCore({
      view: viewElement,
      width: actualWidth,
      height: actualHeight,
      fill,
    });

    appRef.current = leafer;
    onAppReady?.(leafer);

    return () => {
      unmount(leafer);
      if ((leafer as any).destroy) {
        (leafer as any).destroy();
      }
      appRef.current = null;
    };
  }, [view, width, height, fill, editor]);

  // Reconcile children into Leafer app
  useLayoutEffect(() => {
    const app = appRef.current;
    if (app) {
      render(children, app);
    }
  }, [children]);

  return (
    <LeaferContext.Provider value={appRef.current as any}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />
    </LeaferContext.Provider>
  );
};
