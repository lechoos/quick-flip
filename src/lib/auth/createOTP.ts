import { hash } from 'bcryptjs';

export const createOTP = async () => {
  const digits = Array.from({ length: 6 }).map(() => Math.round(Math.random() * 9));

  const otp = digits.reduce((curr, acc) => String(curr) + String(acc), '');
  const hashedOTP = await hash(otp, 12);

  return { otp, hashedOTP };
};
