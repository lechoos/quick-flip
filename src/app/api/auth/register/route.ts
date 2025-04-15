import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/formSchemas';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const { errors } = result.error;
      return NextResponse.json({ error: 'Invalid input', details: errors }, { status: 400 });
    }

    const { email, password, username } = result.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: existingUser.email === email ? 'Email already in use' : 'Username already taken',
        },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (ex) {
    console.error('[REGISTER_ERROR]', (ex as Error).message);
    return NextResponse.json({ error: 'An unknown error occurred. Please try again later.' }, { status: 500 });
  }
}
