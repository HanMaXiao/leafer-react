/**
 * Pointer event handler type
 */
export type PointerEventHandler = (e: any) => void;

/**
 * Click and tap event handlers
 */
export interface ClickEventProps {
  onClick?: (e: any) => void;
  onDoubleClick?: (e: any) => void;
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
 * Combined event properties for all pointer interactions
 */
export interface EventProps extends ClickEventProps, PointerEventProps {}
