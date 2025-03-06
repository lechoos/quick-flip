import { render, screen, fireEvent, act } from '@testing-library/react';
import { Alert } from '@/components/ui/Alert';

describe('Alert', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders message correctly', () => {
    render(<Alert message="Test alert message" />);
    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('applies correct styles for different variants', () => {
    const alert = (variant: 'success' | 'error' | 'warning' | 'info') => (
      <Alert
        message="Test"
        variant={variant}
      />
    );

    const { rerender } = render(alert('error'));
    expect(screen.getByRole('alert')).toHaveClass('bg-destructive');

    rerender(alert('success'));
    expect(screen.getByRole('alert')).toHaveClass('bg-accent');

    rerender(alert('warning'));
    expect(screen.getByRole('alert')).toHaveClass('bg-secondary');

    rerender(alert('info'));
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100');
  });

  it('call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Alert
        message="Test"
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /close alert/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('hides after duration time', () => {
    const onClose = jest.fn();
    render(
      <Alert
        message="Test"
        duration={2000}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('renders with default error variant if no variant provided', () => {
    render(<Alert message="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-destructive');
  });

  it('persists when no duration is set', () => {
    render(<Alert message="Test" />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has provided className', () => {
    render(
      <Alert
        message="Test"
        className="test-class"
      />,
    );

    expect(screen.getByRole('alert')).toHaveClass('test-class');
  });
});
