'use client';

import { useState, useEffect, ReactNode, RefObject } from 'react';

type PartOfSpeechProps = {
  children: ReactNode;
  color?: string;
  className?: string;
  targetRef: RefObject<HTMLElement | null>;
  offsetX?: number;
  offsetY?: number;
};

type Position = {
  x: number;
  y: number;
};

export const PartOfSpeech = ({ children, color = 'primary', className, targetRef, offsetY = 0, offsetX = 10 }: PartOfSpeechProps) => {
  const [position, setPosition] = useState<Position | null>(null);

  const updatePosition = () => {
    if (targetRef.current) {
      const { top, right } = targetRef.current.getBoundingClientRect();
      setPosition({ x: right + offsetX + window.scrollX, y: top + offsetY + window.scrollY });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetRef]);

  if (!position) return null;

  return (
    <p
      style={{
        top: `${position?.y}px`,
        left: `${position?.x}px`,
      }}
      className={`absolute py-1 px-2 font-anonymous-pro font-bold text-xl text-${color}-foreground border-[3px] border-black rounded-xl bg-${color} ${className}`}
    >
      {children}
    </p>
  );
};
