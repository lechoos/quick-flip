import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const AuthLayout = ({ title, children }: LayoutProps) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-2">{title}</h1>
      <Card className="p-3 min-w-[500px] bg-secondary border-2 border-secondary-border shadow-secondary-border">{children}</Card>
    </section>
  );
};
