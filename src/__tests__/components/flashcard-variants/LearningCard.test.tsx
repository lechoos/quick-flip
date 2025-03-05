import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LearningCard } from '@/components/flashcards-variants/LearningCard';
import type { Flashcard } from '@/types/Flashcard';
import { renderCard, commonTests } from '@/__tests__/helpers/cardTestHelpers';

type TestProps = Pick<Flashcard, 'partOfSpeech' | 'variant'> & { isLearning?: boolean };

const renderElement = (props?: TestProps) => renderCard(LearningCard, props);

describe('LearningCard', () => {
  commonTests(renderElement);

  it('renders in learning mode if isLearning prop is true', async () => {
    render(renderElement({ isLearning: true }));
    expect(screen.getByTestId('arrows-icon')).toBeVisible();
  });

  it('behaves properly on hover event', async () => {
    render(renderElement({ isLearning: true }));

    const user = userEvent.setup();

    const element = screen.getByTestId('arrows-icon');

    await user.hover(element);
    expect(screen.getByText('test-back')).toBeVisible();
  });
});
