'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/atoms/button';

export const SignOutButton = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <Button
      onClick={logoutHandler}
      variant="secondary"
      className="mt-1 font-bold"
      type="submit"
    >
      Sign out
    </Button>
  );
};
