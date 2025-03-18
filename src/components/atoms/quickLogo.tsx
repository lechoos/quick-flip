import Image from 'next/image';

type Props = {
  size?: number;
  className?: string;
};

export const QuickLogo = ({ size, className }: Props) => {
  return (
    <Image
      src="/quick-logo.svg"
      alt="QuickFlip Logo"
      width={size ?? 50}
      height={size ?? 50}
      className={`hover:rotate-180 transition-transform duration-700 ${className}`}
    />
  );
};
