'use client';

import { useState, useTransition } from 'react';
import axios, { type AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import type { FormField } from '@/types/FormField';
import { updateProfileSchema, type UpdateProfileSchemaType } from '@/lib/formSchemas';
import { AuthForm } from '@/components/forms/AuthForm';
import { Alert } from '@/components/ui/Alert';

const updateProfileFields: FormField<UpdateProfileSchemaType>[] = [
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

export const UpdateProfileForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPending, startTransition] = useTransition();

  const submitAction = async (data: { username?: string; email?: string; password?: string }) => {
    try {
      setIsUpdated(false);
      setLoading(true);
      setError(null);

      const response = await axios.patch('/api/auth/user/update', data);

      if (response.data.user) {
        startTransition(() => {
          router.refresh();
          setIsUpdated(true);
        });
      }
    } catch (ex) {
      const axiosError = ex as AxiosError<{ error: string }>;
      const errorMessage = axiosError?.response?.data?.error || 'Updating profile failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isUpdated && (
        <Alert
          message="Profile updated successfully"
          variant="success"
          duration={5000}
        />
      )}
      <AuthForm
        fields={updateProfileFields}
        onSubmitAction={submitAction}
        submitText="Update Profile"
        validationSchema={updateProfileSchema}
        serverError={error!}
        isLoading={loading || isPending}
      />
    </>
  );
};
