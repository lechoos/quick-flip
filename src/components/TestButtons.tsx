import { Button } from '@/components/ui/button';

export const TestButtons = () => (
  <div className="p-4 space-4">
    <div className="space-x-4">
      <Button variant="default">Primary Button</Button>
      <Button variant="destructive">Destructive Button</Button>
    </div>
    <div className="space-x-4 relative top-20">
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="accent">Accent Button</Button>
      <Button variant="muted">Muted Button</Button>
    </div>
  </div>
);
