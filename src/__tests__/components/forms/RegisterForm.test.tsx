import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '@/components/forms/RegisterForm';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
});
