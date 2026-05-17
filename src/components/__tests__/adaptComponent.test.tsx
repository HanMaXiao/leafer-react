import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { adaptComponent } from '../adaptComponent';
import type { LeaferCanvasProps } from '../adaptComponent';
import { Group } from '../Group';

// Simple mock component for testing
interface MockCardProps {
  title: string;
  description?: string;
}

function MockCard({ title, description }: MockCardProps) {
  return React.createElement('div', null,
    React.createElement('h1', null, title),
    React.createElement('p', null, description),
  );
}
MockCard.displayName = 'MockCard';

describe('adaptComponent', () => {
  it('should set displayName correctly', () => {
    const Adapted = adaptComponent(MockCard);
    expect(Adapted.displayName).toBe('Adapted(MockCard)');
  });

  it('should set displayName for components without a name', () => {
    const Named = () => React.createElement('div', null);
    const Adapted = adaptComponent(Named);
    expect(Adapted.displayName).toBe('Adapted(Named)');
  });

  it('should separate Leafer props from component props', () => {
    const Adapted = adaptComponent(MockCard);
    const result = Adapted({
      x: 100,
      y: 50,
      draggable: true,
      title: 'Hello',
      description: 'World',
    } as MockCardProps & LeaferCanvasProps) as any;

    // Result is a React element wrapping Group
    expect(result).toBeTruthy();
    expect(result.type).toBe(Group);

    // Group should have Leafer interaction props
    expect(result.props.x).toBe(100);
    expect(result.props.y).toBe(50);
    expect(result.props.draggable).toBe(true);

    // Group should NOT have component props
    expect(result.props.title).toBeUndefined();
    expect(result.props.description).toBeUndefined();
  });

  it('should intercept event handlers', () => {
    const Adapted = adaptComponent(MockCard);
    const onClick = vi.fn();
    const onDrag = vi.fn();

    const result = Adapted({
      onClick,
      onDrag,
      title: 'Events',
    } as MockCardProps & LeaferCanvasProps) as any;

    // Events go to Group
    expect(result.props.onClick).toBe(onClick);
    expect(result.props.onDrag).toBe(onDrag);
  });

  it('should pass children to inner component via Group children', () => {
    function Container({ children }: { children?: React.ReactNode }) {
      return React.createElement('div', null, children);
    }

    const Adapted = adaptComponent(Container);
    const child = React.createElement('span', null, 'child');

    const result = Adapted({
      x: 10,
      children: child,
    } as { children?: React.ReactNode } & LeaferCanvasProps) as any;

    // JSX puts the inner component as Group's children
    const groupChildren = result.props.children;
    expect(groupChildren).toBeTruthy();
    const innerEl = Array.isArray(groupChildren) ? groupChildren[0] : groupChildren;
    expect(innerEl.type).toBe(Container);
    expect(innerEl.props.children).toBe(child);
  });

  it('should intercept CSS alias props', () => {
    const Adapted = adaptComponent(MockCard);

    const result = Adapted({
      backgroundColor: '#ff0000',
      borderRadius: 8,
      title: 'Styled',
    } as MockCardProps & LeaferCanvasProps) as any;

    expect(result.props.backgroundColor).toBe('#ff0000');
    expect(result.props.borderRadius).toBe(8);
    expect(result.props.title).toBeUndefined();
  });

  it('should intercept identity props (id, name, className)', () => {
    const Adapted = adaptComponent(MockCard);

    const result = Adapted({
      id: 'card-1',
      name: 'myCard',
      className: 'card-class',
      title: 'Identity',
    } as MockCardProps & LeaferCanvasProps) as any;

    expect(result.props.id).toBe('card-1');
    expect(result.props.name).toBe('myCard');
    expect(result.props.className).toBe('card-class');
  });

  it('should pass all component props when no Leafer props are given', () => {
    const Adapted = adaptComponent(MockCard);

    const result = Adapted({
      title: 'Pure Component',
      description: 'No Leafer props',
    } as MockCardProps & LeaferCanvasProps) as any;

    expect(result.type).toBe(Group);
    expect(Object.keys(result.props).filter(k => k !== 'children')).toHaveLength(0);
  });

  it('should handle ref and onCreated correctly', () => {
    const Adapted = adaptComponent(MockCard);
    const ref = React.createRef();
    const onCreated = vi.fn();

    const result = Adapted({
      ref,
      onCreated,
      title: 'Ref Test',
    } as MockCardProps & LeaferCanvasProps) as any;

    expect(result.props.ref).toBeUndefined();
    expect(result.props.onCreated).toBe(onCreated);
  });

  it('should work with third-party-style components', () => {
    interface ButtonProps {
      label: string;
      variant?: 'primary' | 'secondary';
      disabled?: boolean;
    }

    function ThirdPartyButton({ label, variant, disabled }: ButtonProps) {
      return React.createElement('button', { className: variant, disabled }, label);
    }

    const AdaptedButton = adaptComponent(ThirdPartyButton);
    expect(AdaptedButton.displayName).toBe('Adapted(ThirdPartyButton)');

    const result = AdaptedButton({
      x: 200,
      y: 100,
      draggable: true,
      label: 'Click Me',
      variant: 'primary',
    } as ButtonProps & LeaferCanvasProps) as any;

    expect(result.props.x).toBe(200);
    expect(result.props.y).toBe(100);
    expect(result.props.draggable).toBe(true);
    expect(result.props.label).toBeUndefined();
    expect(result.props.variant).toBeUndefined();
  });

  it('should intercept all interaction props', () => {
    const Adapted = adaptComponent(MockCard);

    const result = Adapted({
      x: 10,
      y: 20,
      width: 200,
      height: 100,
      scaleX: 2,
      scaleY: 2,
      rotation: 45,
      opacity: 0.8,
      visible: true,
      zIndex: 5,
      draggable: true,
      editable: true,
      hittable: true,
      hitFill: 'all',
      hitStroke: 'all',
      cursor: 'pointer',
      title: 'All Props',
    } as MockCardProps & LeaferCanvasProps) as any;

    expect(result.props.x).toBe(10);
    expect(result.props.y).toBe(20);
    expect(result.props.width).toBe(200);
    expect(result.props.height).toBe(100);
    expect(result.props.scaleX).toBe(2);
    expect(result.props.rotation).toBe(45);
    expect(result.props.opacity).toBe(0.8);
    expect(result.props.draggable).toBe(true);
    expect(result.props.editable).toBe(true);
    expect(result.props.cursor).toBe('pointer');
    expect(result.props.title).toBeUndefined();
  });
});
