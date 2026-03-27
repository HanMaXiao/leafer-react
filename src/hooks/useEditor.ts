import { useLeafer } from './useLeafer';
import type { App } from '@leafer-ui/core';

export interface EditorControls {
  select: (element: any) => void;
  clear: () => void;
  getSelected: () => any;
  getEditor: () => any;
}

export function useEditor(): EditorControls {
  const app = useLeafer();

  return {
    select(element: any) {
      if ((app as any).editor) {
        (app as any).editor.select(element);
      }
    },
    clear() {
      if ((app as any).editor) {
        (app as any).editor.clear();
      }
    },
    getSelected() {
      return (app as any).editor?.selected;
    },
    getEditor() {
      return (app as any).editor;
    },
  };
}
