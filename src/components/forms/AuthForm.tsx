'use client';

import { useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { FormField } from '@/types/FormField';
import { Alert } from '@/components/ui/Alert';

type Props<T extends z.ZodType> = {
  fields: FormField<T>[];
  validationSchema: T;
  onSubmitAction: (data: z.infer<T>) => Promise<void>;
  submitText: string;
  isLoading?: boolean;
  serverError?: string;
};

export const AuthForm = <T extends z.ZodType>({ fields, validationSchema, onSubmitAction, submitText, isLoading = false, serverError }: Props<T>) => {
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
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmitAction)}
    >
      {serverError && (
        <Alert
          message={serverError}
          variant="error"
          duration={10000}
        />
      )}
      {fields.map((field) => (
        <div key={field.name as string}>
          <Label
            className="text-xs sm:text-sm"
            htmlFor={field.name as string}
          >
            {field.label}
          </Label>
          <div className="flex">
            <Input
              {...register(field.name as Path<z.infer<T>>, {
                setValueAs: (val) => (val === '' ? undefined : val),
              })}
              type={field.type === 'password' && showPasswords[field.name as string] ? 'text' : field.type}
              id={field.name as string}
              aria-invalid={errors[field.name] ? 'true' : 'false'}
              placeholder={field?.placeholder}
              className={cn('p-1 w-full text-sm' + ' sm:text-base' + ' bg-primary' + ' text-primary-foreground border-[3px] border-black shadow' + ' placeholder:text-primary-foreground/60 focus:outline-none focus:border-accent')}
            />
            {field.type === 'password' && (
              <Button
                data-testid="toggle-password"
                type="button"
                size="icon"
                className="ml-[1.3rem] sm:ml-1 !h-[46px]"
                onClick={() => togglePassword(field.name as string)}
              >
                {showPasswords[field.name as string] ? <EyeOff /> : <Eye />}
              </Button>
            )}
          </div>

          {errors[field.name] && <p className="mt-2 text-xs sm:text-sm text-red-700">{errors[field.name]?.message as string}</p>}
        </div>
      ))}
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : submitText}
      </Button>
    </form>
  );
};
