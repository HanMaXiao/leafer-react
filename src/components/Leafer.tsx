import React, { useLayoutEffect, useRef, ReactNode } from 'react';
import { Leafer as LeaferCore } from '@leafer-ui/core';
import '@leafer-ui/web';
import { LeaferContext } from '../context/LeaferContext';

export interface LeaferProps {
  view?: HTMLElement | string;
  width?: number;
  height?: number;
  fill?: string;
  editor?: boolean | Record<string, any>;
  children?: ReactNode;
  onAppReady?: (app: LeaferCore) => void;
}

// 检查是否为 Leafer 实例（通过 __tag 属性）
function isLeaferInstance(obj: any): boolean {
  return obj && typeof obj === 'object' && '__tag' in obj;
}

// 递归处理 React children，将它们转换为 Leafer 实例
function processNode(node: ReactNode, debugPath = 'root'): any {
  if (node == null) return null;

  if (Array.isArray(node)) {
    return node.map((child, i) => processNode(child, `${debugPath}[${i}]`)).filter(Boolean);
  }

  if (React.isValidElement(node)) {
    const props = { ...(node.props as Record<string, any> | undefined) };
    const componentName = (node.type as Function).name || String(node.type);

    // 递归处理 children
    if (props.children) {
      props.children = processNode(props.children, `${debugPath}.children`);
    }

    // 如果是函数组件，执行它
    if (typeof node.type === 'function') {
      try {
        const result = (node.type as Function)(props);
        const tag = result?.__tag || 'unknown';
        console.log(`[processNode] ${debugPath} (${componentName}): created ${tag} instance`);
        return result;
      } catch (e) {
        console.error(`[processNode] ${debugPath} (${componentName}): ERROR`, e);
        return null;
      }
    }
  }

  return node;
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
  const viewElementRef = useRef<HTMLElement | null>(null);

  // 初始化 Leafer
  useLayoutEffect(() => {
    const viewElement =
      typeof view === 'string'
        ? document.getElementById(view)
        : view || containerRef.current;

    if (!viewElement) {
      console.error('[Leafer] view element not found');
      return;
    }

    viewElementRef.current = viewElement;

    // 获取容器的实际尺寸
    const rect = viewElement.getBoundingClientRect();
    console.log('[Leafer] Container rect:', { width: rect.width, height: rect.height });

    const actualWidth = width || rect.width;
    const actualHeight = height || rect.height;

    console.log('[Leafer] Creating Leafer with size:', { width: actualWidth, height: actualHeight });

    const leafer = new LeaferCore({
      view: viewElement,
      width: actualWidth,
      height: actualHeight,
      fill,
    });

    appRef.current = leafer;
    onAppReady?.(leafer);

    // 保存到 window 以便调试
    (window as any).__LEAFER_APP__ = leafer;
    console.log('[Leafer] Leafer created and saved to window.__LEAFER_APP__');

    return () => {
      if ((leafer as any).destroy) {
        (leafer as any).destroy();
      }
    };
  }, [view, width, height, fill, editor]);

  // 渲染子元素到 Leafer
  useLayoutEffect(() => {
    const app = appRef.current;
    if (app && children) {
      // 清空现有元素 - 使用正确的方法
      if (app.children && app.children.length > 0) {
        app.children.forEach((child: any) => app.remove(child));
      }

      console.log('=== [Leafer] Processing children ===');
      const processed = processNode(children);
      console.log('=== [Leafer] Processed result ===', processed);

      // 收集所有顶层 Leafer 实例
      let instances: any[] = [];
      if (Array.isArray(processed)) {
        instances = processed;
      } else if (processed) {
        instances = [processed];
      }

      console.log(`[Leafer] Found ${instances.length} top-level instances`);

      // 添加所有实例到 Leafer
      instances.forEach((instance, index) => {
        if (instance && isLeaferInstance(instance)) {
          const tag = instance.__tag || 'unknown';
          console.log(`[Leafer] [${index}] Adding ${tag}`);
          app.add(instance);
        }
      });

      console.log(`[Leafer] Total children in Leafer: ${app.children?.length || 0}`);
    }
  }, [children]);

  return (
    <LeaferContext.Provider value={appRef.current}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />
    </LeaferContext.Provider>
  );
};
