import { AuthLayout } from '@/components/AuthLayout';
import { LoginForm } from '@/components/forms/LoginForm';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Card className="p-3 min-w-[500px] bg-secondary border-2 border-secondary-border shadow-secondary-border">
        <LoginForm />
      </Card>
    </AuthLayout>
  );
}
