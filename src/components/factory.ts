import { h } from '../core/renderer/jsx-runtime';

type ComponentFunction<P> = (props: P) => any;

interface DefineOptions<P> {
  /**
   * Transform props before passing to h().
   * Can return either plain props (same tag) or `{ tag, props }` to override the tag.
   * For special cases like Text (merge children) and Pen (route to Path).
   */
  transform?: (props: P) => any;
}

/**
 * Create a typed Leafer element component.
 * The element class must already be registered via `registerElement` (handled by leafer-elements.ts).
 */
export function defineLeaferElement<P = any>(
  tag: string,
  options?: DefineOptions<P>,
): ComponentFunction<P> {
  function Component(props: P): any {
    const transformed = options?.transform ? options.transform(props) : props;
    // Allow transform to override the tag (e.g., Pen → Path when `path` prop is present)
    if (transformed && typeof transformed === 'object' && 'tag' in transformed && 'props' in transformed) {
      return h(transformed.tag, transformed.props);
    }
    return h(tag, transformed);
  }

  Component.displayName = tag;
  return Component;
}
