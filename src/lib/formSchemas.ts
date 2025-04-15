import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
});

export type LoginSchemaType = typeof loginSchema;

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long').regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[0-9]/, 'Password must contain at least one number'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and dashes'),
});

export type RegisterSchemaType = typeof registerSchema;

export const updateProfileSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  password: z
    .preprocess(
      (val) => {
        if (typeof val !== 'string' || val.trim() === '') return undefined;
        return val;
      },
      z.string().min(8, 'Password must be at least 8 characters long').regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[0-9]/, 'Password must contain at least one number'),
    )
    .optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only' + ' contain letters, numbers, underscores and dashes')
    .optional(),
});

export type UpdateProfileSchemaType = typeof updateProfileSchema;
