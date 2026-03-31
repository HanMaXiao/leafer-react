/**
 * Pointer event handler type
 */
export type PointerEventHandler = (e: any) => void;

/**
 * Mouse event handler type
 */
export type MouseEventHandler = (e: any) => void;

/**
 * Click and tap event handlers
 */
export interface ClickEventProps {
  onClick?: (e: any) => void;
  onDoubleClick?: (e: any) => void;
}

/**
 * Mouse button event handlers
 */
export interface MouseEventProps {
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

/**
 * Pointer event handlers (covers mouse, pen, touch)
 */
export interface PointerEventProps {
  onPointerDown?: PointerEventHandler;
  onPointerUp?: PointerEventHandler;
  onPointerMove?: PointerEventHandler;
  onPointerEnter?: PointerEventHandler;
  onPointerLeave?: PointerEventHandler;
}

/**
 * Combined event properties for all pointer/mouse interactions
 */
export interface EventProps extends ClickEventProps, MouseEventProps, PointerEventProps {}
