'use client';

import { useState } from 'react';
import { useForm, Path } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff } from 'lucide-react';

import type { FormField } from '@/types/FormField';

type AuthFormProps<T extends z.ZodType> = {
  fields: FormField<T>[];
  validationSchema: T;
  onSubmitAction: (data: z.infer<T>) => Promise<void>;
  submitText: string;
  isLoading?: boolean;
  serverError?: string;
};

export const AuthForm = <T extends z.ZodType>({ fields, validationSchema, onSubmitAction, submitText, isLoading = false }: AuthFormProps<T>) => {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const togglePassword = (fieldName: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAction)}>
      {fields.map((field) => (
        <div key={field.name as string}>
          <Label htmlFor={field.name as string}>{field.label}</Label>
          <div>
            <Input
              {...register(field.name as Path<z.infer<T>>)}
              type={field.type === 'password' && showPasswords[field.name as string] ? 'text' : field.type}
              id={field.name as string}
              placeholder={field?.placeholder}
              className={errors[field.name] ? 'border-red-500' : ''}
            />
            {field.type === 'password' && (
              <Button
                type="button"
                size="sm"
                onClick={() => togglePassword(field.name as string)}
              >
                {showPasswords[field.name as string] ? <EyeOff className="h-1 w-1" /> : <Eye className="h-1 w-1" />}
              </Button>
            )}
          </div>

          {errors[field.name] && <p className="text-sm text-red-500">{errors[field.name]?.message as string}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : submitText}
          </Button>
        </div>
      ))}
    </form>
  );
};
