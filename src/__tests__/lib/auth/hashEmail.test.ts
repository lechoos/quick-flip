import { hashEmail } from '@/lib/auth/hashEmail';
import crypto from 'crypto';

describe('hashing email', () => {
  it('should return a SHA-256 hash of the email', async () => {
    const email = 'test@test.com';
    const expected = crypto.createHash('sha256').update(email).digest('hex');

    const result = await hashEmail(email);

    expect(result).toBe(expected);
    expect(result).toHaveLength(64);
  });
});
