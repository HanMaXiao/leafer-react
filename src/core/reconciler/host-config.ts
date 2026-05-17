import { DefaultEventPriority } from 'react-reconciler/constants';
import { getElement } from '../renderer/element-registry';
import type { LeaferHostInstance, LeaferRootContainer } from './types';
import {
  HTML_CONTAINER_TAGS,
  HTML_TEXT_TAG_DEFAULTS,
  HTML_IMAGE_TAGS,
  PROP_ALIAS_MAP,
  EVENT_NAME_MAP,
  PX_VALUE_PROPS,
  stripPx,
} from './maps';
import { parseClassName } from '../../utils/classname-parser';

function normalizeProps(props: Record<string, any>): Record<string, any> {
  const { className, ...rest } = props;

  // Parse className first (lowest priority)
  let result: Record<string, any> = className ? parseClassName(className) : {};
  // First pass: set native props (not aliases), overriding className values
  for (const key of Object.keys(rest)) {
    if (!(key in PROP_ALIAS_MAP)) {
      result[key] = rest[key];
    }
  }
  // Second pass: set alias props only if target key not already set by native prop
  for (const key of Object.keys(rest)) {
    if (key in PROP_ALIAS_MAP) {
      const target = PROP_ALIAS_MAP[key];
      if (!(target in result)) {
        result[target] = rest[key];
      }
    }
  }
  // Third pass: convert CSS px string values to numbers
  for (const key of Object.keys(result)) {
    if (PX_VALUE_PROPS.has(key)) {
      result[key] = stripPx(result[key]);
    }
  }
  return result;
}

function isVisualContainer(props: Record<string, any>): boolean {
  return 'fill' in props || 'stroke' in props || 'cornerRadius' in props;
}

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
      // For mouse enter/leave events, use capture phase for better reliability
      const eventName = getLeaferEventName(key);
      if (eventName === 'pointer.enter' || eventName === 'pointer.leave') {
        instance.on(eventName, props[key], true); // Use capture phase
      } else {
        instance.on(eventName, props[key]);
      }
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
      const eventName = getLeaferEventName(key);
      if (eventName === 'pointer.enter' || eventName === 'pointer.leave') {
        instance.off(eventName, props[key], true); // Use capture phase
      } else {
        instance.off(eventName, props[key]);
      }
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
    const normalizedProps = normalizeProps(restProps);

    // HTML text tags → Text element with default styles
    if (type in HTML_TEXT_TAG_DEFAULTS) {
      const defaults = HTML_TEXT_TAG_DEFAULTS[type];
      const textFromChildren = typeof props.children === 'string' ? props.children : undefined;
      const merged = { ...defaults, ...normalizedProps };
      if (textFromChildren && !merged.text) {
        merged.text = textFromChildren;
      }
      const ElementClass = getElement('Text');
      const instance = new ElementClass(merged);
      applyProps(instance, merged);
      return { instance, type, props: merged };
    }

    // HTML image tags → Image element (src → url)
    if (HTML_IMAGE_TAGS.has(type)) {
      const { src, ...imageRest } = normalizedProps;
      const imageProps = src ? { ...imageRest, url: src } : imageRest;
      const ElementClass = getElement('Image');
      const instance = new ElementClass(imageProps);
      applyProps(instance, imageProps);
      return { instance, type, props: imageProps };
    }

    // HTML container tags → Group (no visual) or Frame (has fill/stroke/cornerRadius)
    if (HTML_CONTAINER_TAGS.has(type)) {
      const elementTag = isVisualContainer(normalizedProps) ? 'Frame' : 'Group';
      const ElementClass = getElement(elementTag);
      const instance = new ElementClass(normalizedProps);
      applyProps(instance, normalizedProps);
      return { instance, type, props: normalizedProps };
    }

    // Leafer native elements from registry
    const ElementClass = getElement(type);
    const instance = new ElementClass(normalizedProps);
    applyProps(instance, normalizedProps);

    return { instance, type, props: normalizedProps };
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

  resetAfterCommit(containerInfo: LeaferRootContainer): void {
    const app = containerInfo?.app;
    if (app?.tree) {
      app.tree.forceRender();
    }
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
    const target = container.app.tree || container.app;
    target.add(childHost.instance);
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
    const target = container.app.tree || container.app;
    target.add(childHost.instance);
    const children = target.children as any[];
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
    removeEvents(childHost.instance, childHost.props);
    childHost.instance.remove();
    const idx = container.children.indexOf(childHost);
    if (idx !== -1) container.children.splice(idx, 1);
  },

  commitUpdate(
    hostInstance: LeaferHostInstance,
    _type: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ): void {
    const normalizedOld = normalizeProps(oldProps);
    const normalizedNew = normalizeProps(newProps);
    updateProps(hostInstance.instance, normalizedOld, normalizedNew);
    hostInstance.props = normalizedNew;
    if (typeof hostInstance.instance.forceUpdate === 'function') {
      hostInstance.instance.forceUpdate();
    }
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
