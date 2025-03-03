'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { FormField } from '@/types/FormField';
import { AuthForm } from '@/components/forms/AuthForm';
import { loginSchema, LoginSchemaType } from '@/lib/formSchemas';

const loginFields: FormField<LoginSchemaType>[] = [
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

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitAction = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        switch (response.error) {
          case 'CredentialsSignin':
            setError('Invalid credentials');
            break;
          case 'AccessDenied':
            setError('Access denied');
            break;
          default:
            setError('An unknown error occurred. Try again later');
        }
      } else if (response?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (ex: any) {
      const errorMessage = ex?.response?.data?.error || 'Login failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      fields={loginFields}
      onSubmitAction={submitAction}
      submitText="Login"
      validationSchema={loginSchema}
      serverError={error!}
      isLoading={loading}
    />
  );
};
