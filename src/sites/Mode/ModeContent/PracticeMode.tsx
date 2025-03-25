'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Alert } from '@/components/ui/Alert';
import { CircleCheckBig, Play, LoaderCircle } from 'lucide-react';

type Props = {
  text: string;
  slideNext: () => void;
};

export const PracticeMode = ({ text, slideNext }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudioGenerate = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const stream = await fetch('/api/sound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await stream.json();

      if (!stream.ok) {
        throw new Error(data.error || 'Failed to generate audio data.');
      }

      const audio = new Audio('data:audio/mpeg;base64,' + data.audio);

      setIsLoading(false);
      await audio.play();
    } catch (ex) {
      setError((ex as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          message={error}
          variant="error"
          duration={600000}
        />
      )}
      <Button
        variant="accent"
        className="first:ml-0! aspect-square rounded-full disabled:opacity-70"
        onClick={handleAudioGenerate}
        disabled={isLoading}
      >
        {isLoading ? <LoaderCircle className="!size-[3.5rem] rotate-animation" /> : <Play className="!size-[3.5rem]" />}
      </Button>
      <Button
        variant="accent"
        className="ml-2 aspect-square rounded-full"
        onClick={slideNext}
      >
        <CircleCheckBig className="!size-[3.5rem]" />
      </Button>
    </>
  );
};
