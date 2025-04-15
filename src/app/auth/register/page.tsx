import { AuthLayout } from '@/layouts/AuthLayout';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { Link } from '@/components/atoms/link';
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
      <p>
        Already have an account? <Link href="/auth/login">Login instead</Link>
      </p>
    </>
  );
}
