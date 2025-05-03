import { checkToken } from '@/lib/auth/checkToken';
import { compare } from 'bcryptjs';

jest.mock('bcryptjs');

describe('validating token', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const token = {
    identifier: 'user@example.com',
    token: 'hashed_token',
    expires: new Date(Date.now() + 5 * 60 * 1000),
  };

  const expiredToken = {
    identifier: 'user@example.com',
    token: 'hashed_token',
    expires: new Date(Date.now() - 6 * 60 * 1000),
  };

  const otp = '123456';

  it('should fail when token has expired', async () => {
    const result = await checkToken(expiredToken, otp);

    expect(result).toEqual({ success: false, message: 'Token expired' });
    expect(compare).not.toHaveBeenCalled();
  });

  it('should fail when token is invalid', async () => {
    (compare as jest.Mock).mockResolvedValueOnce(false);

    const result = await checkToken(token, otp);

    expect(result).toEqual({ success: false, message: 'Token is invalid' });
    expect(compare).toHaveBeenCalledWith(otp, token.token);
    expect(compare).toHaveBeenCalledTimes(1);
  });

  it('should validate token', async () => {
    (compare as jest.Mock).mockResolvedValueOnce(true);

    const result = await checkToken(token, otp);

    expect(result).toEqual({ success: true, message: 'Token verified' });
    expect(compare).toHaveBeenCalledWith(otp, token.token);
    expect(compare).toHaveBeenCalledTimes(1);
  });

  it('should handle errors thrown by compare function', async () => {
    const error = new Error('Error');
    (compare as jest.Mock).mockRejectedValueOnce(error);

    await expect(checkToken(token, otp)).rejects.toThrow('Error');
    expect(compare).toHaveBeenCalledWith(otp, token.token);
    expect(compare).toHaveBeenCalledTimes(1);
  });
});
