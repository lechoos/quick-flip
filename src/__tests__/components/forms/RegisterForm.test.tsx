import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '@/components/forms/RegisterForm';
import axios from 'axios';
import { signIn } from 'next-auth/react';

jest.mock('axios', () => ({
  post: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

const mockedSignIn = signIn as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

const renderRegisterForm = async () => {
  render(<RegisterForm />);

  await userEvent.type(screen.getByLabelText('Username'), 'testuser');
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'Password123');

  await userEvent.click(screen.getByRole('button', { name: /register/i }));
};

describe('RegisterForm', () => {
  it('sends correct data to the backend', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    await renderRegisterForm();

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
      });
    });
  });

  it('shows an error message if the backend returns an error', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'User already exists' } },
    });

    await renderRegisterForm();

    const errorMessage = await screen.findByText('User already exists');
    expect(errorMessage).toBeInTheDocument();
  });

  it('attempts to auto-login after successful registration', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        user: {
          email: 'test@example.com',
        },
      },
    });

    await renderRegisterForm();

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'Password123',
        redirect: true,
        redirectTo: '/',
      });
    });
  });

  it('shows an error message if the auto-login fails', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        user: {
          email: 'test@example.com',
        },
      },
    });

    mockedSignIn.mockResolvedValueOnce({ error: 'Authenticaton failed' });

    await renderRegisterForm();

    const errorMessage = await screen.findByText(/Registration successful but login failed/);
    expect(errorMessage).toBeInTheDocument();
  });

  it('does not attempt to auto-login if the registration fails', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'Registration failed' } },
    });

    await renderRegisterForm();

    expect(mockedSignIn).not.toHaveBeenCalled();
  });
});
