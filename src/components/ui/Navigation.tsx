'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/components/atoms/link';
import { QuickLogo } from '@/components/atoms/quickLogo';
import { AlignJustify, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { AuthProvider } from '@/providers/AuthProvider';

type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const Button = ({ isOpen, setIsOpen }: Props) => (
  <button
    onClick={setIsOpen}
    className="absolute top-0 left-0 inline-block p-2 z-50"
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button
        isOpen={isOpen}
        setIsOpen={() => setIsOpen((prev) => !prev)}
      />
      <nav className={`absolute top-8 sm:top-2 ${!isOpen ? 'right-full' : 'right-1/2 translate-x-1/2'} flex flex-col justify-between sm:block mx-1 py-[2.5rem] px-2 sm:px-4 w-[80%] max-w-[350px] font-anonymous-pro font-bold text-xl bg-secondary border-[5px] border-black shadow rounded-[60px] z-20`}>
        <Link
          className="flex justify-center"
          href="/"
        >
          <QuickLogo className="sm:absolute left-4 top-1/2 sm:-translate-y-1/2" />
        </Link>
        <div className="flex gap-x-[1.2rem] justify-center sm:justify-end sm:items-center mt-2 sm:mt-0 sm:ml-2">
          <Link href="/flashcards">Cards</Link>
          {session.status === 'authenticated' ? <Link href="/profile">Profile</Link> : <Link href="/auth/login">Sign in</Link>}
        </div>
      </nav>
    </>
  );
};

export const Navigation = () => (
  <AuthProvider>
    <Navbar />
  </AuthProvider>
);
