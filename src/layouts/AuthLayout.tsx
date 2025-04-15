import { ReactNode } from 'react';
import { Card } from '@/components/atoms/card';
import { Link } from '@/components/atoms/link';

type Props = {
  children: ReactNode;
  title: 'Login' | 'Register';
};

export const AuthLayout = ({ title, children }: Props) => {
  const paragraphStyles = 'mt-3 text-base text-center';

  return (
    <section className="flex flex-col items-center justify-center mx-2 min-h-screen">
      <h1 className="mb-2">{title}</h1>
      <Card className="p-2 sm:p-3 w-full sm:w-fit sm:min-w-[500px] bg-secondary border-[3px] border-black shadow">
        {children}
        {title === 'Login' ? (
          <p className={paragraphStyles}>
            Don&apos;t have an account?{' '}
            <Link
              className="underline"
              href="/auth/register"
            >
              Create an account
            </Link>
          </p>
        ) : (
          <p className={paragraphStyles}>
            Already have an account?{' '}
            <Link
              className="underline"
              href="/auth/login"
            >
              Login instead
            </Link>
          </p>
        )}
      </Card>
    </section>
  );
};
