'use client';

import { ReactNode, useState } from 'react';

const FooterLink = ({ children, link }: { children: ReactNode; link: string }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className="underline uppercase"
    href={link}
  >
    {children}
  </a>
);

export const Footer = () => {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="flex flex-col justify-center items-center gap-1 p-4 bg-primary text-primary-foreground">
      <h2>QUICKFLIP &copy; {year}</h2>
      <p className="text-xl">
        Source code: <FooterLink link="https://github.com/lechoos/quick-flip">Github Repo</FooterLink>
      </p>
      <div className="flex flex-col justify-center items-center mt-3 gap-y-1 text-base">
        <p>
          Created by <FooterLink link="https://github.com/lechoos">Piotr Lechowicz</FooterLink>
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
