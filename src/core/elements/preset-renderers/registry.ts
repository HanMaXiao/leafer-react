// src/core/elements/preset-renderers/registry.ts

import { IPresetRenderer } from './types';

const renderers: IPresetRenderer[] = [];

/**
 * Register a preset renderer. Renderers are checked in registration order;
 * the first matching renderer wins.
 */
export function registerPresetRenderer(renderer: IPresetRenderer): void {
  renderers.push(renderer);
}

/**
 * Find a renderer that can handle the given component.
 * Returns null if no renderer matches.
 */
export function findPresetRenderer(component: any, props: Record<string, any>): IPresetRenderer | null {
  for (const renderer of renderers) {
    if (renderer.canRender(component, props)) {
      return renderer;
    }
  }
  return null;
}

/**
 * Remove all registered preset renderers.
 * Useful for testing.
 */
export function clearPresetRenderers(): void {
  renderers.length = 0;
}
