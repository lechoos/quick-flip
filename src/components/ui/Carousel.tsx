import { Dispatch, SetStateAction, useState, cloneElement } from 'react';
import { use } from 'react';
import { SlidesContext } from '@/context/SlidesContext';
import { ModeContext } from '@/context/ModeContext';
import useEmblaCarousel from 'embla-carousel-react';
import { PracticeMode } from '@/sites/Mode/ModeContent/PracticeMode';
import { TestMode } from '@/sites/Mode/ModeContent/TestMode';
import { Link } from '@/components/atoms/link';

type Props = {
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
};

export const Carousel = ({ setIsFinished, setScore }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });

  const slides = use(SlidesContext);
  const mode = use(ModeContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  // array of empty strings corresponding with slides' length
  const [slideClasses, setSlideClasses] = useState<string[]>(Array(slides?.length).fill(''));

  // updating slideClasses with a new class at index
  // provided as an argument
  const updateSlideClass = (index: number, className: string) => {
    // creating a new array with elements existing in
    // slideClasses array
    const newSlideClasses = [...slideClasses];

    // setting a new class to the element at index
    // provided as an argument
    newSlideClasses[index] = className;

    // updating slideClasses array with a newly created
    // newSlideClasses array
    setSlideClasses(newSlideClasses);
  };

  // function to scroll a carousel
  const slideNext = () => {
    // ending a function execution if emblaApi is undefined
    if (!emblaApi) return;

    // checking there is a next slide to a current one
    if (emblaApi.canScrollNext()) {
      // scrolling to the next slide and updating
      // currentSlide index
      emblaApi.scrollNext(true);
      setCurrentSlide(emblaApi.selectedScrollSnap());
    } else {
      // setting a state to display a finish screen
      setIsFinished(true);
    }
  };

  // returning information that there are no flashcards
  // if slides is null
  if (!slides) {
    return (
      <h2 className="flex flex-col gap-y-2 mt-2 text-center">
        No flashcards found.
        <Link href="/flashcards">Go back to flashcards page.</Link>
      </h2>
    );
  }

  // function to map a slides array to a new array with
  // clone elements of an original array
  const slidesWithClasses = slides.map((slide, index) =>
    // making a clone of a slide and setting its
    // className prop to already existing classes and
    // classes from slideClasses array at selected index
    cloneElement(slide, {
      className: `${slide.props.className || ''} ${slideClasses[index]}`,
    }),
  );

  // returning a UI
  return (
    <>
      <div
        className="embla"
        ref={emblaRef}
      >
        <div className="embla-container">{slidesWithClasses}</div>
      </div>
      <div className="mt-4 space-x-2">
        {mode === 'practice' ? (
          <PracticeMode slideNext={slideNext} />
        ) : (
          <TestMode
            currentSlide={currentSlide}
            updateSlideClass={updateSlideClass}
            slideNext={slideNext}
            setScore={setScore}
          />
        )}
      </div>
    </>
  );
};
