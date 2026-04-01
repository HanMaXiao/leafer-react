import { describe, it, expect, beforeEach, vi } from 'vitest';
import { hostConfig } from '../host-config';
import type { LeaferRootContainer, LeaferHostInstance } from '../types';
import { registerElement } from '../../renderer/element-registry';

// Mock Leafer element classes that work without a real canvas
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

  on(event: string, handler: Function) {
    this[`__event_${event}`] = handler;
  }

  off(event: string, handler: Function) {
    delete this[`__event_${event}`];
  }
}

class MockRect extends MockElement { constructor(props: any) { super(props); } }
class MockGroup extends MockElement { constructor(props: any) { super(props); } }
class MockText extends MockElement { constructor(props: any) { super(props); } }

describe('hostConfig', () => {
  let container: LeaferRootContainer;

  beforeEach(() => {
    // Register mock elements
    registerElement('Rect', MockRect as any);
    registerElement('Group', MockGroup as any);
    registerElement('Text', MockText as any);

    // Mock container (simulates a Leafer app)
    const mockApp = new MockGroup({});
    container = { app: mockApp as any, children: [] };
  });

  describe('createInstance', () => {
    it('should create a Rect instance', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, height: 50, fill: 'red' },
        container,
        null,
        null,
      );

      expect(host.type).toBe('Rect');
      expect(host.instance).toBeInstanceOf(MockRect);
      expect(host.instance.width).toBe(100);
      expect(host.instance.fill).toBe('red');
    });

    it('should create a Group instance', () => {
      const host = hostConfig.createInstance(
        'Group',
        { x: 10, y: 20 },
        container,
        null,
        null,
      );
      expect(host.type).toBe('Group');
      expect(host.instance).toBeInstanceOf(MockGroup);
      expect(host.instance.x).toBe(10);
    });

    it('should create a Text instance', () => {
      const host = hostConfig.createInstance(
        'Text',
        { text: 'Hello', fontSize: 20, fill: 'black' },
        container,
        null,
        null,
      );

      expect(host.type).toBe('Text');
      expect(host.instance.text).toBe('Hello');
    });
  });

  describe('tree operations', () => {
    it('should append child to parent via appendInitialChild', () => {
      const parent = hostConfig.createInstance('Group', {}, container, null, null);
      const child = hostConfig.createInstance('Rect', { width: 50, height: 50 }, container, null, null);

      hostConfig.appendInitialChild!(parent, child);

      expect(parent.instance.children.length).toBe(1);
      expect(parent.instance.children[0]).toBe(child.instance);
    });

    it('should append child to container', () => {
      const child = hostConfig.createInstance('Rect', { width: 50, height: 50 }, container, null, null);

      hostConfig.appendChildToContainer!(container, child);

      expect(container.children.length).toBe(1);
      expect(container.app.children.length).toBe(1);
    });

    it('should remove child from parent', () => {
      const parent = hostConfig.createInstance('Group', {}, container, null, null);
      const child = hostConfig.createInstance('Rect', { width: 50, height: 50 }, container, null, null);

      hostConfig.appendInitialChild!(parent, child);
      hostConfig.removeChild!(parent, child);

      expect(parent.instance.children.length).toBe(0);
    });

    it('should remove child from container', () => {
      const child = hostConfig.createInstance('Rect', { width: 50, height: 50 }, container, null, null);

      hostConfig.appendChildToContainer!(container, child);
      hostConfig.removeChildFromContainer!(container, child);

      expect(container.children.length).toBe(0);
      expect(container.app.children.length).toBe(0);
    });

    it('should insert before a sibling', () => {
      const parent = hostConfig.createInstance('Group', {}, container, null, null);
      const child1 = hostConfig.createInstance('Rect', { width: 50, fill: 'a' }, container, null, null);
      const child2 = hostConfig.createInstance('Rect', { width: 50, fill: 'b' }, container, null, null);

      hostConfig.appendInitialChild!(parent, child1);
      hostConfig.insertBefore!(parent, child2, child1);

      expect(parent.instance.children.length).toBe(2);
      // child2 should be before child1
      expect(parent.instance.children[0]).toBe(child2.instance);
      expect(parent.instance.children[1]).toBe(child1.instance);
    });
  });

  describe('commitUpdate', () => {
    it('should update props on existing instance', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, height: 50, fill: 'red' },
        container,
        null,
        null,
      );

      hostConfig.commitUpdate!(
        host,
        'Rect',
        'Rect',
        { width: 100, height: 50, fill: 'red' },
        { width: 200, height: 100, fill: 'blue' },
        null,
      );

      expect(host.instance.width).toBe(200);
      expect(host.instance.fill).toBe('blue');
    });

    it('should remove old props when gone in new props', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, fill: 'red', opacity: 0.5 },
        container,
        null,
        null,
      );

      hostConfig.commitUpdate!(
        host,
        'Rect',
        'Rect',
        { width: 100, fill: 'red', opacity: 0.5 },
        { width: 200, fill: 'blue' },
        null,
      );

      expect(host.instance.opacity).toBeUndefined();
    });

    it('should bind and unbind events', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, onClick: handler1 },
        container,
        null,
        null,
      );

      // Should have bound handler1
      expect(host.instance.__event_tap).toBe(handler1);

      // Update with new handler
      hostConfig.commitUpdate!(
        host,
        'Rect',
        'Rect',
        { width: 100, onClick: handler1 },
        { width: 100, onClick: handler2 },
        null,
      );

      // Old event should be removed, new one bound
      expect(host.instance.__event_tap).toBe(handler2);
    });
  });

  describe('text instances', () => {
    it('should create a text instance', () => {
      const textHost = hostConfig.createTextInstance('hello', container, null, null);
      expect(textHost.type).toBe('#text');
      expect(textHost.instance.__text).toBe('hello');
    });

    it('should update text content', () => {
      const textHost = hostConfig.createTextInstance('hello', container, null, null);
      hostConfig.commitTextUpdate!(textHost, 'hello', 'world');
      expect(textHost.instance.__text).toBe('world');
    });
  });

  describe('prop normalization', () => {
    it('should map backgroundColor to fill', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, backgroundColor: 'red' },
        container,
        null,
        null,
      );

      expect(host.instance.fill).toBe('red');
      expect(host.instance.backgroundColor).toBeUndefined();
    });

    it('should pass through fill as-is', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, fill: 'blue' },
        container,
        null,
        null,
      );

      expect(host.instance.fill).toBe('blue');
    });
  });

  describe('visibility', () => {
    it('should hide and unhide instances', () => {
      const host = hostConfig.createInstance('Rect', { width: 50, height: 50 }, container, null, null);

      hostConfig.hideInstance!(host);
      expect(host.instance.visible).toBe(false);

      hostConfig.unhideInstance!(host);
      expect(host.instance.visible).toBe(true);
    });
  });

  describe('clearContainer', () => {
    it('should remove all children from container', () => {
      const child1 = hostConfig.createInstance('Rect', { width: 50 }, container, null, null);
      const child2 = hostConfig.createInstance('Rect', { width: 50 }, container, null, null);

      hostConfig.appendChildToContainer!(container, child1);
      hostConfig.appendChildToContainer!(container, child2);
      expect(container.children.length).toBe(2);

      hostConfig.clearContainer!(container);
      expect(container.children.length).toBe(0);
      expect(container.app.children.length).toBe(0);
    });
  });
});
