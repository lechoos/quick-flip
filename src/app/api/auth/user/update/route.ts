import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { updateProfileSchema } from '@/lib/formSchemas';
import { auth } from '@/auth';

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You are not authorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      const { errors } = result.error;
      return NextResponse.json({ error: 'Validation error', details: errors }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { email, username, password } = result.data;

    const dataToUpdate = {
      ...(email && { email }),
      ...(username && { username }),
      ...(password && { password: await hash(password, 12) }),
    };

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    console.log(updatedUser);

    return NextResponse.json(
      {
        message: 'User updated successfully',
        user: updatedUser,
      },
      { status: 200 },
    );
  } catch (ex) {
    console.error('[UPDATE_USER_ERROR]', (ex as Error).message);
    return NextResponse.json({ error: 'An unknown error occurred. Please try again later.' }, { status: 500 });
  }
}
