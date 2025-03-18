'use client';

import axios from 'axios';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import type { FormField } from '@/types/FormField';
import { AuthForm } from '@/components/forms/AuthForm';
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

      const response = await axios.post('/api/auth/register', data);

      if (response.data.user) {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: true,
          redirectTo: '/flashcards',
        });

        if (result?.error) {
          setError('Registration successful but login failed. Try to login with your credentials on the login page.');
        }
      }
    } catch (ex: any) {
      const errorMessage = ex?.response?.data?.error || 'Registration failed';
      setError(errorMessage);
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
