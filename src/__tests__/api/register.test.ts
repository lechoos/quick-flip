/**
 * @jest-environment node
 */

jest.mock('@/lib/prisma', () => require('../__mocks__/prisma'));
jest.mock('bcryptjs');

import { POST } from '@/app/api/auth/register/route';
import { prismaMock } from '@/__mocks__/prisma';
import { hash } from 'bcryptjs';
import { NextRequest } from 'next/server';

const createRequest = (body: unknown): NextRequest => {
  return new NextRequest((process.env.DEV_URL || 'http://localhost:3000') + '/api/auth/register', {
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
  it('Returns an error when email is invalid.', async () => {
    const testUser = {
      email: 'invalid_email',
      password: 'password123',
      username: 'testuser',
    };

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input');
    expect(data.details[0].message).toBe('Invalid email' + ' format');
  });
  it('Returns an error if password is too short', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'pw',
      username: 'testuser',
    };

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input');
    expect(data.details[0].message).toBe('Password must be at least 8 characters');
  });
  it('Returns an error if username is too short', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      username: 'te',
    };

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input');
    expect(data.details[0].message).toBe('Username must be at least 3 characters');
  });
  it('Returns an error if required fields are missing', async () => {
    const testUser = {
      email: 'test@example.com',
    };

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input');
    expect(data.details).toHaveLength(2);
  });
  it('Returns an error if email is already in use', async () => {
    const testUser = {
      email: 'existing@example.com',
      password: 'password123',
      username: 'testuser',
    };

    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: '1',
      email: 'existing@example.com',
      username: 'existinguser',
      password: 'hashed_password',
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email already in use');
    expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
      where: {
        OR: [{ email: testUser.email }, { username: testUser.username }],
      },
    });
  });
  it('Returns an error if username is already taken', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      username: 'existinguser',
    };

    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: '1',
      email: 'different@example.com',
      username: 'existinguser',
      password: 'hashed_password',
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Username already taken');
    expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
      where: {
        OR: [{ email: testUser.email }, { username: testUser.username }],
      },
    });
  });
  it('Returns a status code 500 if an unknown error occurs', async () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    };
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    prismaMock.user.findFirst.mockRejectedValueOnce(new Error('Unknown error'));

    const response = await POST(createRequest(testUser));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('An unknown error occurred. Please try again later.');

    expect(consoleSpy).toHaveBeenCalledWith('[REGISTER_ERROR]', 'Unknown error');

    consoleSpy.mockRestore();
  });
});
