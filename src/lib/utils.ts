import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function checkAnswer(userAnswer: string, correctAnswer: string) {
  const userAnswerClean = userAnswer.trim().toLowerCase();
  const correctAnswerClean = correctAnswer.trim().toLowerCase();

  // if userAnswerClean length is 0 don't check further
  if (userAnswerClean.length === 0) return false;

  // if user's answer equals correct answer return true
  if (correctAnswerClean === userAnswerClean) return true;

  // require exact match if word is shorter than 3
  // characters
  if (userAnswerClean.length < 3) return false;

  // calculate minimum required length (60% of correct
  // answer)
  const minRequiredLength = Math.ceil(correctAnswerClean.length * 0.6);
  // if the user's answer is included in the correct
  // answer as a substring
  if (correctAnswerClean.includes(userAnswerClean)) {
    // only accept it if it meets the 60% length threshold
    return userAnswerClean.length >= minRequiredLength;
  }

  // split answers to words
  const correctWords = correctAnswerClean.split(/\s+/);
  const userWords = userAnswerClean.split(/\s+/);

  // if there's only 1 word in user's answer
  if (userWords.length === 1 && userWords[0].length >= 3) {
    // check if this word is included in some of correct
    // words and matches at least 75% of that word
    return correctWords.some((correctWord) => {
      const minLength = Math.ceil(correctWords.length * 0.75);

      return userWords[0].length >= minLength && correctWord.includes(userWords[0]);
    });
  }

  // otherwise require an exact match of at least 1 word
  return userWords.some((userWord) => correctWords.includes(userWord));
}
