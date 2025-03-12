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
    { front: 'hola', back: 'hello' },
    { front: 'buenos días', back: 'good morning' },
    { front: 'buenas tardes', back: 'good afternoon' },
    { front: 'buenas noches', back: 'good night' },
    { front: 'adiós', back: 'goodbye' },
    { front: 'hasta luego', back: 'see you later' },
    { front: '¿cómo estás?', back: 'how are you?' },
    { front: 'mucho gusto', back: 'nice to meet you' },
  ],
  numbers: [
    { front: 'uno', back: 'one', partOfSpeech: 'numeral' },
    { front: 'dos', back: 'two', partOfSpeech: 'numeral' },
    { front: 'tres', back: 'three', partOfSpeech: 'numeral' },
    { front: 'cuatro', back: 'four', partOfSpeech: 'numeral' },
    { front: 'cinco', back: 'five', partOfSpeech: 'numeral' },
    { front: 'seis', back: 'six', partOfSpeech: 'numeral' },
    { front: 'siete', back: 'seven', partOfSpeech: 'numeral' },
    { front: 'ocho', back: 'eight', partOfSpeech: 'numeral' },
    { front: 'nueve', back: 'nine', partOfSpeech: 'numeral' },
    { front: 'diez', back: 'ten', partOfSpeech: 'numeral' },
  ],
  colors: [
    { front: 'rojo/roja', back: 'red', partOfSpeech: 'adjective' },
    { front: 'azul', back: 'blue', partOfSpeech: 'adjective' },
    { front: 'verde', back: 'green', partOfSpeech: 'adjective' },
    { front: 'amarillo/amarilla', back: 'yellow', partOfSpeech: 'adjective' },
    { front: 'negro/negra', back: 'black', partOfSpeech: 'adjective' },
    { front: 'blanco/blanca', back: 'white', partOfSpeech: 'adjective' },
    { front: 'naranja', back: 'orange', partOfSpeech: 'adjective' },
    { front: 'morado/morada', back: 'purple', partOfSpeech: 'adjective' },
  ],
  family: [
    { front: 'la madre', back: 'mother', partOfSpeech: 'noun' },
    { front: 'el padre', back: 'father', partOfSpeech: 'noun' },
    { front: 'el hermano', back: 'brother', partOfSpeech: 'noun' },
    { front: 'la hermana', back: 'sister', partOfSpeech: 'noun' },
    { front: 'el hijo', back: 'son', partOfSpeech: 'noun' },
    { front: 'la hija', back: 'daughter', partOfSpeech: 'noun' },
    { front: 'el esposo', back: 'husband', partOfSpeech: 'noun' },
    { front: 'la esposa', back: 'wife', partOfSpeech: 'noun' },
    { front: 'el abuelo', back: 'grandfather', partOfSpeech: 'noun' },
    { front: 'la abuela', back: 'grandmother', partOfSpeech: 'noun' },
  ],
  food: [
    { front: 'el pan', back: 'bread', partOfSpeech: 'noun' },
    { front: 'el agua', back: 'water', partOfSpeech: 'noun' },
    { front: 'la manzana', back: 'apple', partOfSpeech: 'noun' },
    { front: 'el plátano', back: 'banana', partOfSpeech: 'noun' },
    { front: 'la leche', back: 'milk', partOfSpeech: 'noun' },
    { front: 'el café', back: 'coffee', partOfSpeech: 'noun' },
    { front: 'el arroz', back: 'rice', partOfSpeech: 'noun' },
    { front: 'el pollo', back: 'chicken', partOfSpeech: 'noun' },
    { front: 'la carne', back: 'meat', partOfSpeech: 'noun' },
    { front: 'el pescado', back: 'fish', partOfSpeech: 'noun' },
  ],
  'common-verbs': [
    { front: 'ser/estar', back: 'to be', partOfSpeech: 'verb' },
    { front: 'tener', back: 'to have', partOfSpeech: 'verb' },
    { front: 'hacer', back: 'to do/make', partOfSpeech: 'verb' },
    { front: 'ir', back: 'to go', partOfSpeech: 'verb' },
    { front: 'querer', back: 'to want', partOfSpeech: 'verb' },
    { front: 'comer', back: 'to eat', partOfSpeech: 'verb' },
    { front: 'beber', back: 'to drink', partOfSpeech: 'verb' },
    { front: 'hablar', back: 'to speak/talk', partOfSpeech: 'verb' },
    { front: 'saber/conocer', back: 'to know', partOfSpeech: 'verb' },
    { front: 'vivir', back: 'to live', partOfSpeech: 'verb' },
  ],
  time: [
    { front: 'hoy', back: 'today', partOfSpeech: 'adverb' },
    { front: 'mañana', back: 'tomorrow', partOfSpeech: 'adverb' },
    { front: 'ayer', back: 'yesterday', partOfSpeech: 'adverb' },
    { front: 'ahora', back: 'now', partOfSpeech: 'adverb' },
    { front: 'más tarde', back: 'later', partOfSpeech: 'adverb' },
    { front: 'la mañana', back: 'morning', partOfSpeech: 'noun' },
    { front: 'la tarde', back: 'afternoon', partOfSpeech: 'noun' },
    { front: 'la noche', back: 'night', partOfSpeech: 'noun' },
  ],
  places: [
    { front: 'la casa', back: 'house', partOfSpeech: 'noun' },
    { front: 'el restaurante', back: 'restaurant', partOfSpeech: 'noun' },
    { front: 'la escuela', back: 'school', partOfSpeech: 'noun' },
    { front: 'el hospital', back: 'hospital', partOfSpeech: 'noun' },
    { front: 'la tienda', back: 'store/shop', partOfSpeech: 'noun' },
    { front: 'el aeropuerto', back: 'airport', partOfSpeech: 'noun' },
    { front: 'la playa', back: 'beach', partOfSpeech: 'noun' },
    { front: 'el banco', back: 'bank', partOfSpeech: 'noun' },
  ],
  weather: [
    { front: 'el sol', back: 'sun', partOfSpeech: 'noun' },
    { front: 'la lluvia', back: 'rain', partOfSpeech: 'noun' },
    { front: 'la nieve', back: 'snow', partOfSpeech: 'noun' },
    { front: 'el viento', back: 'wind', partOfSpeech: 'noun' },
    { front: 'caliente', back: 'hot', partOfSpeech: 'adjective' },
    { front: 'frío/fría', back: 'cold', partOfSpeech: 'adjective' },
    { front: 'soleado/soleada', back: 'sunny', partOfSpeech: 'adjective' },
    { front: 'nublado/nublada', back: 'cloudy', partOfSpeech: 'adjective' },
  ],
  travel: [
    { front: 'el boleto', back: 'ticket', partOfSpeech: 'noun' },
    { front: 'el pasaporte', back: 'passport', partOfSpeech: 'noun' },
    { front: 'el hotel', back: 'hotel', partOfSpeech: 'noun' },
    { front: 'la maleta', back: 'suitcase', partOfSpeech: 'noun' },
    { front: 'el tren', back: 'train', partOfSpeech: 'noun' },
    { front: 'el autobús', back: 'bus', partOfSpeech: 'noun' },
    { front: 'el avión', back: 'airplane', partOfSpeech: 'noun' },
    { front: 'el mapa', back: 'map', partOfSpeech: 'noun' },
  ],
};

async function main() {
  await prisma.flashcardCategory.deleteMany({});
  await prisma.flashcard.deleteMany({});

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
