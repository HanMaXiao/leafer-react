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
class MockFrame extends MockElement { constructor(props: any) { super(props); } }
class MockImage extends MockElement { constructor(props: any) { super(props); } }

describe('hostConfig', () => {
  let container: LeaferRootContainer;

  beforeEach(() => {
    // Register mock elements
    registerElement('Rect', MockRect as any);
    registerElement('Group', MockGroup as any);
    registerElement('Text', MockText as any);
    registerElement('Frame', MockFrame as any);
    registerElement('Image', MockImage as any);

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

  describe('drag event mapping', () => {
    it('should map onDragStart to drag.start', () => {
      const handler = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onDragStart: handler }, container, null, null,
      );
      expect(host.instance['__event_drag.start']).toBe(handler);
    });

    it('should map onDrag to drag', () => {
      const handler = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onDrag: handler }, container, null, null,
      );
      expect(host.instance['__event_drag']).toBe(handler);
    });

    it('should map onDragEnd to drag.end', () => {
      const handler = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onDragEnd: handler }, container, null, null,
      );
      expect(host.instance['__event_drag.end']).toBe(handler);
    });
  });

  describe('transform event mapping', () => {
    it('should map move events', () => {
      const startFn = vi.fn(), moveFn = vi.fn(), endFn = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onMoveStart: startFn, onMove: moveFn, onMoveEnd: endFn },
        container, null, null,
      );
      expect(host.instance['__event_move.start']).toBe(startFn);
      expect(host.instance['__event_move']).toBe(moveFn);
      expect(host.instance['__event_move.end']).toBe(endFn);
    });

    it('should map rotate events', () => {
      const startFn = vi.fn(), rotateFn = vi.fn(), endFn = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onRotateStart: startFn, onRotate: rotateFn, onRotateEnd: endFn },
        container, null, null,
      );
      expect(host.instance['__event_rotate.start']).toBe(startFn);
      expect(host.instance['__event_rotate']).toBe(rotateFn);
      expect(host.instance['__event_rotate.end']).toBe(endFn);
    });

    it('should map zoom events', () => {
      const startFn = vi.fn(), zoomFn = vi.fn(), endFn = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onZoomStart: startFn, onZoom: zoomFn, onZoomEnd: endFn },
        container, null, null,
      );
      expect(host.instance['__event_zoom.start']).toBe(startFn);
      expect(host.instance['__event_zoom']).toBe(zoomFn);
      expect(host.instance['__event_zoom.end']).toBe(endFn);
    });

    it('should map onResize as alias for zoom', () => {
      const handler = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onResize: handler }, container, null, null,
      );
      expect(host.instance['__event_zoom']).toBe(handler);
    });
  });

  describe('keyboard event mapping', () => {
    it('should map onKeyDown to key', () => {
      const handler = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onKeyDown: handler }, container, null, null,
      );
      expect(host.instance['__event_key']).toBe(handler);
    });

    it('should map onKeyUp to key.up', () => {
      const handler = vi.fn();
      const host = hostConfig.createInstance(
        'Rect', { width: 100, onKeyUp: handler }, container, null, null,
      );
      expect(host.instance['__event_key.up']).toBe(handler);
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

    it('should map borderRadius to cornerRadius', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100, borderRadius: 8 },
        container,
        null,
        null,
      );

      expect(host.instance.cornerRadius).toBe(8);
      expect(host.instance.borderRadius).toBeUndefined();
    });

    it('should map borderColor to stroke', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { borderColor: 'black', borderWidth: 2 },
        container,
        null,
        null,
      );
      expect(host.instance.stroke).toBe('black');
      expect(host.instance.borderColor).toBeUndefined();
    });

    it('should map borderWidth to strokeWidth', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { borderWidth: 2 },
        container,
        null,
        null,
      );
      expect(host.instance.strokeWidth).toBe(2);
      expect(host.instance.borderWidth).toBeUndefined();
    });

    it('should map background to fill', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { background: 'blue' },
        container,
        null,
        null,
      );
      expect(host.instance.fill).toBe('blue');
      expect(host.instance.background).toBeUndefined();
    });

    it('should map color to fill', () => {
      const host = hostConfig.createInstance(
        'Text',
        { color: 'red', text: 'hello' },
        container,
        null,
        null,
      );
      expect(host.instance.fill).toBe('red');
      expect(host.instance.color).toBeUndefined();
    });

    it('should prefer native fill over backgroundColor alias', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { fill: 'green', backgroundColor: 'red' },
        container,
        null,
        null,
      );
      expect(host.instance.fill).toBe('green');
    });
  });

  describe('CSS px value conversion', () => {
    it('should convert px string to number for width', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: '100px', height: '50px' },
        container,
        null,
        null,
      );
      expect(host.instance.width).toBe(100);
      expect(host.instance.height).toBe(50);
    });

    it('should keep number values unchanged', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { width: 100 },
        container,
        null,
        null,
      );
      expect(host.instance.width).toBe(100);
    });

    it('should convert px string for cornerRadius via borderRadius', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { borderRadius: '8px' },
        container,
        null,
        null,
      );
      expect(host.instance.cornerRadius).toBe(8);
    });

    it('should convert px string for strokeWidth via borderWidth', () => {
      const host = hostConfig.createInstance(
        'Rect',
        { borderWidth: '2px' },
        container,
        null,
        null,
      );
      expect(host.instance.strokeWidth).toBe(2);
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

  describe('HTML container tag mapping', () => {
    it('should map div to Group (no visual props)', () => {
      const host = hostConfig.createInstance('div', {}, container, null, null);
      expect(host.instance).toBeInstanceOf(MockGroup);
    });

    it('should map div with fill to Frame (visual container)', () => {
      const host = hostConfig.createInstance('div', { fill: 'red' }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockFrame);
    });

    it('should map div with cornerRadius to Frame', () => {
      const host = hostConfig.createInstance('div', { cornerRadius: 8 }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockFrame);
    });

    it('should map div with borderRadius (CSS alias) to Frame', () => {
      const host = hostConfig.createInstance('div', { borderRadius: 8 }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockFrame);
    });

    it('should map section/article/main/header/footer/nav/aside to Group', () => {
      for (const tag of ['section', 'article', 'main', 'header', 'footer', 'nav', 'aside']) {
        const host = hostConfig.createInstance(tag, {}, container, null, null);
        expect(host.instance).toBeInstanceOf(MockGroup);
      }
    });
  });

  describe('HTML text tag mapping', () => {
    it('should map h1 to Text with default fontSize', () => {
      const host = hostConfig.createInstance('h1', { children: 'Title' }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockText);
      expect(host.instance.fontSize).toBe(32);
    });

    it('should map p to Text with default styles', () => {
      const host = hostConfig.createInstance('p', { children: 'Paragraph' }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockText);
      expect(host.instance.fontSize).toBe(14);
    });

    it('should allow overriding default h1 styles', () => {
      const host = hostConfig.createInstance('h1', { children: 'Title', fontSize: 48 }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockText);
      expect(host.instance.fontSize).toBe(48);
    });

    it('should map h1-h6 with correct default sizes', () => {
      const sizes: Record<string, number> = { h1: 32, h2: 28, h3: 24, h4: 20, h5: 16, h6: 14 };
      for (const [tag, size] of Object.entries(sizes)) {
        const host = hostConfig.createInstance(tag, { children: tag }, container, null, null);
        expect(host.instance.fontSize).toBe(size);
      }
    });

    it('should map label and a to Text', () => {
      const label = hostConfig.createInstance('label', { children: 'Name' }, container, null, null);
      expect(label.instance).toBeInstanceOf(MockText);
      const anchor = hostConfig.createInstance('a', { children: 'Link' }, container, null, null);
      expect(anchor.instance).toBeInstanceOf(MockText);
    });

    it('should convert string children to text property', () => {
      const host = hostConfig.createInstance('p', { children: 'Hello World' }, container, null, null);
      expect(host.instance.text).toBe('Hello World');
    });
  });

  describe('HTML image tag mapping', () => {
    it('should map img to Image with src → url', () => {
      const host = hostConfig.createInstance(
        'img', { src: 'https://example.com/photo.png' }, container, null, null,
      );
      expect(host.instance).toBeInstanceOf(MockImage);
      expect(host.instance.url).toBe('https://example.com/photo.png');
      expect(host.instance.src).toBeUndefined();
    });

    it('should pass through other props to Image', () => {
      const host = hostConfig.createInstance(
        'img', { src: 'test.png', width: 100, height: 50 }, container, null, null,
      );
      expect(host.instance.url).toBe('test.png');
      expect(host.instance.width).toBe(100);
      expect(host.instance.height).toBe(50);
    });
  });

  describe('HTML form/list tag mapping', () => {
    it('should map ul/ol/li/button/input/textarea/select to Group', () => {
      for (const tag of ['ul', 'ol', 'li', 'button', 'input', 'textarea', 'select']) {
        const host = hostConfig.createInstance(tag, {}, container, null, null);
        expect(host.instance).toBeInstanceOf(MockGroup);
      }
    });

    it('should map button with fill to Frame', () => {
      const host = hostConfig.createInstance('button', { fill: 'blue' }, container, null, null);
      expect(host.instance).toBeInstanceOf(MockFrame);
    });
  });
});
