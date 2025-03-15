import { Dispatch, SetStateAction, useState } from 'react';
import { use } from 'react';
import { SlidesContext } from '@/context/SlidesContext';
import { ModeContext } from '@/context/ModeContext';
import useEmblaCarousel from 'embla-carousel-react';
import { PracticeMode } from '@/pages/Mode/ModeContent/PracticeMode';
import { TestMode } from '@/pages/Mode/ModeContent/TestMode';
import { Link } from '@/components/atoms/link';

type Props = {
  setIsFinished: Dispatch<SetStateAction<boolean>>;
};

export const Carousel = ({ setIsFinished }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  const slides = use(SlidesContext);
  const mode = use(ModeContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideNext = () => {
    if (emblaApi?.canScrollNext()) {
      emblaApi?.scrollNext(true);
      setCurrentSlide((prevSlide) => prevSlide + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (!slides) {
    return (
      <h2 className="flex flex-col gap-y-2 mt-2 text-center">
        No flashcards found.
        <Link href="/flashcards">Go back to flashcards page.</Link>
      </h2>
    );
  }

  return (
    <>
      <div
        className="embla"
        ref={emblaRef}
      >
        <div className="embla-container">{slides}</div>
      </div>
      <div className="mt-4 space-x-2">{mode === 'practice' ? <PracticeMode slideNext={slideNext} /> : <TestMode back={slides[currentSlide]?.props.back} />}</div>
    </>
  );
};
