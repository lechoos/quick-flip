import { Container } from '@/components/atoms/container';
import { getUserProfile } from '@/lib/actions';
import { ProfileDetails } from '@/sites/profile/ProfileDetails';
import { redirect } from 'next/navigation';

const commonStyles = 'p-3 bg-primary border-[5px] border-black rounded-3xl';

export const ProfileContent = async () => {
  const user = await getUserProfile();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <Container className="flex flex-col gap-2 px-3 pb-4">
      <div className={`${commonStyles}`}>
        <h2>Your account details:</h2>
        <div className="mt-2 text-lg">
          <ProfileDetails userDetails={user!} />
        </div>
      </div>
    </Container>
  );
};
