import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultCard } from '@/components/flashcards-variants/DefaultCard';
import type { Flashcard } from '@/types/Flashcard';

type TestProps = Pick<Flashcard, 'partOfSpeech' | 'variant'> & { example?: string };

const renderElement = (props?: TestProps) => (
  <DefaultCard
    front="test"
    back="test-back"
    {...props}
  />
);

describe('Default Card', () => {
  beforeEach(() => {
    render(renderElement());
  });

  it('renders correctly', () => {
    expect(screen.getByTestId('flashcard-container-primary')).toBeInTheDocument();
  });

  it('uses correct variants', () => {
    expect(screen.getByTestId('flashcard-container-primary')).toHaveClass('bg-primary');

    const { rerender } = render(renderElement({ variant: 'secondary' }));
    expect(screen.getByTestId('flashcard-container-secondary')).toHaveClass('bg-secondary');

    rerender(renderElement({ variant: 'accent' }));
    expect(screen.getByTestId('flashcard-container-accent')).toHaveClass('bg-accent');

    rerender(renderElement({ variant: 'destructive' }));
    expect(screen.getByTestId('flashcard-container-destructive')).toHaveClass('bg-destructive');
  });

  it('renders a help icon when PartOfSpeech prop is provided', () => {
    render(
      <DefaultCard
        front="test"
        back="test-back"
        partOfSpeech="noun"
      />,
    );

    expect(screen.getByTestId('help-badge')).toBeInTheDocument();
  });

  it('PartOfSpeech component reacts properly to hover event on help-badge', async () => {
    render(
      <DefaultCard
        front="test"
        back="test-back"
        partOfSpeech="noun"
      />,
    );

    const user = userEvent.setup();

    const element = screen.getByTestId('help-badge');

    await user.hover(element);

    expect(screen.getByText('noun')).toBeVisible();
  });

  it('renders an example sentence', () => {
    render(renderElement({ example: 'Test sentence' }));
    expect(screen.getByText('Test sentence')).toBeInTheDocument();
  });
});
