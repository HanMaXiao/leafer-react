import { CardRenderer } from '../CardRenderer';
import { describe, it, expect,beforeEach } from 'vitest';

describe('CardRenderer', () => {
  let renderer: CardRenderer;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    renderer = new CardRenderer();
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 100;
    ctx = canvas.getContext('2d')!;
  });

  it('should match component with __leaferRenderer = "card"', () => {
    expect(renderer.canRender({ __leaferRenderer: 'card' }, {})).toBe(true);
  });

  it('should match component with displayName "Card"', () => {
    expect(renderer.canRender({ displayName: 'Card' }, {})).toBe(true);
  });

  it('should match component with name "Card"', () => {
    expect(renderer.canRender({ name: 'Card' }, {})).toBe(true);
  });

  it('should not match unrelated components', () => {
    expect(renderer.canRender({ displayName: 'Button' }, {})).toBe(false);
    expect(renderer.canRender({}, {})).toBe(false);
    expect(renderer.canRender(null, {})).toBe(false);
  });

  it('should render without errors', () => {
    expect(() => {
      renderer.render(ctx, {
        title: 'Hello',
        subtitle: 'World',
        backgroundColor: '#fff',
        borderRadius: 8,
      }, 200, 100);
    }).not.toThrow();
  });

  it('should render with default props', () => {
    expect(() => {
      renderer.render(ctx, {}, 200, 100);
    }).not.toThrow();
  });
});
