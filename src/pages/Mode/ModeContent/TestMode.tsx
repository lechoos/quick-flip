import { type FormEvent, useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Alert } from '@/components/ui/Alert';

type Props = {
  back: string;
};

export const TestMode = ({ back }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnDuration = useDebounce(() => setDuration(5000), 1000);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    if (!value) {
      setError(true);
      returnDuration();
      return;
    }

    console.log(value === back);
    setValue('');
  };

  const closeAlertHandler = () => {
    setError(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
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
      {error && (
        <Alert
          onClose={closeAlertHandler}
          duration={duration}
          message="You can't submit an empty field."
        />
      )}
    </>
  );
};
