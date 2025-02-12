import { z } from 'zod';

export type FormField<T extends z.ZodType> = {
  name: keyof z.infer<T>;
  label: string;
  type: string;
  placeholder?: string;
};
