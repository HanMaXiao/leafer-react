const REACT_ELEMENT_TYPE = Symbol.for('react.element');

export const Fragment = Symbol.for('react.fragment');

/**
 * Create a Leafer element descriptor.
 * Returns a valid React element so the reconciler can process it.
 * The reconciler calls hostConfig.createInstance(type, props) for string types.
 */
export function h(
  type: string | typeof Fragment,
  props: { children?: any; [key: string]: any } | null,
  ...children: any[]
): any {
  if (type === Fragment) {
    return props?.children ?? null;
  }

  const mergedProps: Record<string, any> = {
    ...props,
    children: children.length > 0 ? children : props?.children,
  };

  // Extract key and ref from props
  const key = mergedProps.key ?? null;
  const ref = mergedProps.ref ?? null;
  delete mergedProps.key;
  delete mergedProps.ref;

  // Return a proper React element so the reconciler recognizes it.
  // String type → reconciler calls hostConfig.createInstance(type, props)
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props: mergedProps,
    key,
    ref,
  };
}
