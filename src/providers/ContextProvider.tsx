import type { Context as ContextType, ReactNode } from 'react';

type Props<T> = {
  Context: ContextType<T>;
  children: ReactNode;
  value: T;
};

export const ContextProvider = <T,>({ Context, children, value }: Props<T>) => <Context.Provider value={value}>{children}</Context.Provider>;
