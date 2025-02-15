import { z } from 'zod';
import { registerSchema } from '@/lib/formSchemas';

export type User = z.infer<typeof registerSchema>;
export type PartialUser = Omit<User, 'username'>;
