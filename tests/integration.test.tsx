import { describe, it, expect, beforeEach } from 'vitest';
import { h } from '../src/core/renderer/jsx-runtime';
import '@leafer-ui/web';
import '../src/core/renderer/leafer-elements';

describe('integration tests', () => {
  it('should create element descriptors for nested structure', () => {
    const element = h('Group', { x: 100, y: 100 },
      h('Rect', { width: 100, height: 100, fill: 'red' }),
      h('Text', { x: 10, y: 10, text: 'Hello' })
    );

    // h() now returns React element descriptors
    expect(element.type).toBe('Group');
    expect(element.props.x).toBe(100);
    expect(element.props.y).toBe(100);
    expect(element.props.children).toHaveLength(2);
  });

  it('should handle props correctly', () => {
    const element = h('Rect', {
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      fill: 'blue',
      stroke: 'red',
      strokeWidth: 2,
      draggable: true,
    });

    expect(element.type).toBe('Rect');
    expect(element.props.x).toBe(50);
    expect(element.props.fill).toBe('blue');
    expect(element.props.draggable).toBe(true);
  });
});
