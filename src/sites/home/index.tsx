import { Header } from './sections/header';
import { Link } from '@/components/atoms/link';
import { Section } from './sections/section';
import { Footer } from '@/sites/home/sections/footer';

export const Home = () => {
  return (
    <>
      <Header />
      <Section
        variant="destructive"
        title="About the project"
      >
        <p>QuickFlip is a modern language learning application designed to make vocabulary acquisition more efficient and engaging. The core concept revolves around customizable flashcard sets that adapt to your learning pace.</p>
        <p>The platform will ultimately feature multiple learning modes including classic flashcard review, reverse card testing, and writing practice. I&apos;ll implement spaced repetition technology to optimize memory retention and personalize the learning experience. Users will be able to track their progress over time and share their curated flashcard sets with the community.</p>
        <p>I&apos;ve adopted a strategic phased development approach, starting with robust authentication and core flashcard functionality before expanding to include social features and more advanced learning tools in later stages.</p>
      </Section>
      <Section
        title="Implemented Features"
        isList
        border
      >
        <li>Authentication system with secure credential register and login</li>
        <li>Core flashcard interface with basic card viewing and testing functionality</li>
        <li>Custom UI components built with a neobrutalist design approach</li>
        <li>Responsive layout for all device sizes</li>
        <li>ElevenLabs AI integration for pronouncing phrases from flashcards</li>
      </Section>
      <Section
        title="Planned Development"
        variant="secondary"
        isList
      >
        <li>Implementation of multiple learning modes (classic, reverse, writing practice)</li>
        <li>Spaced repetition algorithm to optimize retention</li>
        <li>User progress tracking and statistics dashboard</li>
        <li>Public flashcard sets discovery and sharing</li>
        <li>Custom category creation for flashcards beyond language learning (math, science, history, etc.)</li>
        <li>AI integration for intelligent flashcard creation</li>
      </Section>
      <Section
        variant="destructive"
        title="Try QuickFlip!"
        border
      >
        <p>
          You can already learn and test your skills. Try it out now! <br />
          <Link
            className="underline"
            href={'/demo'}
          >
            Learn and test!
          </Link>
        </p>
      </Section>
      <Footer />
    </>
  );
};
