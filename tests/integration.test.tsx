import { describe, it, expect, beforeEach } from 'vitest';
import { registerElement } from '../src/core/renderer/element-registry';
import { h } from '../src/core/renderer/jsx-runtime';
import { Rect, Text, Group } from '@leafer-ui/core';

describe('integration tests', () => {
  beforeEach(() => {
    registerElement('Rect', Rect as any);
    registerElement('Text', Text as any);
    registerElement('Group', Group as any);
  });

  it('should create nested structure', () => {
    const group = h('Group', { x: 100, y: 100 },
      h('Rect', { width: 100, height: 100, fill: 'red' }),
      h('Text', { x: 10, y: 10, text: 'Hello' })
    );

    expect(group).toBeInstanceOf(Group);
    expect(group.x).toBe(100);
    expect(group.children).toHaveLength(2);
  });

  it('should handle props correctly', () => {
    const rect = h('Rect', {
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      fill: 'blue',
      stroke: 'red',
      strokeWidth: 2,
      draggable: true,
    });

    expect(rect).toBeInstanceOf(Rect);
    expect(rect.x).toBe(50);
    expect(rect.fill).toBe('blue');
    expect(rect.draggable).toBe(true);
  });
});
