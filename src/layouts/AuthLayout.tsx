import { ReactNode } from 'react';
import { Card } from '@/components/atoms/card';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const AuthLayout = ({ title, children }: LayoutProps) => {
  return (
    <section className="flex flex-col items-center justify-center mx-2 min-h-screen">
      <h1 className="mb-2">{title}</h1>
      <Card className="p-2 sm:p-3 w-full sm:w-fit sm:min-w-[500px] bg-secondary border-[3px] border-black shadow">{children}</Card>
    </section>
  );
};
