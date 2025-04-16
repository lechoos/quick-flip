import { AuthLayout } from '@/layouts/AuthLayout';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth();

  if (session) redirect('/profile');

  return (
    <>
      <AuthLayout title="Register">
        <RegisterForm />
      </AuthLayout>
    </>
  );
}
