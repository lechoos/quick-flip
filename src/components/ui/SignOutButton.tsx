import { signOut } from '@/auth';
import { Button } from '@/components/atoms/button';

export const SignOutButton = async () => (
  <form
    action={async () => {
      'use server';
      await signOut();
    }}
  >
    <Button
      variant="secondary"
      className="mt-1 font-bold"
      type="submit"
    >
      Sign out
    </Button>
  </form>
);
