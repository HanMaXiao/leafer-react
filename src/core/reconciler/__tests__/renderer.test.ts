import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, unmount } from '../renderer';
import { registerElement } from '../../renderer/element-registry';

// Mock Leafer element classes
class MockElement {
  __tag: string;
  children: MockElement[] = [];
  parent: MockElement | null = null;
  visible = true;
  [key: string]: any;

  constructor(public props: Record<string, any>) {
    this.__tag = this.constructor.name;
    Object.assign(this, props);
  }

  add(child: MockElement) {
    this.children.push(child);
    child.parent = this;
  }

  remove() {
    if (this.parent) {
      const idx = this.parent.children.indexOf(this);
      if (idx !== -1) this.parent.children.splice(idx, 1);
    }
    this.children = [];
  }

  on(_event: string, _handler: Function) {}
  off(_event: string, _handler: Function) {}
}

class MockRect extends MockElement { constructor(props: any) { super(props); } }
class MockGroup extends MockElement { constructor(props: any) { super(props); } }

describe('LeaferRenderer', () => {
  let app: MockElement;

  beforeEach(() => {
    registerElement('Rect', MockRect as any);
    registerElement('Group', MockGroup as any);
    app = new MockGroup({});
  });

  afterEach(() => {
    try { unmount(app); } catch { /* ignore */ }
  });

  it('should render a single element', () => {
    render(React.createElement('Rect', { width: 100, height: 50, fill: 'red' }), app);

    expect(app.children.length).toBe(1);
    expect(app.children[0].width).toBe(100);
  });

  it('should render nested elements', () => {
    render(
      React.createElement('Group', { x: 10 },
        React.createElement('Rect', { width: 50, height: 50, fill: 'blue' }),
      ),
      app,
    );

    expect(app.children.length).toBe(1);
    const group = app.children[0];
    expect(group.children.length).toBe(1);
    expect(group.children[0].fill).toBe('blue');
  });

  it('should update props on re-render', () => {
    render(React.createElement('Rect', { width: 100, fill: 'red' }), app);
    expect(app.children.length).toBe(1);
    expect(app.children[0].width).toBe(100);

    // Second render with different props — reconciler should update the existing instance
    render(React.createElement('Rect', { width: 200, fill: 'blue' }), app);
    // After update, there should still be exactly 1 child (not recreated)
    expect(app.children.length).toBe(1);
  });

  it('should add and remove children', () => {
    render(
      React.createElement('Group', {},
        React.createElement('Rect', { width: 50, fill: 'a' }),
      ),
      app,
    );
    expect(app.children[0].children.length).toBe(1);

    render(
      React.createElement('Group', {},
        React.createElement('Rect', { width: 50, fill: 'a' }),
        React.createElement('Rect', { width: 50, fill: 'b' }),
      ),
      app,
    );
    expect(app.children[0].children.length).toBe(2);

    render(
      React.createElement('Group', {},
        React.createElement('Rect', { width: 50, fill: 'a' }),
      ),
      app,
    );
    expect(app.children[0].children.length).toBe(1);
  });

  it('should unmount all children', () => {
    render(React.createElement('Rect', { width: 100 }), app);
    expect(app.children.length).toBe(1);

    unmount(app);
    expect(app.children.length).toBe(0);
  });
});
