import { getElement } from './element-registry';

export function h(
  type: string | typeof Fragment,
  props: { children?: any; [key: string]: any } | null,
  ...children: any[]
): any {
  if (type === Fragment) {
    return props?.children ?? null;
  }

  const mergedProps = { ...props, children: children.length > 0 ? children : props?.children };

  const ElementClass = getElement(type as string);
  return new ElementClass(mergedProps);
}

export const Fragment = Symbol.for('react.fragment');
