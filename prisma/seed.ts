import { PrismaClient } from '@prisma/client';
import type { Flashcard } from '@/types/Flashcard';

type FlashcardContainer = {
  [key: string]: Flashcard[];
};

const prisma = new PrismaClient();

const categories = [
  { name: 'Greetings', slug: 'greetings' },
  { name: 'Numbers', slug: 'numbers' },
  { name: 'Colors', slug: 'colors' },
  { name: 'Family', slug: 'family' },
  { name: 'Food', slug: 'food' },
  { name: 'Common Verbs', slug: 'common-verbs' },
  { name: 'Time', slug: 'time' },
  { name: 'Places', slug: 'places' },
  { name: 'Weather', slug: 'weather' },
  { name: 'Travel', slug: 'travel' },
];

const flashcards: FlashcardContainer = {
  greetings: [
    { front: 'hello', back: 'hola' },
    { front: 'good morning', back: 'buenos días' },
    { front: 'good afternoon', back: 'buenas tardes' },
    { front: 'good night', back: 'buenas noches' },
    { front: 'goodbye', back: 'adiós' },
    { front: 'see you later', back: 'hasta luego' },
    { front: 'how are you?', back: '¿cómo estás?' },
    { front: 'nice to meet you', back: 'mucho gusto' },
  ],
  numbers: [
    { front: 'one', back: 'uno', partOfSpeech: 'numeral' },
    { front: 'two', back: 'dos', partOfSpeech: 'numeral' },
    { front: 'three', back: 'tres', partOfSpeech: 'numeral' },
    { front: 'four', back: 'cuatro', partOfSpeech: 'numeral' },
    { front: 'five', back: 'cinco', partOfSpeech: 'numeral' },
    { front: 'six', back: 'seis', partOfSpeech: 'numeral' },
    { front: 'seven', back: 'siete', partOfSpeech: 'numeral' },
    { front: 'eight', back: 'ocho', partOfSpeech: 'numeral' },
    { front: 'nine', back: 'nueve', partOfSpeech: 'numeral' },
    { front: 'ten', back: 'diez', partOfSpeech: 'numeral' },
  ],
  colors: [
    { front: 'red', back: 'rojo/roja', partOfSpeech: 'adjective' },
    { front: 'blue', back: 'azul', partOfSpeech: 'adjective' },
    { front: 'green', back: 'verde', partOfSpeech: 'adjective' },
    { front: 'yellow', back: 'amarillo/amarilla', partOfSpeech: 'adjective' },
    { front: 'black', back: 'negro/negra', partOfSpeech: 'adjective' },
    { front: 'white', back: 'blanco/blanca', partOfSpeech: 'adjective' },
    { front: 'orange', back: 'naranja', partOfSpeech: 'adjective' },
    { front: 'purple', back: 'morado/morada', partOfSpeech: 'adjective' },
  ],
  family: [
    { front: 'mother', back: 'la madre', partOfSpeech: 'noun' },
    { front: 'father', back: 'el padre', partOfSpeech: 'noun' },
    { front: 'brother', back: 'el hermano', partOfSpeech: 'noun' },
    { front: 'sister', back: 'la hermana', partOfSpeech: 'noun' },
    { front: 'son', back: 'el hijo', partOfSpeech: 'noun' },
    { front: 'daughter', back: 'la hija', partOfSpeech: 'noun' },
    { front: 'husband', back: 'el esposo', partOfSpeech: 'noun' },
    { front: 'wife', back: 'la esposa', partOfSpeech: 'noun' },
    { front: 'grandfather', back: 'el abuelo', partOfSpeech: 'noun' },
    { front: 'grandmother', back: 'la abuela', partOfSpeech: 'noun' },
  ],
  food: [
    { front: 'bread', back: 'el pan', partOfSpeech: 'noun' },
    { front: 'water', back: 'el agua', partOfSpeech: 'noun' },
    { front: 'apple', back: 'la manzana', partOfSpeech: 'noun' },
    { front: 'banana', back: 'el plátano', partOfSpeech: 'noun' },
    { front: 'milk', back: 'la leche', partOfSpeech: 'noun' },
    { front: 'coffee', back: 'el café', partOfSpeech: 'noun' },
    { front: 'rice', back: 'el arroz', partOfSpeech: 'noun' },
    { front: 'chicken', back: 'el pollo', partOfSpeech: 'noun' },
    { front: 'meat', back: 'la carne', partOfSpeech: 'noun' },
    { front: 'fish', back: 'el pescado', partOfSpeech: 'noun' },
  ],
  'common-verbs': [
    { front: 'to be', back: 'ser/estar', partOfSpeech: 'verb' },
    { front: 'to have', back: 'tener', partOfSpeech: 'verb' },
    { front: 'to do/make', back: 'hacer', partOfSpeech: 'verb' },
    { front: 'to go', back: 'ir', partOfSpeech: 'verb' },
    { front: 'to want', back: 'querer', partOfSpeech: 'verb' },
    { front: 'to eat', back: 'comer', partOfSpeech: 'verb' },
    { front: 'to drink', back: 'beber', partOfSpeech: 'verb' },
    { front: 'to speak/talk', back: 'hablar', partOfSpeech: 'verb' },
    { front: 'to know', back: 'saber/conocer', partOfSpeech: 'verb' },
    { front: 'to live', back: 'vivir', partOfSpeech: 'verb' },
  ],
  time: [
    { front: 'today', back: 'hoy', partOfSpeech: 'adverb' },
    { front: 'tomorrow', back: 'mañana', partOfSpeech: 'adverb' },
    { front: 'yesterday', back: 'ayer', partOfSpeech: 'adverb' },
    { front: 'now', back: 'ahora', partOfSpeech: 'adverb' },
    { front: 'later', back: 'más tarde', partOfSpeech: 'adverb' },
    { front: 'morning', back: 'la mañana', partOfSpeech: 'noun' },
    { front: 'afternoon', back: 'la tarde', partOfSpeech: 'noun' },
    { front: 'night', back: 'la noche', partOfSpeech: 'noun' },
  ],
  places: [
    { front: 'house', back: 'la casa', partOfSpeech: 'noun' },
    { front: 'restaurant', back: 'el restaurante', partOfSpeech: 'noun' },
    { front: 'school', back: 'la escuela', partOfSpeech: 'noun' },
    { front: 'hospital', back: 'el hospital', partOfSpeech: 'noun' },
    { front: 'store/shop', back: 'la tienda', partOfSpeech: 'noun' },
    { front: 'airport', back: 'el aeropuerto', partOfSpeech: 'noun' },
    { front: 'beach', back: 'la playa', partOfSpeech: 'noun' },
    { front: 'bank', back: 'el banco', partOfSpeech: 'noun' },
  ],
  weather: [
    { front: 'sun', back: 'el sol', partOfSpeech: 'noun' },
    { front: 'rain', back: 'la lluvia', partOfSpeech: 'noun' },
    { front: 'snow', back: 'la nieve', partOfSpeech: 'noun' },
    { front: 'wind', back: 'el viento', partOfSpeech: 'noun' },
    { front: 'hot', back: 'caliente', partOfSpeech: 'adjective' },
    { front: 'cold', back: 'frío/fría', partOfSpeech: 'adjective' },
    { front: 'sunny', back: 'soleado/soleada', partOfSpeech: 'adjective' },
    { front: 'cloudy', back: 'nublado/nublada', partOfSpeech: 'adjective' },
  ],
  travel: [
    { front: 'ticket', back: 'el boleto', partOfSpeech: 'noun' },
    { front: 'passport', back: 'el pasaporte', partOfSpeech: 'noun' },
    { front: 'hotel', back: 'el hotel', partOfSpeech: 'noun' },
    { front: 'suitcase', back: 'la maleta', partOfSpeech: 'noun' },
    { front: 'train', back: 'el tren', partOfSpeech: 'noun' },
    { front: 'bus', back: 'el autobús', partOfSpeech: 'noun' },
    { front: 'airplane', back: 'el avión', partOfSpeech: 'noun' },
    { front: 'map', back: 'el mapa', partOfSpeech: 'noun' },
  ],
};

async function main() {
  await prisma.flashcardCategory.deleteMany();
  await prisma.flashcard.deleteMany();

  for (const category of categories) {
    const createdCategory = await prisma.flashcardCategory.create({
      data: category,
    });

    const categoryFlashcards = flashcards[category.slug];

    if (categoryFlashcards) {
      for (const flashcard of categoryFlashcards) {
        await prisma.flashcard.create({
          data: {
            ...flashcard,
            categoryId: createdCategory.id,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error('There was an error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seed completed');
    await prisma.$disconnect();
  });
