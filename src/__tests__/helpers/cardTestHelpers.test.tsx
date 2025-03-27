import { render, screen } from '@testing-library/react';
import type { Flashcard } from '@/types/Flashcard';
import { FC, ReactNode } from 'react';

export const renderCard = <T extends Flashcard>(Component: FC<T>, props?: Partial<T>) => {
  const defaultProps = {
    front: 'test',
    back: 'test-back',
  } as T;

  return (
    <Component
      {...defaultProps}
      {...props}
    />
  );
};

export const commonTests = (renderElement: (props?: any) => ReactNode) => {
  it('renders correctly', () => {
    render(renderElement());
    expect(screen.getByTestId('flashcard-container-primary')).toBeInTheDocument();
  });

  it('uses correct variants', () => {
    const { rerender } = render(renderElement());
    expect(screen.getByTestId('flashcard-container-primary')).toHaveClass('bg-primary');

    rerender(renderElement({ variant: 'secondary' }));
    expect(screen.getByTestId('flashcard-container-secondary')).toHaveClass('bg-secondary');

    rerender(renderElement({ variant: 'accent' }));
    expect(screen.getByTestId('flashcard-container-accent')).toHaveClass('bg-accent');

    rerender(renderElement({ variant: 'destructive' }));
    expect(screen.getByTestId('flashcard-container-destructive')).toHaveClass('bg-destructive');
  });
};
