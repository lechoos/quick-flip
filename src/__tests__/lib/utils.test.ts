import { cn, capitalize, checkAnswer } from '@/lib/utils';

describe('Function cn', () => {
  it('should combine regular CSS class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should ignore falsy values', () => {
    expect(cn('foo', false, 'bar', null)).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    expect(cn('button', isActive && 'active')).toBe('button active');
  });

  it('should merge Tailwind classes without conflicts', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('border border-black', 'border-[3px]')).toBe('border-black border-[3px]');
  });
});

describe('Capitalize function', () => {
  it("should make a word's first letter uppercase", () => {
    expect(capitalize('foo')).toBe('Foo');
    expect(capitalize('Bar')).toBe('Bar');
  });
});

describe('checkAnswer function', () => {
  // Existing tests
  it('should stop checking if userAnswer is empty', () => {
    expect(checkAnswer('', 'correct')).toBe(false);
  });

  it('should return true when userAnswer exactly matches correctAnswer', () => {
    expect(checkAnswer('correct', 'correct')).toBe(true);
  });

  it('should stop checking if userAnswer is shorter than 3 characters', () => {
    expect(checkAnswer('ab', 'ac')).toBe(false);
  });

  // Tests for the 60% substring matching rule
  it('should return true when user answer is included in correct answer and meets 60% length requirement', () => {
    expect(checkAnswer('quickb', 'quickbrown')).toBe(true);
  });

  it('should return false when user answer is included but shorter than 60% of correct answer', () => {
    expect(checkAnswer('quick', 'quickbrown')).toBe(false);
    expect(checkAnswer('fox', 'the fast red fox')).toBe(false);
  });

  // Tests for case insensitivity and whitespace handling
  it('should handle case insensitivity correctly', () => {
    expect(checkAnswer('CORRECT', 'correct')).toBe(true);
    expect(checkAnswer('THE QUICK', 'The quick brown fox')).toBe(false); // Not meeting 60% rule
  });

  it('should handle extra whitespace in answers', () => {
    expect(checkAnswer('  correct  ', 'correct')).toBe(true);
  });

  it('should reject single words that are too short for the 75% rule', () => {
    // In "brown" (5 chars), 75% = 3.75 -> 4 chars needed, "bro" is only 3
    expect(checkAnswer('bro', 'the quick brown fox')).toBe(false);
  });

  // Edge cases
  it('should handle boundary conditions for percentage calculations', () => {
    // Test with a 10 character answer, 60% = 6 characters
    expect(checkAnswer('quickb', 'quickbrown')).toBe(true);
    expect(checkAnswer('quick', 'quickbrown')).toBe(false);
  });
});
