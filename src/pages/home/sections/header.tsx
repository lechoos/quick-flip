import { Navigation } from '@/components/ui/Navigation';

export const Header = () => (
  <header className="relative grid place-items-center p-3 w-full min-h-[500px] font-bold bg-primary text-primary-foreground">
    <Navigation />
    <h1 className="-mt-2 text-4xl sm:text-5xl text-center">QuickFlip: Accelerate Your Learning!</h1>
    <section className="absolute bottom-0 p-2 w-full bg-secondary border-[5px] border-black">
      <h2 className="text-2xl text-center">Project still in development</h2>
    </section>
  </header>
);
