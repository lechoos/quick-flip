import type { Dispatch, SetStateAction } from 'react';
import { use } from 'react';
import { SlidesContext } from '@/context/SlidesContext';
import useEmblaCarousel from 'embla-carousel-react';
import { PracticeMode } from '@/pages/Mode/ModeContent/PracticeMode';

type Props = {
  setIsFinished: Dispatch<SetStateAction<boolean>>;
};

export const Carousel = ({ setIsFinished }: Props) => {
  const slides = use(SlidesContext);

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
          <PracticeMode slideNext={slideNext} />
        </div>
      </>
    );
  }
};
