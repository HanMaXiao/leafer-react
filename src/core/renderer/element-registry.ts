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

export { registry as elementRegistry };
