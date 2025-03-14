'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Link } from '@/components/atoms/link';
import { QuickLogo } from '@/components/atoms/quickLogo';
import { AlignJustify, Plus } from 'lucide-react';

const links = [
  {
    label: 'Demo',
    href: '/flashcards',
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const Button = ({ isOpen, setIsOpen }: Props) => {
  return (
    <button
      onClick={() => setIsOpen()}
      className="absolute top-0 left-0 inline-block sm:hidden p-2 z-50"
    >
      {isOpen ? (
        <Plus
          className="rotate-45"
          size={40}
        />
      ) : (
        <AlignJustify size={40} />
      )}
    </button>
  );
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (size.width > 576) {
      setIsOpen(false);
    }
  }, [size]);

  return (
    <>
      <Button
        isOpen={isOpen}
        setIsOpen={() => setIsOpen((prev) => !prev)}
      />
      <nav className={`absolute top-8 sm:top-2 ${!isOpen ? 'right-full' : 'right-1/2 translate-x-1/2'} sm:right-1/2 sm:translate-x-1/2 flex justify-between sm:block mx-1 py-[2.5rem] px-2 sm:px-4 w-[80%] max-w-[350px] font-anonymous-pro font-bold text-xl bg-secondary border-[5px] border-black shadow rounded-[60px] z-20`}>
        <Link href="/">
          <QuickLogo className="sm:absolute left-4 top-1/2 sm:-translate-y-1/2" />
        </Link>
        <div className="flex gap-x-[1.2rem] justify-end sm:items-center mt-1 sm:mt-0 sm:ml-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
