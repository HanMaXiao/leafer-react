import React from 'react';
import type { ILeafInputData } from '@leafer-ui/interface';
import type { LeaferEventHandler } from '../utils/type';
import { Group } from './Group';

/**
 * Leafer canvas interaction props that the adapter intercepts and forwards to the wrapping Group.
 * Based on the official ILeafInputData interface, with children omitted (React uses ReactNode)
 * and React event handlers added (mapped to Leafer events by the reconciler).
 */
export type LeaferCanvasProps = Partial<Omit<ILeafInputData, 'children'>> & {
  children?: React.ReactNode;
  ref?: React.Ref<any>;
  // React event handlers (mapped by reconciler's EVENT_NAME_MAP)
  onClick?: LeaferEventHandler;
  onTap?: LeaferEventHandler;
  onDoubleClick?: LeaferEventHandler;
  onPointerDown?: LeaferEventHandler;
  onPointerUp?: LeaferEventHandler;
  onPointerMove?: LeaferEventHandler;
  onPointerEnter?: LeaferEventHandler;
  onPointerLeave?: LeaferEventHandler;
  onMouseDown?: LeaferEventHandler;
  onMouseUp?: LeaferEventHandler;
  onMouseMove?: LeaferEventHandler;
  onMouseEnter?: LeaferEventHandler;
  onMouseLeave?: LeaferEventHandler;
  onDragStart?: LeaferEventHandler;
  onDrag?: LeaferEventHandler;
  onDragEnd?: LeaferEventHandler;
  onMoveStart?: LeaferEventHandler;
  onMove?: LeaferEventHandler;
  onMoveEnd?: LeaferEventHandler;
  onRotateStart?: LeaferEventHandler;
  onRotate?: LeaferEventHandler;
  onRotateEnd?: LeaferEventHandler;
  onZoomStart?: LeaferEventHandler;
  onZoom?: LeaferEventHandler;
  onZoomEnd?: LeaferEventHandler;
  onResize?: LeaferEventHandler;
  onKeyDown?: LeaferEventHandler;
  onKeyUp?: LeaferEventHandler;
  // Lifecycle callback
  onCreated?: (instance: any) => void;
  // CSS aliases (mapped by reconciler's PROP_ALIAS_MAP)
  backgroundColor?: string;
  background?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: number | string;
  borderRadius?: number | string;
  // className (parsed by parseClassName)
  className?: string;
};

// Leafer interaction property keys extracted from ILeafInputData
const LEAFER_INTERACTION_KEYS: ReadonlySet<string> = new Set([
  // Position & transform
  'x', 'y', 'offsetX', 'offsetY', 'scrollX', 'scrollY',
  'width', 'height',
  'scaleX', 'scaleY', 'scale', 'rotation', 'skewX', 'skewY',
  // Interaction
  'draggable', 'editable', 'hittable',
  'hitFill', 'hitStroke', 'hitBox', 'hitChildren', 'hitSelf', 'hitRadius',
  'cursor', 'button',
  // Layout
  'origin', 'around', 'flow', 'padding', 'gap',
  // Display
  'visible', 'opacity', 'zIndex',
  // Drag bounds
  'dragBounds', 'dragBoundsType',
  // State
  'selected', 'disabled', 'locked',
  // Identity
  'id', 'name', 'className', 'tag',
]);

// CSS alias keys (already mapped in reconciler's PROP_ALIAS_MAP)
const CSS_ALIAS_KEYS: ReadonlySet<string> = new Set([
  'backgroundColor', 'background', 'color',
  'borderColor', 'borderWidth', 'borderRadius',
]);

function isEventProp(key: string): boolean {
  return key.startsWith('on') && key.length > 2;
}

function isLeaferProp(key: string): boolean {
  return LEAFER_INTERACTION_KEYS.has(key)
    || isEventProp(key)
    || CSS_ALIAS_KEYS.has(key)
    || key === 'ref' || key === 'onCreated' || key === 'children';
}

/**
 * Higher-order component that wraps any React component with a Leafer Group,
 * automatically separating Leafer canvas interaction props from component own props.
 *
 * The wrapped component receives only its own props; the Group handles positioning,
 * dragging, selection, events, etc.
 */
export function adaptComponent<P extends Record<string, any>>(
  Component: React.ComponentType<P>,
): React.FC<P & LeaferCanvasProps> {
  function AdaptedComponent(allProps: P & LeaferCanvasProps) {
    const leaferProps: Record<string, any> = {};
    const componentProps: Record<string, any> = {};

    for (const [key, value] of Object.entries(allProps)) {
      if (isLeaferProp(key)) {
        leaferProps[key] = value;
      } else {
        componentProps[key] = value;
      }
    }

    // children go to inner component, not Group
    const { children, ref, ...groupProps } = leaferProps;

    return (
      <Group {...groupProps} ref={ref}>
        <Component {...componentProps as P}>{children}</Component>
      </Group>
    );
  }

  AdaptedComponent.displayName = `Adapted(${Component.displayName || Component.name || 'Component'})`;
  return AdaptedComponent;
}
