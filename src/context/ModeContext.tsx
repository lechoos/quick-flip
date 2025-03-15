import { createContext } from 'react';

type ModeContextType = 'practice' | 'test' | null;

export const ModeContext = createContext<ModeContextType>(null);
