import { registerPresetRenderer, findPresetRenderer, clearPresetRenderers } from '../registry';
import { IPresetRenderer } from '../types';
import { describe, it, expect,beforeEach } from 'vitest';

describe('PresetRendererRegistry', () => {
  beforeEach(() => {
    clearPresetRenderers();
  });

  it('should find no renderer when registry is empty', () => {
    expect(findPresetRenderer(null, {})).toBeNull();
  });

  it('should register and find a matching renderer', () => {
    const renderer: IPresetRenderer = {
      canRender: (component) => component?.type === 'test',
      render: () => {},
    };
    registerPresetRenderer(renderer);
    expect(findPresetRenderer({ type: 'test' }, {})).toBe(renderer);
  });

  it('should return first matching renderer when multiple match', () => {
    const first: IPresetRenderer = {
      canRender: () => true,
      render: () => {},
    };
    const second: IPresetRenderer = {
      canRender: () => true,
      render: () => {},
    };
    registerPresetRenderer(first);
    registerPresetRenderer(second);
    expect(findPresetRenderer({}, {})).toBe(first);
  });

  it('should return null when no renderer matches', () => {
    const renderer: IPresetRenderer = {
      canRender: () => false,
      render: () => {},
    };
    registerPresetRenderer(renderer);
    expect(findPresetRenderer({}, {})).toBeNull();
  });

  it('should clear all renderers', () => {
    const renderer: IPresetRenderer = {
      canRender: () => true,
      render: () => {},
    };
    registerPresetRenderer(renderer);
    clearPresetRenderers();
    expect(findPresetRenderer({}, {})).toBeNull();
  });
});
