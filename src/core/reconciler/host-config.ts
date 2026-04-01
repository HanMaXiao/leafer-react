import { DefaultEventPriority } from 'react-reconciler/constants';
import { getElement } from '../renderer/element-registry';
import type { LeaferHostInstance, LeaferRootContainer } from './types';
import { Group, Frame } from '@leafer-ui/core';

// HTML container tags that map to Leafer Group/Frame
const HTML_CONTAINER_TAGS = new Set(['div', 'span', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside']);

function isVisualContainer(props: Record<string, any>): boolean {
  return 'fill' in props || 'stroke' in props || 'borderRadius' in props;
}

// Event name mapping: React style → Leafer style
const EVENT_NAME_MAP: Record<string, string> = {
  onClick: 'tap',
  onTap: 'tap',
  onDoubleClick: 'double_tap',
  onMouseDown: 'pointer.down',
  onMouseUp: 'pointer.up',
  onMouseMove: 'pointer.move',
  onMouseEnter: 'pointer.enter',
  onMouseLeave: 'pointer.leave',
  onPointerDown: 'pointer.down',
  onPointerUp: 'pointer.up',
  onPointerMove: 'pointer.move',
  onPointerEnter: 'pointer.enter',
  onPointerLeave: 'pointer.leave',
};

function isEventProp(key: string): boolean {
  return key.startsWith('on') && key.length > 2;
}

function getLeaferEventName(reactEventName: string): string {
  return (
    EVENT_NAME_MAP[reactEventName] ||
    reactEventName.charAt(2).toLowerCase() + reactEventName.slice(3)
  );
}

function isInternalProp(key: string): boolean {
  return key === 'children' || key === 'key' || key === 'ref';
}

/**
 * Apply props to a Leafer instance, handling events separately.
 */
function applyProps(instance: any, props: Record<string, any>): void {
  for (const key of Object.keys(props)) {
    if (isInternalProp(key)) continue;

    if (isEventProp(key) && typeof props[key] === 'function') {
      instance.on(getLeaferEventName(key), props[key]);
    } else {
      instance[key] = props[key];
    }
  }
}

/**
 * Remove event listeners from a Leafer instance.
 */
function removeEvents(instance: any, props: Record<string, any>): void {
  for (const key of Object.keys(props)) {
    if (isEventProp(key) && typeof props[key] === 'function') {
      instance.off(getLeaferEventName(key), props[key]);
    }
  }
}

/**
 * Diff old vs new props and apply changes to a Leafer instance.
 */
function updateProps(
  instance: any,
  oldProps: Record<string, any>,
  newProps: Record<string, any>,
): void {
  // Remove old events
  removeEvents(instance, oldProps);

  // Remove props that are gone
  for (const key of Object.keys(oldProps)) {
    if (isInternalProp(key)) continue;
    if (!(key in newProps)) {
      if (isEventProp(key)) continue; // already removed above
      instance[key] = undefined;
    }
  }

  // Set new props
  applyProps(instance, newProps);
}

export const hostConfig = {
  // --- Modes ---
  supportsMutation: true,
  supportsPersistence: false,
  isPrimaryRenderer: true,
  supportsHydration: false,

  // --- Core Methods ---
  getRootHostContext(): Record<string, unknown> {
    return {};
  },

  getChildHostContext(parentHostContext: any): any {
    return parentHostContext;
  },

  createInstance(
    type: string,
    props: Record<string, any>,
    _rootContainer: LeaferRootContainer,
    _hostContext: any,
    _internalHandle: any,
  ): LeaferHostInstance {
    const { children, ...restProps } = props;

    // HTML container tags → Group (no visual) or Box (has fill/stroke/borderRadius)
    if (HTML_CONTAINER_TAGS.has(type)) {
      const ElementClass = isVisualContainer(restProps) ? Frame : Group;
      const instance = new ElementClass(restProps);
      applyProps(instance, restProps);
      return { instance, type, props: restProps };
    }

    // Leafer native elements from registry
    const ElementClass = getElement(type);
    const instance = new ElementClass(restProps);
    applyProps(instance, restProps);

    return { instance, type, props: restProps };
  },

  createTextInstance(
    text: string,
    _rootContainer: LeaferRootContainer,
    _hostContext: any,
    _internalHandle: any,
  ): LeaferHostInstance {
    return { instance: { __text: text }, type: '#text', props: {} };
  },

  appendInitialChild(
    parentHost: LeaferHostInstance,
    childHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    parentHost.instance.add(childHost.instance);
  },

  finalizeInitialChildren(): boolean {
    return false;
  },

  shouldSetTextContent(): boolean {
    return false;
  },

  getPublicInstance(hostInstance: LeaferHostInstance): any {
    return hostInstance.instance;
  },

  prepareForCommit(): null {
    return null;
  },

  resetAfterCommit(): void {
    // No-op
  },

  preparePortalMount(): void {
    // No-op
  },

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,

  getCurrentEventPriority() {
    return DefaultEventPriority;
  },

  // --- Instance lookup (required by types) ---
  getInstanceFromNode(): null {
    return null;
  },

  beforeActiveInstanceBlur(): void {
    // No-op
  },

  afterActiveInstanceBlur(): void {
    // No-op
  },

  prepareScopeUpdate(): void {
    // No-op
  },

  getInstanceFromScope(): null {
    return null;
  },

  detachDeletedInstance(): void {
    // No-op
  },

  // --- Transition / scheduling stubs ---
  NotPendingTransition: null,
  HostTransitionContext: { $$typeof: Symbol.for('react.context'), _currentValue: null, _currentValue2: null, _threadCount: 0, Provider: null as any, Consumer: null as any },

  setCurrentUpdatePriority(): void {
    // No-op
  },

  getCurrentUpdatePriority(): number {
    return DefaultEventPriority;
  },

  resolveUpdatePriority(): number {
    return DefaultEventPriority;
  },

  resetFormInstance(): void {
    // No-op
  },

  requestPostPaintCallback(): void {
    // No-op
  },

  shouldAttemptEagerTransition(): boolean {
    return false;
  },

  trackSchedulerEvent(): void {
    // No-op
  },

  resolveEventType(): null {
    return null;
  },

  resolveEventTimeStamp(): number {
    return 0;
  },

  // --- Suspense / commit stubs ---
  maySuspendCommit(): boolean {
    return false;
  },

  preloadInstance(): boolean {
    return true;
  },

  startSuspendingCommit(): void {
    // No-op
  },

  suspendInstance(): void {
    // No-op
  },

  waitForCommitToBeReady(): null {
    return null;
  },

  // --- Mutation mode methods ---
  appendChild(
    parentHost: LeaferHostInstance,
    childHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    parentHost.instance.add(childHost.instance);
  },

  appendChildToContainer(
    container: LeaferRootContainer,
    childHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    console.log('[reconciler] appendChildToContainer', childHost.type);
    container.app.add(childHost.instance);
    container.children.push(childHost);
  },

  insertBefore(
    parentHost: LeaferHostInstance,
    childHost: LeaferHostInstance,
    beforeHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    parentHost.instance.add(childHost.instance);
    const parent = parentHost.instance;
    const children = parent.children as any[];
    const childIndex = children.indexOf(childHost.instance);
    const beforeIndex = children.indexOf(beforeHost.instance);
    if (childIndex !== -1 && beforeIndex !== -1 && childIndex > beforeIndex) {
      children.splice(childIndex, 1);
      children.splice(beforeIndex, 0, childHost.instance);
    }
  },

  insertInContainerBefore(
    container: LeaferRootContainer,
    childHost: LeaferHostInstance,
    beforeHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    container.app.add(childHost.instance);
    const children = container.app.children as any[];
    const childIndex = children.indexOf(childHost.instance);
    const beforeIndex = children.indexOf(beforeHost.instance);
    if (childIndex !== -1 && beforeIndex !== -1 && childIndex > beforeIndex) {
      children.splice(childIndex, 1);
      children.splice(beforeIndex, 0, childHost.instance);
    }
    container.children.splice(
      container.children.indexOf(beforeHost),
      0,
      childHost,
    );
  },

  removeChild(
    parentHost: LeaferHostInstance,
    childHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    removeEvents(childHost.instance, childHost.props);
    childHost.instance.remove();
  },

  removeChildFromContainer(
    container: LeaferRootContainer,
    childHost: LeaferHostInstance,
  ): void {
    if (childHost.type === '#text') return;
    console.log('[reconciler] removeChildFromContainer', childHost.type);
    removeEvents(childHost.instance, childHost.props);
    childHost.instance.remove();
    const idx = container.children.indexOf(childHost);
    if (idx !== -1) container.children.splice(idx, 1);
  },

  commitUpdate(
    hostInstance: LeaferHostInstance,
    _updatePayload: any,
    type: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ): void {
    console.log('[reconciler] commitUpdate', type, {
      oldKeys: Object.keys(oldProps),
      newKeys: Object.keys(newProps),
      leaferParent: hostInstance.instance?.parent?.constructor?.name,
      leaferChildrenCount: hostInstance.instance?.children?.length,
    });
    updateProps(hostInstance.instance, oldProps, newProps);
    console.log('[reconciler] after update:', {
      parent: hostInstance.instance?.parent?.constructor?.name,
      childrenCount: hostInstance.instance?.children?.length,
    });
    hostInstance.props = newProps;
  },

  commitTextUpdate(
    textInstance: LeaferHostInstance,
    _oldText: string,
    newText: string,
  ): void {
    textInstance.instance.__text = newText;
  },

  commitMount(): void {
    // No-op
  },

  resetTextContent(): void {
    // No-op
  },

  clearContainer(container: LeaferRootContainer): void {
    console.log('[reconciler] clearContainer', container.children.length, 'children');
    for (const child of [...container.children]) {
      if (child.type === '#text') continue;
      removeEvents(child.instance, child.props);
      child.instance.remove();
    }
    container.children.length = 0;
  },

  hideInstance(hostInstance: LeaferHostInstance): void {
    hostInstance.instance.visible = false;
  },

  unhideInstance(hostInstance: LeaferHostInstance): void {
    hostInstance.instance.visible = true;
  },

  hideTextInstance(): void {
    // No-op
  },

  unhideTextInstance(): void {
    // No-op
  },

  prepareUpdate(
    _instance: LeaferHostInstance,
    _type: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ): any {
    return oldProps !== newProps ? true : null;
  },
} as any;
