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

  it('should create element descriptor with props', () => {
    const element = h('Rect', { x: 100, fill: 'red' });
    // h() now returns a React element descriptor, not a Leafer instance
    expect(element.type).toBe('Rect');
    expect(element.props.x).toBe(100);
    expect(element.props.fill).toBe('red');
    expect(element.$$typeof).toBe(Symbol.for('react.element'));
  });

  it('should handle null props', () => {
    const element = h('Rect', null);
    expect(element.props).toEqual({});
  });

  it('should handle children prop', () => {
    const element = h('Rect', { children: ['child1', 'child2'] });
    expect(element.props.children).toEqual(['child1', 'child2']);
  });

  it('should extract key from props', () => {
    const element = h('Rect', { key: 'my-key', x: 10 });
    expect(element.key).toBe('my-key');
    expect(element.props.key).toBeUndefined();
    expect(element.props.x).toBe(10);
  });

  it('should extract ref from props', () => {
    const ref = { current: null };
    const element = h('Rect', { ref, x: 10 });
    expect(element.ref).toBe(ref);
    expect(element.props.ref).toBeUndefined();
  });

  it('should export Fragment', () => {
    expect(Fragment).toBeDefined();
  });

  it('should return children for Fragment', () => {
    const result = h(Fragment, { children: ['a', 'b'] });
    expect(result).toEqual(['a', 'b']);
  });
});
