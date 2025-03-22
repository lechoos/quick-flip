import { notFound } from 'next/navigation';

export const ModeAnnounce = ({ mode }: { mode: 'practice' | 'test' }) => {
  if (mode !== 'practice' && mode !== 'test') notFound();

  return (
    <div className="absolute top-0 left-0 w-full h-full grid place-items-center font-anonymous-pro text-5xl bg-primary z-[100] fade-animation">
      <p className="mx-4 text-center">{mode === 'practice' ? "Let's" + ' practice!' : 'Try your best!'}</p>
    </div>
  );
};
