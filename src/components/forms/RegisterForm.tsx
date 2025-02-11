'use client';

import { useRouter } from 'next/navigation';
import type { FormField } from '@/types/FormField';
import { AuthForm } from '@/components/AuthForm';
import { registerSchema, RegisterSchemaType } from '@/lib/formSchemas';
import { checkUserExist, createUser } from '@/lib/auth.helpers';

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
  const router = useRouter();

  const submitAction = async (data: { username: string; email: string; password: string }) => {
    const userExists = await checkUserExist(data.email);

    if (userExists) {
      alert('User already exists');
      return;
    }

    await createUser(data);
    router.push('/');
  };

  return (
    <AuthForm
      fields={registerFields}
      onSubmitAction={submitAction}
      submitText="Register"
      validationSchema={registerSchema}
    />
  );
};
