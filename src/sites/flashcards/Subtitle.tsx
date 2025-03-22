import { getUserProfile } from '@/lib/actions';
import { Link } from '@/components/atoms/link';
import { SignOutButton } from '@/components/ui/SignOutButton';

export const Subtitle = async () => {
  const user = await getUserProfile();

  const commonStyles = 'mx-4 mt-2 text-lg text-center';

  if (!user) {
    return (
      <h2 className={commonStyles}>
        You can also{' '}
        <Link
          className="underline"
          href={'/auth/register'}
        >
          Register
        </Link>{' '}
        and{' '}
        <Link
          className="underline"
          href={'/auth/login'}
        >
          Login
        </Link>{' '}
        but now it doesn&apos;t provide any features yet.
      </h2>
    );
  }

  return (
    <h2 className={commonStyles}>
      You are logged in as {user.username}. <SignOutButton />
    </h2>
  );
};
