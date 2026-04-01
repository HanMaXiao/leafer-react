import { h } from './jsx-runtime';

type ComponentFunction<P> = (props: P) => any;

const registry = new Map<string, new (props: any) => any>();

export function registerElement(
  tag: string,
  ElementClass: new (props: any) => any
): void {
  registry.set(tag, ElementClass);
}

export function getElement(tag: string): new (props: any) => any {
  const ElementClass = registry.get(tag);
  if (!ElementClass) {
    throw new Error(`Unknown element type: ${tag}`);
  }
  return ElementClass;
}

/**
 * Register a custom Leafer UI class as a JSX element.
 * Returns a React component that can be used in JSX.
 *
 * @example
 * ```tsx
 * import { registerComponent } from 'leafer-react'
 * import { UI, registerUI } from '@leafer-ui/core'
 *
 * @registerUI()
 * class Diamond extends UI {
 *   public get __tag() { return 'Diamond'; }
 *   // ... custom draw logic
 * }
 *
 * // Register and get a React component
 * const DiamondElement = registerComponent<DiamondProps>('Diamond', Diamond)
 *
 * // Now usable in JSX:
 * <Leafer>
 *   <DiamondElement width={80} height={80} fill="#667eea" />
 * </Leafer>
 * ```
 */
export function registerComponent<P = any>(
  tag: string,
  ElementClass: new (props: any) => any
): ComponentFunction<P> {
  if (registry.has(tag)) {
    console.warn(`[leafer-react] Component "${tag}" is already registered. It will be overwritten.`);
  }
  registry.set(tag, ElementClass);

  function Component(props: P): any {
    return h(tag, props);
  }

  Component.displayName = tag;
  return Component;
}

export { registry as elementRegistry };
