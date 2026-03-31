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
 * After registration, you can use it like: <MyCustomElement {...props} />
 *
 * @example
 * ```tsx
 * import { registerComponent } from 'leafer-react'
 * import { MyChart } from './MyChart'
 *
 * registerComponent('MyChart', MyChart)
 *
 * // Now usable in JSX:
 * <Leafer>
 *   <MyChart data={[1, 2, 3]} />
 * </Leafer>
 * ```
 */
export function registerComponent(
  tag: string,
  ElementClass: new (props: any) => any
): void {
  if (registry.has(tag)) {
    console.warn(`[leafer-react] Component "${tag}" is already registered. It will be overwritten.`);
  }
  registry.set(tag, ElementClass);
}

export { registry as elementRegistry };
