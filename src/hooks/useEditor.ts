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
      if (app.editor) {
        app.editor.select(element);
      }
    },
    clear() {
      if (app.editor) {
        app.editor.clear();
      }
    },
    getSelected() {
      return app.editor?.selected;
    },
    getEditor() {
      return app.editor;
    },
  };
}
