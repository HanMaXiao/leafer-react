import React, { useEffect, useRef, ReactNode } from 'react';
import { App } from '@leafer-ui/core';
import { LeaferContext } from '../context/LeaferContext';

export interface LeaferProps {
  view?: HTMLElement | string;
  width?: number;
  height?: number;
  fill?: string;
  editor?: boolean | Record<string, any>;
  children?: ReactNode;
  onAppReady?: (app: App) => void;
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
  const appRef = useRef<App>();
  const contentRef = useRef<any>();

  useEffect(() => {
    const viewElement =
      typeof view === 'string'
        ? document.getElementById(view)
        : view || containerRef.current;

    if (!viewElement) {
      console.error('[Leafer] view element not found');
      return;
    }

    const app = new App({
      view: viewElement,
      width,
      height,
      fill,
      editor: editor ? (typeof editor === 'object' ? editor : {}) : false,
    });

    appRef.current = app;
    onAppReady?.(app);

    // 渲染子元素到 Leafer
    if (contentRef.current) {
      if (Array.isArray(contentRef.current)) {
        contentRef.current.forEach(child => child && app.tree.add(child));
      } else if (contentRef.current) {
        app.tree.add(contentRef.current);
      }
    }

    return () => {
      app.destroy?.();
    };
  }, [view, width, height, fill, editor]);

  // 更新子元素
  useEffect(() => {
    const app = appRef.current;
    if (app && contentRef.current) {
      app.tree.remove();
      if (Array.isArray(contentRef.current)) {
        contentRef.current.forEach(child => child && app.tree.add(child));
      } else if (contentRef.current) {
        app.tree.add(contentRef.current);
      }
    }
  }, [children]);

  return (
    <LeaferContext.Provider value={appRef.current}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // 保存子元素引用
            contentRef.current = child as any;
            return null;
          }
          return child;
        })}
      </div>
    </LeaferContext.Provider>
  );
};
