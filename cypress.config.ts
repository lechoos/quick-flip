import { defineConfig } from 'cypress';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    env: {
      TEST_USER_EMAIL: 'test@example.com',
      TEST_USER_PASSWORD: 'Password123!',
    },
    setupNodeEvents(on, config) {
      on('task', {
        async resetDatabase() {
          try {
            await prisma.user.deleteMany();

            return null;
          } catch (ex: any) {
            console.error('Error resetting database: ', ex?.message);
            throw ex;
          }
        },
        async seedTestUser() {
          try {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash(config.env.TEST_USER_PASSWORD, 12);

            return prisma.user.create({
              data: {
                email: config.env.TEST_USER_EMAIL,
                username: 'testuser',
                password: hashedPassword,
              },
            });
          } catch (ex: any) {
            console.error('Error seeding test user: ', ex?.message);
            throw ex;
          }
        },
      });
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
