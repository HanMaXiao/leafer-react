import { useRef, useCallback, RefObject } from 'react';
import type { ReactComponent } from '../core/elements/ReactComponent';

export interface UseReactComponentReturn {
  componentRef: RefObject<ReactComponent | null>;
  updateProps: (props: Record<string, any>) => void;
  getProps: () => Record<string, any>;
}

export function useReactComponent(): UseReactComponentReturn {
  const componentRef = useRef<ReactComponent | null>(null);

  const updateProps = useCallback((props: Record<string, any>) => {
    const component = componentRef.current;
    if (component && component.__) {
      component.__.props = { ...component.__.props, ...props };
    }
  }, []);

  const getProps = useCallback((): Record<string, any> => {
    const component = componentRef.current;
    return component?.__?.props || {};
  }, []);

  return {
    componentRef,
    updateProps,
    getProps,
  };
}
