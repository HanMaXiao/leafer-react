import { ButtonRenderer } from '../ButtonRenderer';
import { describe, it, expect,beforeEach } from 'vitest';

describe('ButtonRenderer', () => {
  let renderer: ButtonRenderer;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    renderer = new ButtonRenderer();
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 40;
    ctx = canvas.getContext('2d')!;
  });

  it('should match component with __leaferRenderer = "button"', () => {
    expect(renderer.canRender({ __leaferRenderer: 'button' }, {})).toBe(true);
  });

  it('should match component with displayName "Button"', () => {
    expect(renderer.canRender({ displayName: 'Button' }, {})).toBe(true);
  });

  it('should not match unrelated components', () => {
    expect(renderer.canRender({ displayName: 'Card' }, {})).toBe(false);
    expect(renderer.canRender({}, {})).toBe(false);
  });

  it('should render without errors', () => {
    expect(() => {
      renderer.render(ctx, { label: 'Click Me' }, 120, 40);
    }).not.toThrow();
  });

  it('should render disabled state', () => {
    expect(() => {
      renderer.render(ctx, { label: 'Disabled', disabled: true }, 120, 40);
    }).not.toThrow();
  });

  it('should render with default props', () => {
    expect(() => {
      renderer.render(ctx, {}, 120, 40);
    }).not.toThrow();
  });
});
