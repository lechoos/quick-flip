import { saveVerificationToken } from '@/lib/auth/saveVerificationToken';
import { prismaMock } from '@/__mocks__/prisma';

describe('saving a token to db', () => {
  const fakeToken = {
    identifier: 'hashed_email',
    token: 'hashed_token',
  };

  beforeEach(() => {
    jest.resetAllMocks();

    prismaMock.verificationToken.findFirst.mockReset();
    prismaMock.verificationToken.create.mockReset();

    jest.spyOn(Date, 'now');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should not create token if one already exists', async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue({
      identifier: 'hashed_email',
      token: 'existing_hashed_token',
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });

    const res = await saveVerificationToken(fakeToken.identifier, fakeToken.token);

    expect(res).toEqual({ success: false, message: 'Token already exists' });
    expect(prismaMock.verificationToken.create).not.toHaveBeenCalled();
  });

  it('should create token if one does not exist', async () => {
    prismaMock.verificationToken.findFirst.mockResolvedValue(null);

    const now = 1610000000000;
    const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(now);

    await saveVerificationToken(fakeToken.identifier, fakeToken.token);

    expect(prismaMock.verificationToken.create).toHaveBeenCalledWith({
      data: {
        identifier: fakeToken.identifier,
        token: fakeToken.token,
        expires: new Date(now + 5 * 60 * 1000),
      },
    });

    dateSpy.mockRestore();
  });
});
