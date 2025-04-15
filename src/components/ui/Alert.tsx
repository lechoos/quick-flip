'use client';

import { useCallback, useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

type Props = {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
};

const variantStyles = {
  error: 'bg-destructive text-destructive-foreground' + ' border-destructive-border',
  success: 'bg-accent text-accent-foreground border-accent-border',
  warning: 'bg-secondary text-secondary-foreground' + ' border-secondary-border',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export const Alert = ({ message, onClose, variant = 'error', duration, className }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`absolute top-[5%] left-1/2 flex items-center justify-center !mx-0 px-3 py-2 sm:px-6 sm:py-4 w-full max-w-[250px] sm:max-w-[400px] rounded border-2 -translate-x-1/2 animate-slideIn z-[100] ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <p className="text-base sm:text-2xl text-center">{message}</p>
      <button
        onClick={handleClose}
        className="absolute top-0 left-0 p-[5px] hover:opacity-75"
        aria-label="Close alert"
      >
        <XIcon className="h-[2.5rem] w-[2.5rem] sm:h-[3.5rem] sm:w-[3.5rem]" />
      </button>
    </div>
  );
};
