'use client';

import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import type { FormField } from '@/types/FormField';
import { AuthForm } from '@/components/AuthForm';
import { registerSchema, RegisterSchemaType } from '@/lib/formSchemas';

const registerFields: FormField<RegisterSchemaType>[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'johndoe',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
];

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitAction = async (data: { username: string; email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError(null);

      await axios.post('/api/auth/register', data);
    } catch (ex) {
      if (ex instanceof AxiosError) {
        setError(ex.response?.data?.error || 'Registration failed');
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      fields={registerFields}
      onSubmitAction={submitAction}
      submitText="Register"
      validationSchema={registerSchema}
      isLoading={isLoading}
      serverError={error as string}
    />
  );
};
