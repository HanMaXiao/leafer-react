import { describe, it, expect } from 'vitest';
import { h } from '../core/renderer/jsx-runtime';
import '../core/renderer/leafer-elements';

describe('ReactComponent', () => {
  it('should create with component and props', () => {
    const MockComponent = () => null;
    const element = h('ReactComponent', {
      component: MockComponent,
      props: { title: 'Test' },
      width: 200,
      height: 100
    });
    expect(element).toBeDefined();
  });
});
