'use client';

import { JSX } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/atoms/button';
import { CircleCheckBig, Play } from 'lucide-react';

type CarouselProps = {
  slides: JSX.Element[];
};

export const Carousel = ({ slides }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  const slideNext = () => {
    emblaApi?.scrollNext(true);
  };

  if (slides) {
    return (
      <section className="flex flex-col items-center">
        <div
          className="embla"
          ref={emblaRef}
        >
          <div className="embla-container">{slides}</div>
        </div>
        <div className="mt-4 space-x-2">
          {[Play, CircleCheckBig].map((Icon) => (
            <Button
              key={Icon.displayName}
              variant="accent"
              className="aspect-square rounded-full"
              onClick={Icon.displayName === 'CircleCheckBig' ? slideNext : undefined}
            >
              <Icon className="!size-[3.5rem]" />
            </Button>
          ))}
        </div>
      </section>
    );
  }
};
