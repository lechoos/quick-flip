/**
 * @jest-environment node
 */

jest.mock('@/lib/prisma', () => require('../__mocks__/prisma'));
jest.mock('bcryptjs');

import { POST } from '@/app/api/auth/register/route';
import { prismaMock } from '@/__mocks__/prisma';
import { hash } from 'bcryptjs';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';

const createRequest = (body: unknown): NextRequest => {
  return new NextRequest('http://localhost:3000/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

describe('Register API', () => {
  it('successfully registers a new user', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    };

    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    prismaMock.user.create.mockResolvedValueOnce({
      id: '1',
      email: testUser.email,
      username: testUser.username,
      password: 'hashed_password',
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (hash as jest.Mock).mockResolvedValueOnce('hashed_password');

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe('User created successfully');
    expect(data.user).toMatchObject({
      email: testUser.email,
      username: testUser.username,
    });
    expect(data.user.password).toBeUndefined();
    expect(data.user.id).toBeDefined();
    expect(data.user.createdAt).toBeDefined();
  });
});
