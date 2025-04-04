import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}
