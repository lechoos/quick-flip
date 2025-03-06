import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultCard } from '@/components/flashcards-variants/DefaultCard';
import type { Flashcard } from '@/types/Flashcard';
import { renderCard, commonTests } from '@/__tests__/helpers/cardTestHelpers';

type TestProps = Pick<Flashcard, 'partOfSpeech' | 'variant'> & { example?: string };

const renderElement = (props?: TestProps) => renderCard(DefaultCard, props);

describe('Default Card', () => {
  commonTests(renderElement);

  it('renders a help icon when PartOfSpeech prop is provided', () => {
    render(renderElement({ partOfSpeech: 'noun' }));

    expect(screen.getByTestId('help-badge')).toBeInTheDocument();
  });

  it('PartOfSpeech component reacts properly to hover event on help-badge', async () => {
    render(renderElement({ partOfSpeech: 'noun' }));

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
