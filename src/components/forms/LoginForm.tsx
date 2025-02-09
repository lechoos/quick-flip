'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { FormField } from '@/types/FormField';
import { AuthForm } from '@/components/AuthForm';
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
  const router = useRouter();

  const submitAction = async (data: { email: string; password: string }) => {
    await signIn('credentials', data);
    router.push('/');
  };

  return (
    <AuthForm
      fields={loginFields}
      onSubmitAction={submitAction}
      submitText="Login"
      validationSchema={loginSchema}
    />
  );
};
