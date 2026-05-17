// HTML container tags that map to Leafer Group/Frame
export const HTML_CONTAINER_TAGS = new Set([
  'div', 'span', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside',
  'ul', 'ol', 'li', 'button', 'input', 'textarea', 'select',
]);

// HTML text tags → default Text styles
export const HTML_TEXT_TAG_DEFAULTS: Record<string, Record<string, any>> = {
  p: { fontSize: 14 },
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 28, fontWeight: 'bold' },
  h3: { fontSize: 24, fontWeight: 'bold' },
  h4: { fontSize: 20, fontWeight: 'bold' },
  h5: { fontSize: 16, fontWeight: 'bold' },
  h6: { fontSize: 14, fontWeight: 'bold' },
  label: { fontSize: 14 },
  a: { fontSize: 14 },
};

// HTML image tags
export const HTML_IMAGE_TAGS = new Set(['img']);

// React-style prop names → Leafer prop names
export const PROP_ALIAS_MAP: Record<string, string> = {
  backgroundColor: 'fill',
  background: 'fill',
  color: 'fill',
  borderColor: 'stroke',
  borderWidth: 'strokeWidth',
  borderRadius: 'cornerRadius',
};

// Properties that accept CSS px string values
export const PX_VALUE_PROPS = new Set([
  'width', 'height', 'strokeWidth', 'cornerRadius', 'x', 'y', 'fontSize',
]);

// Event name mapping: React style → Leafer style
export const EVENT_NAME_MAP: Record<string, string> = {
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
  onDragStart: 'drag.start',
  onDrag: 'drag',
  onDragEnd: 'drag.end',
  onMoveStart: 'move.start',
  onMove: 'move',
  onMoveEnd: 'move.end',
  onRotateStart: 'rotate.start',
  onRotate: 'rotate',
  onRotateEnd: 'rotate.end',
  onZoomStart: 'zoom.start',
  onZoom: 'zoom',
  onZoomEnd: 'zoom.end',
  onResize: 'zoom',
  onKeyDown: 'key',
  onKeyUp: 'key.up',
};

export function stripPx(value: any): any {
  if (typeof value === 'string' && value.endsWith('px')) {
    const num = parseFloat(value);
    return isNaN(num) ? value : num;
  }
  return value;
}
