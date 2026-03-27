import { createContext } from 'react';
import type { App } from '@leafer-ui/core';

export const LeaferContext = createContext<App | undefined>(undefined);
