'use client';

import { AxiosError } from 'axios';
import { useState } from 'react';
import { signInUser } from '@/lib/actions';
import type { FormField } from '@/types/FormField';
import { AuthForm } from '@/components/AuthForm';
import { registerSchema, RegisterSchemaType } from '@/lib/formSchemas';
import { api } from '@/lib/axios';
// import { Alert } from '@/components/Alert';

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

      await api.post('/auth/register', data);

      // console.log('Before login - checking session:');
      // const sessionBefore = await getSession();
      // console.log('Session before:', sessionBefore);

      await signInUser({
        email: data.email,
        password: data.password,
      });

      // console.log('After login - checking session:');
      // const sessionAfter = await getSession();
      // console.log('Session after:', sessionAfter);
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
