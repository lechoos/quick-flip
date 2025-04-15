import { ReactNode } from 'react';
import { Container } from '@/components/atoms/container';
import { Card } from '@/components/atoms/card';
import { getUserProfile } from '@/lib/actions';
import { ProfileDetails } from '@/sites/profile/ProfileDetails';
import { redirect } from 'next/navigation';

const commonStyles = 'p-3 bg-primary border-[5px] border-black rounded-3xl';
const TestCard = ({ children }: { children: ReactNode }) => <Card className="p-1 text-base md:text-xl text-accent-foreground bg-accent border-[3px] border-black">{children}</Card>;

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
      <div className={`flex flex-col gap-[1.5rem] p-3 ${commonStyles}`}>
        <h2>Last tests:</h2>
        <div className="flex flex-wrap gap-2">
          <TestCard>Colors: 12</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
        </div>
        <br />
        <h2>Average scores:</h2>
        <div className="flex flex-wrap gap-2">
          <TestCard>Common Verbs: 12</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
        </div>
      </div>
    </Container>
  );
};
