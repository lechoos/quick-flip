import { compare } from 'bcryptjs';

type Token = {
  identifier: string;
  token: string;
  expires: Date;
};

export const checkToken = async (token: Token, otp: string) => {
  if (token.expires < new Date(Date.now())) {
    return { success: false, message: 'Token expired' };
  }

  const isValid = await compare(otp, token.token);

  if (!isValid) {
    return { success: false, message: 'Token is invalid' };
  }

  return { success: true, message: 'Token verified' };
};
