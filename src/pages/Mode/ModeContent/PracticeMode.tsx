import { Button } from '@/components/atoms/button';
import { CircleCheckBig, Play } from 'lucide-react';

type Props = {
  slideNext: () => void;
};

export const PracticeMode = ({ slideNext }: Props) => (
  <>
    <Button
      variant="accent"
      className="aspect-square rounded-full"
    >
      <Play className="!size-[3.5rem]" />
    </Button>
    <Button
      variant="accent"
      className="aspect-square rounded-full"
      onClick={slideNext}
    >
      <CircleCheckBig className="!size-[3.5rem]" />
    </Button>
  </>
);
