import { describe, it, expect } from 'vitest';
import { elementRegistry, registerElement, getElement } from './element-registry';

describe('element-registry', () => {
  it('should register and retrieve element class', () => {
    class MockRect {
      constructor(public props: any) {}
    }

    registerElement('Rect', MockRect);
    const RectClass = getElement('Rect');

    expect(RectClass).toBe(MockRect);
    const instance = new RectClass({ x: 100 });
    expect(instance.props).toEqual({ x: 100 });
  });

  it('should throw error for unregistered element', () => {
    expect(() => getElement('Unknown')).toThrow('Unknown element type: Unknown');
  });
});
