import { ReactNode } from 'react';
import { Container } from '@/components/atoms/container';
import { Card } from '@/components/atoms/card';

const TestCard = ({ children }: { children: ReactNode }) => <Card className="inline-block p-2 text-xl text-accent-foreground bg-accent border-[3px] border-black">{children}</Card>;

export const ProfileContent = () => {
  return (
    <Container className="px-3">
      <div className="flex flex-col gap-2 p-3 bg-primary border-[5px] border-black rounded-3xl">
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
    </Container>
  );
};
