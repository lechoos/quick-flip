import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-2">Login</h1>
      {children}
    </section>
  );
};
