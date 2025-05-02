import prisma from '../prisma';

export const saveVerificationToken = async (identifier: string, token: string) => {
  const tokenRecord = await prisma.verificationToken.findFirst({
    where: {
      identifier,
    },
  });

  if (tokenRecord) {
    return { success: false, message: 'Token already exists' };
  }

  await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires: new Date(Date.now() + 5 * 60 * 1000),
    },
  });
};
