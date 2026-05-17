import React, { useLayoutEffect, useRef, ReactNode } from 'react';
import { LeaferContext } from '../context/LeaferContext';
import { render, unmount } from '../core/reconciler';
import { App } from 'leafer-ui';
import '@leafer-ui/web';
import '@leafer-in/viewport';
import '@leafer-in/view';


// 定义 LeaferProps 接口
export interface LeaferProps {
  children?: ReactNode;
  onAppReady?: (app: any) => void;
  [key: string]: any;
}

export const Leafer: React.FC<LeaferProps> = ({
  children,
  onAppReady,
  ...config
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const onAppReadyRef = useRef(onAppReady);
  const isInitializedRef = useRef(false);

  onAppReadyRef.current = onAppReady;

  useLayoutEffect(() => {
    if (isInitializedRef.current) return;
    
    // // 只在客户端环境中运行
    // if (typeof window === 'undefined' || !App) return;

    let viewElement: HTMLElement | null = null;
    if (typeof config.view === 'string') {
      viewElement = document.getElementById(config.view);
      if (!viewElement) {
        console.warn(`[Leafer] Element with id "${config.view}" not found`);
        viewElement = containerRef.current;
      }
    } else if (config.view instanceof HTMLElement) {
      viewElement = config.view;
    } else {
      viewElement = containerRef.current;
    }

    if (!viewElement) {
      console.error('[Leafer] View element not found');
      return;
    }

    // Filter out undefined props so Leafer's own defaults are preserved
    // (DataHelper.assign overwrites defaults with undefined values)
    const filteredConfig: Record<string, any> = { view: viewElement || null };
    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined) {
        filteredConfig[key] = key === 'editor' && value == null ? {} : value;
      }
    }

    const app = new App(filteredConfig);

    appRef.current = app;
    isInitializedRef.current = true;

    if (app.tree && children) {
      render(children, app);
    }

    onAppReadyRef.current?.(app);

    return () => {
      unmount(app);
      app.destroy(true);
      appRef.current = null;
      isInitializedRef.current = false;
    };
  }, []);

  useLayoutEffect(() => {
    const app = appRef.current;
    if (app?.tree && isInitializedRef.current) {
      render(children, app);
      // App's tree layer render loop may have stopped after the initial render.
      // Force a synchronous re-render to pick up newly added children.
      app.tree.forceRender(undefined, true);
    }
  }, [children]);

  return (
    <LeaferContext.Provider value={appRef.current as any}>
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </LeaferContext.Provider>
  );
};
