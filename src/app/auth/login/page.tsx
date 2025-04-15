import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginForm } from '@/components/forms/LoginForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session) redirect('/profile');

  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}
