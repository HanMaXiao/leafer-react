import { useContext } from 'react';
import { LeaferContext } from '../context/LeaferContext';
import type { App } from '@leafer-ui/core';

export function useLeafer(): App {
  const app = useContext(LeaferContext);
  if (!app) {
    throw new Error('useLeafer must be used within <Leafer />');
  }
  return app;
}
