import React, { useEffect, useRef, ReactNode } from 'react';
import { App } from '@leafer-ui/core';
import '@leafer-ui/web'; // 导入web渲染器，确保canvas功能可用
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
  const appRef = useRef<App | null>(null);

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
      tree: {}, // 总是初始化tree属性，确保app.tree存在
      editor: editor ? (typeof editor === 'object' ? editor as any : {}) : false,
    });

    appRef.current = app;
    onAppReady?.(app);

    // 渲染子元素到 Leafer
    const processedChildren = processChildren(children);
    processedChildren.forEach(child => {
      if (child) {
        app.tree.add(child);
      }
    });

    return () => {
      if ((app as any).destroy) {
        (app as any).destroy();
      }
    };
  }, [view, width, height, fill, editor, children]);

  // 处理子元素，获取实际的 Leafer 元素
  const processChildren = (children: ReactNode): any[] => {
    const processed: any[] = [];
    
    const addElement = (element: any) => {
      if (element) {
        if (Array.isArray(element)) {
          // 处理数组情况
          element.forEach(item => addElement(item));
        } else {
          processed.push(element);
        }
      }
    };
    
    React.Children.forEach(children, child => {
      if (React.isValidElement(child)) {
        // 对于 JSX 元素，获取其 props.children，因为 h 函数的结果被包装在 React 元素中
        if (child.props && 'children' in child.props && (child.props as { children: unknown }).children) {
          addElement(child.props.children);
        }
      }
    });
    return processed;
  };

  // 渲染子元素到 Leafer
  useEffect(() => {
    const app = appRef.current;
    if (app) {
      app.tree.remove();
      const processedChildren = processChildren(children);
      processedChildren.forEach(child => {
        if (child) {
          app.tree.add(child);
        }
      });
    }
  }, [children]);

  return (
    <LeaferContext.Provider value={appRef.current}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      >
        {/* 使用 React.Children.map 来触发 h 函数执行，但不返回实际内容 */}
        {React.Children.map(children, () => null)}
      </div>
    </LeaferContext.Provider>
  );
};
