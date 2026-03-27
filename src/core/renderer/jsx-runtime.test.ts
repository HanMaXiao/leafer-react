import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h, Fragment } from './jsx-runtime';
import { registerElement } from './element-registry';

describe('jsx-runtime', () => {
  let MockRect: any;

  beforeEach(() => {
    MockRect = class MockRect {
      constructor(public props: any) {}
    };
    registerElement('Rect', MockRect as any);
  });

  it('should create element with props', () => {
    const element = h('Rect', { x: 100, fill: 'red' });
    expect(element).toBeInstanceOf(MockRect);
    expect(element.props).toEqual({ x: 100, fill: 'red' });
  });

  it('should handle null props', () => {
    const element = h('Rect', null);
    expect(element.props).toEqual({});
  });

  it('should handle children prop', () => {
    const element = h('Rect', { children: ['child1', 'child2'] });
    expect(element.props.children).toEqual(['child1', 'child2']);
  });

  it('should export Fragment', () => {
    expect(Fragment).toBeDefined();
  });
});
