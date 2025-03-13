import { Dispatch, JSX, SetStateAction } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/atoms/button';
import { CircleCheckBig, Play } from 'lucide-react';

type CarouselProps = {
  slides: JSX.Element[];
  setIsFinished: Dispatch<SetStateAction<boolean>>;
};

export const Carousel = ({ slides, setIsFinished }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  const slideNext = () => {
    if (emblaApi?.canScrollNext()) {
      emblaApi?.scrollNext(true);
    } else {
      setIsFinished(true);
    }
  };

  if (slides) {
    return (
      <>
        <div
          className="embla"
          ref={emblaRef}
        >
          <div className="embla-container">{slides}</div>
        </div>
        <div className="mt-4 space-x-2">
          <Button
            variant="accent"
            className="aspect-square rounded-full"
          >
            <Play className="!size-[3.5rem]" />
          </Button>
          <Button
            variant="accent"
            className="aspect-square rounded-full"
            onClick={slideNext}
          >
            <CircleCheckBig className="!size-[3.5rem]" />
          </Button>
        </div>
      </>
    );
  }
};
