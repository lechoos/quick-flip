import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { UpdateProfileForm } from '@/components/forms/UpdateProfileForm';

jest.mock('axios', () => ({
  patch: jest.fn(),
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

const setShowForm = jest.fn();
const setIsUpdated = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const fillAndSubmitForm = async ({ username = '', email = '', password = '' }: { username?: string; email?: string; password?: string }) => {
  render(
    <UpdateProfileForm
      setShowForm={setShowForm}
      setIsUpdated={setIsUpdated}
    />,
  );

  if (username) await userEvent.type(screen.getByLabelText(/username/i), username);
  if (email) await userEvent.type(screen.getByLabelText(/email/i), email);
  if (password) await userEvent.type(screen.getByLabelText(/password/i), password);

  await userEvent.click(screen.getByRole('button', { name: /update profile/i }));
};

describe('UpdateProfileForm', () => {
  it('sends correct data to the backend', async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: { user: { username: 'newuser' } } });

    await fillAndSubmitForm({
      username: 'newuser',
      email: 'new@email.com',
      password: 'Password123',
    });

    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith('/api/auth/user/update', {
        username: 'newuser',
        email: 'new@email.com',
        password: 'Password123',
      });
      expect(setIsUpdated).toHaveBeenCalledWith(true);
      expect(setShowForm).toHaveBeenCalledWith(false);
    });
  });

  it('shows error message when API returns an error', async () => {
    mockedAxios.patch.mockRejectedValueOnce({
      response: { data: { error: 'Update failed' } },
    });

    await fillAndSubmitForm({
      username: 'user',
      email: 'user@email.com',
      password: 'Password123',
    });

    const errorMessage = await screen.findByText('Update failed');
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates invalid email format', async () => {
    await fillAndSubmitForm({
      email: 'invalid-email',
      password: 'Password123',
    });

    const error = await screen.findByText(/invalid email format/i);
    expect(error).toBeInTheDocument();
  });

  it('validates weak password', async () => {
    await fillAndSubmitForm({
      password: 'weakpass',
    });

    expect(await screen.findByText(/must contain at least one uppercase/i)).toBeInTheDocument();
  });

  it('allows partial updates (e.g. only username)', async () => {
    mockedAxios.patch.mockResolvedValueOnce({ data: { user: { username: 'partialuser' } } });

    await fillAndSubmitForm({ username: 'partialuser' });

    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith('/api/auth/user/update', {
        username: 'partialuser',
      });
      expect(setIsUpdated).toHaveBeenCalledWith(true);
    });
  });
});
