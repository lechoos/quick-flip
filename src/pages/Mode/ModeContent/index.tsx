'use client';

import { type JSX, useState } from 'react';
import { ContextProvider } from '@/providers/ContextProvider';
import { SlidesContext } from '@/context/SlidesContext';
import { ModeContext } from '@/context/ModeContext';
import { Carousel } from '@/components/ui/Carousel';
import { FinishScreen } from '@/pages/Mode/ModeContent/FinishScreen';

type Props = {
  slides: JSX.Element[];
  slug: string;
  mode: 'practice' | 'test';
};

export const ModeContent = ({ slides, slug, mode }: Props) => {
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <ContextProvider
      Context={SlidesContext}
      value={slides}
    >
      <ContextProvider
        Context={ModeContext}
        value={mode}
      >
        <section className="flex flex-col items-center mt-3 wrapper">
          {isFinished ? (
            <FinishScreen
              score={score}
              slug={slug}
              mode={mode}
            />
          ) : (
            <Carousel
              setScore={setScore}
              setIsFinished={setIsFinished}
            />
          )}
        </section>
      </ContextProvider>
    </ContextProvider>
  );
};
