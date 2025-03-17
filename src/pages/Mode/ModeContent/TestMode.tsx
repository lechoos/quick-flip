import { type FormEvent, type JSX, type Dispatch, type SetStateAction, type RefObject, useState, useRef, useEffect, use } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SlidesContext } from '@/context/SlidesContext';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Alert } from '@/components/ui/Alert';
import { checkAnswer } from '@/lib/utils';

type Props = {
  currentSlide: number;
  updateSlideClass: (index: number, className: string) => void;
  slideNext: () => void;
  setScore: Dispatch<SetStateAction<number>>;
};

type ScrollProps = {
  ref: RefObject<HTMLButtonElement | null>;
  clickHandler: () => void;
};

const ScrollNextUI = ({ clickHandler, ref }: ScrollProps) => (
  <Button
    ref={ref}
    onClick={clickHandler}
  >
    Next
  </Button>
);

export const TestMode = ({ currentSlide, updateSlideClass, slideNext, setScore }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [duration, setDuration] = useState(0);

  const [currentSlideElement, setCurrentSlideElement] = useState<JSX.Element | null>(null);

  const slides = use(SlidesContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);

  const returnDuration = useDebounce(() => setDuration(5000), 1000);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    if (!value) {
      setError(true);
      returnDuration();
      return;
    }

    setHasAnswered(true);
    const isCorrect = checkAnswer(value, currentSlideElement?.props.back);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      updateSlideClass(currentSlide, 'learning-card-shown');
    } else {
      updateSlideClass(currentSlide, 'learning-card-shown wrong-answer');
    }

    setValue('');
  };

  const scrollHandler = () => {
    updateSlideClass(currentSlide, '');
    setHasAnswered(false);
    slideNext();
  };

  const closeAlertHandler = () => {
    setError(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentSlide]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  }, [hasAnswered]);

  useEffect(() => {
    if (slides) {
      setCurrentSlideElement(slides[currentSlide]);
    }
  }, [currentSlide]);

  return (
    <>
      {hasAnswered ? (
        <ScrollNextUI
          ref={scrollRef}
          clickHandler={scrollHandler}
        />
      ) : (
        <form
          className="flex flex-col gap-y-2 items-center"
          onSubmit={submitHandler}
        >
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="py-1 px-2 text-lg text-secondary-foreground bg-secondary border-[3px] border-secondary-border rounded-3xl focus:border-[5px] focus:outline-none"
            type="text"
          />
          <Button
            variant="secondary"
            type="submit"
          >
            Check
          </Button>
        </form>
      )}
      {error && (
        <Alert
          onClose={closeAlertHandler}
          duration={duration}
          message="You can't check an empty field."
        />
      )}
    </>
  );
};
