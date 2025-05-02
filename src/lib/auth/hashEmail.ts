import crypto from 'crypto';

export const hashEmail = async (email: string) => crypto.createHash('sha256').update(email).digest('hex');
