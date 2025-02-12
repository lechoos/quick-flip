'use client';

import { useState, useEffect, useCallback } from 'react';
import { XIcon } from 'lucide-react';

type AlertProps = {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
};

const variantStyles = {
  error: 'bg-destructive text-destructive-foreground' + ' border-destructive-border',
  success: 'bg-accent text-accent-foreground border-accent-border',
  warning: 'bg-secondary text-secondary-foreground' + ' border-secondary-border',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export const Alert = ({ message, onClose, variant = 'error', duration }: AlertProps) => {
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
      className={`relative flex items-center justify-between px-4 py-3 rounded border-2 ${variantStyles[variant]}`}
      role="alert"
    >
      <p className="text-sm">{message}</p>
      <button
        onClick={handleClose}
        className="absolute top-0 left-0 p-[5px] hover:opacity-75"
        aria-label="Close alert"
      >
        <XIcon className="h-2 w-2" />
      </button>
    </div>
  );
};
