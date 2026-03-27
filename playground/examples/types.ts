// playground/examples/types.ts
import type { ComponentType } from 'react';

export interface Example {
  id: string;
  name: string;
  description: string;
  component: ComponentType<{ debug?: boolean }>;
  code: string;
}
