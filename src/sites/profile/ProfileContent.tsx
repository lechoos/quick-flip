import { ReactNode } from 'react';
import { Container } from '@/components/atoms/container';
import { Card } from '@/components/atoms/card';
import { UpdateProfileForm } from '@/components/forms/UpdateProfileForm';

const commonStyles = 'p-3 bg-primary border-[5px] border-black rounded-3xl';
const TestCard = ({ children }: { children: ReactNode }) => <Card className="inline-block p-2 text-xl text-accent-foreground bg-accent border-[3px] border-black">{children}</Card>;

export const ProfileContent = async () => {
  return (
    <Container className="flex flex-col gap-2 px-3 pb-4">
      <div className={`flex flex-col order-1 gap-2 p-3 ${commonStyles}`}>
        <h2>Last tests:</h2>
        <div className="flex gap-2">
          <TestCard>Colors: 12</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
        </div>
        <br />
        <h2>Average scores:</h2>
        <div className="flex gap-2">
          <TestCard>Colors: 12</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
          <TestCard>Greetings: 8</TestCard>
          <TestCard>Numbers: 10</TestCard>
        </div>
      </div>
      <div className={`${commonStyles}`}>
        <h2>Update your account:</h2>
        <div className="mt-2 text-lg">
          <UpdateProfileForm />
        </div>
      </div>
    </Container>
  );
};
