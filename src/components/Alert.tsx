'use client';

import { useState, useEffect, useCallback } from 'react';
import { XIcon } from 'lucide-react';

type AlertProps = {
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

export const Alert = ({ message, onClose, variant = 'error', duration, className }: AlertProps) => {
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
      className={`absolute top-[5%] flex items-center justify-between px-6 py-4 rounded border-2 animate-slideIn z-20 ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <p className="text-2xl">{message}</p>
      <button
        onClick={handleClose}
        className="absolute top-0 left-0 p-[5px] hover:opacity-75"
        aria-label="Close alert"
      >
        <XIcon className="h-[3.5rem] w-[3.5rem]" />
      </button>
    </div>
  );
};
