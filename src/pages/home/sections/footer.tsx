'use client';

import { useState } from 'react';

export const Footer = () => {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="flex flex-col justify-center items-center gap-1 p-4 bg-primary text-primary-foreground">
      <h2>QUICKFLIP &copy; {year}</h2>
      <p className="text-xl">Source code: to be added later...</p>
      <div className="flex flex-col justify-center items-center mt-3 gap-y-1 text-base">
        <p>
          Created by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline uppercase"
            href="https://github.com/lechoos"
          >
            Piotr Lechowicz
          </a>
        </p>
        <p>
          Powered by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline uppercase"
            href="https://lotusite.pl"
          >
            Lotusite
          </a>
        </p>
      </div>
    </footer>
  );
};
