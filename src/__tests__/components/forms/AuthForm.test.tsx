import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthForm } from '@/components/forms/AuthForm';
import { z } from 'zod';
import type { FormField } from '@/types/FormField';

describe('AuthForm', () => {
  const mockSchema = z.object({
    username: z.string().min(3, 'Username has to be at least 3 characters long'),
    password: z.string().min(6, 'Password has to be at least 6 characters long'),
  });

  const mockFields: FormField<typeof mockSchema>[] = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'johndoe',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '********',
    },
  ];

  const mockSubmitAction = jest.fn();

  beforeEach(() => {
    render(
      <AuthForm
        fields={mockFields}
        validationSchema={mockSchema}
        onSubmitAction={mockSubmitAction}
        submitText="Login"
      />,
    );
  });

  it('renders correctly', () => {
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows/hides password', async () => {
    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByTestId('toggle-password');

    expect(passwordInput).toHaveAttribute('type', 'password');
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('shows validation errors', async () => {
    const submitButton = screen.getByRole('button', { name: /login/i });
    await userEvent.click(submitButton);

    expect(screen.getByText('Username has to be at least 3 characters long')).toBeInTheDocument();
    expect(screen.getByText('Password has to be at least 6 characters long')).toBeInTheDocument();
  });

  it('shows loading state', async () => {
    render(
      <AuthForm
        fields={mockFields}
        validationSchema={mockSchema}
        onSubmitAction={mockSubmitAction}
        submitText="Login"
        isLoading
      />,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays server error when provided', async () => {
    render(
      <AuthForm
        fields={mockFields}
        validationSchema={mockSchema}
        onSubmitAction={mockSubmitAction}
        submitText="Login"
        serverError="Server responded with code 500"
      />,
    );

    expect(screen.getByText('Server responded with code 500')).toBeInTheDocument();
  });
});
