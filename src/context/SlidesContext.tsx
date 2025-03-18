import { createContext, type JSX } from 'react';

type SlidesContextType = JSX.Element[] | null;

export const SlidesContext = createContext<SlidesContextType>(null);
