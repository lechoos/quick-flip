describe('OTP generating', () => {
  beforeAll(() => {
    jest.resetModules();
    jest.unmock('bcryptjs');
  });

  it('should return a 6-digit otp and its hash', async () => {
    const { createOTP } = await import('@/lib/auth/createOTP');
    const { compare } = await import('bcryptjs');

    const { otp, hashedOTP } = await createOTP();

    expect(otp).toHaveLength(6);
    expect(/^\d{6}$/.test(otp)).toBe(true);
    expect(await compare(otp, hashedOTP)).toBe(true);
  });
});
