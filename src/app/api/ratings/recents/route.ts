import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const ratings = await prisma.rating.findMany({
      select: {
        created_at: true,
        description: true,
        rate: true,
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        book: {
          select: {
            id: true,
            author: true,
            name: true,
            cover_url: true,
            summary: true 
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 10
    });

    const response = NextResponse.json(ratings);
    response.headers.set('Cache-Control', 'no-store');
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Erro ao buscar os livros mais recentes'
    }, { status: 400 });
  }
}
