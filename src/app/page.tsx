import { Alert } from '@/components/Alert';

export default async function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Alert
        message="Hello World"
        variant="info"
      />
    </div>
  );
}
