import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { RegisterSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    const token = signToken({ sub: user.id, email: user.email });

    return NextResponse.json(
      {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      },
      { status: 201 }
    );
  } catch (err) {
    const prismaErr = err as { code?: string };
    if (prismaErr.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
