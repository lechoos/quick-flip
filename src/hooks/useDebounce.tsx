import { useCallback, useEffect, useState } from 'react';

type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export const useDebounce = <T extends (...args: any[]) => any>(func: T, delay: number): DebouncedFunction<T> => {
  // timer's id saved in a state
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // useCallback to prevent function from being creating
  // during every render, unless deps have changed
  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      // clearing the existing timer
      if (timer) {
        clearTimeout(timer);
      }

      // creating a new timer
      const newTimer = setTimeout(() => {
        func(...args);
      }, delay);

      // saving a new timer to a state
      setTimer(newTimer);
    },
    [func, delay, timer],
  );

  // clearing the timer if component will unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedFunction;
};
