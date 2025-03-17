import { type FormEvent, type JSX, useState, useRef, useEffect, use } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SlidesContext } from '@/context/SlidesContext';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Alert } from '@/components/ui/Alert';

type Props = {
  currentSlide: number;
  updateSlideClass: (index: number, className: string) => void;
  slideNext: () => void;
};

const ScrollNextUI = ({ clickHandler }: { clickHandler: () => void }) => <Button onClick={clickHandler}>Next</Button>;

export const TestMode = ({ currentSlide, updateSlideClass, slideNext }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [duration, setDuration] = useState(0);

  const [currentSlideElement, setCurrentSlideElement] = useState<JSX.Element | null>(null);

  const slides = use(SlidesContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const returnDuration = useDebounce(() => setDuration(5000), 1000);

  const checkAnswer = (userAnswer: string, correctAnswer: string) => {
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  };

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
    if (slides) {
      setCurrentSlideElement(slides[currentSlide]);
    }
  }, [currentSlide]);

  return (
    <>
      {hasAnswered ? (
        <ScrollNextUI clickHandler={scrollHandler} />
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
