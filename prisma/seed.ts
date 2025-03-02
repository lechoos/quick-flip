import { PrismaClient } from '@prisma/client';

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

const flashcards = {
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
    { front: 'one', back: 'uno' },
    { front: 'two', back: 'dos' },
    { front: 'three', back: 'tres' },
    { front: 'four', back: 'cuatro' },
    { front: 'five', back: 'cinco' },
    { front: 'six', back: 'seis' },
    { front: 'seven', back: 'siete' },
    { front: 'eight', back: 'ocho' },
    { front: 'nine', back: 'nueve' },
    { front: 'ten', back: 'diez' },
  ],
  colors: [
    { front: 'red', back: 'rojo/roja' },
    { front: 'blue', back: 'azul' },
    { front: 'green', back: 'verde' },
    { front: 'yellow', back: 'amarillo/amarilla' },
    { front: 'black', back: 'negro/negra' },
    { front: 'white', back: 'blanco/blanca' },
    { front: 'orange', back: 'naranja' },
    { front: 'purple', back: 'morado/morada' },
  ],
  family: [
    { front: 'mother', back: 'la madre' },
    { front: 'father', back: 'el padre' },
    { front: 'brother', back: 'el hermano' },
    { front: 'sister', back: 'la hermana' },
    { front: 'son', back: 'el hijo' },
    { front: 'daughter', back: 'la hija' },
    { front: 'husband', back: 'el esposo' },
    { front: 'wife', back: 'la esposa' },
    { front: 'grandfather', back: 'el abuelo' },
    { front: 'grandmother', back: 'la abuela' },
  ],
  food: [
    { front: 'bread', back: 'el pan' },
    { front: 'water', back: 'el agua' },
    { front: 'apple', back: 'la manzana' },
    { front: 'banana', back: 'el plátano' },
    { front: 'milk', back: 'la leche' },
    { front: 'coffee', back: 'el café' },
    { front: 'rice', back: 'el arroz' },
    { front: 'chicken', back: 'el pollo' },
    { front: 'meat', back: 'la carne' },
    { front: 'fish', back: 'el pescado' },
  ],
  'common-verbs': [
    { front: 'to be', back: 'ser/estar' },
    { front: 'to have', back: 'tener' },
    { front: 'to do/make', back: 'hacer' },
    { front: 'to go', back: 'ir' },
    { front: 'to want', back: 'querer' },
    { front: 'to eat', back: 'comer' },
    { front: 'to drink', back: 'beber' },
    { front: 'to speak/talk', back: 'hablar' },
    { front: 'to know', back: 'saber/conocer' },
    { front: 'to live', back: 'vivir' },
  ],
  time: [
    { front: 'today', back: 'hoy' },
    { front: 'tomorrow', back: 'mañana' },
    { front: 'yesterday', back: 'ayer' },
    { front: 'now', back: 'ahora' },
    { front: 'later', back: 'más tarde' },
    { front: 'morning', back: 'la mañana' },
    { front: 'afternoon', back: 'la tarde' },
    { front: 'night', back: 'la noche' },
  ],
  places: [
    { front: 'house', back: 'la casa' },
    { front: 'restaurant', back: 'el restaurante' },
    { front: 'school', back: 'la escuela' },
    { front: 'hospital', back: 'el hospital' },
    { front: 'store/shop', back: 'la tienda' },
    { front: 'airport', back: 'el aeropuerto' },
    { front: 'beach', back: 'la playa' },
    { front: 'bank', back: 'el banco' },
  ],
  weather: [
    { front: 'sun', back: 'el sol' },
    { front: 'rain', back: 'la lluvia' },
    { front: 'snow', back: 'la nieve' },
    { front: 'wind', back: 'el viento' },
    { front: 'hot', back: 'caliente' },
    { front: 'cold', back: 'frío/fría' },
    { front: 'sunny', back: 'soleado/soleada' },
    { front: 'cloudy', back: 'nublado/nublada' },
  ],
  travel: [
    { front: 'ticket', back: 'el boleto' },
    { front: 'passport', back: 'el pasaporte' },
    { front: 'hotel', back: 'el hotel' },
    { front: 'suitcase', back: 'la maleta' },
    { front: 'train', back: 'el tren' },
    { front: 'bus', back: 'el autobús' },
    { front: 'airplane', back: 'el avión' },
    { front: 'map', back: 'el mapa' },
  ],
};

async function main() {
  await prisma.flashcardCategory.deleteMany();
  await prisma.flashcard.deleteMany();

  for (const category of categories) {
    const createdCategory = await prisma.flashcardCategory.create({
      data: category,
    });

    const categoryFlashcards = flashcards[category.slug as keyof typeof flashcards];

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
