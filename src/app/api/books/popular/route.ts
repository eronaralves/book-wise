import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from "@/libs/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
    const userId = session?.user?.id ?? ''

  try {
    const popularBooks = await prisma.book.findMany({
      orderBy: {
        average_rate: 'desc'
      },
      select: {
        author: true,
        id: true,
        name: true,
        cover_url: true,
        average_rate: true,
        total_pages: true,
        _count: {
          select: {
            ratings: {
              where: {
                user_id: userId
              }
            }
          }
        },
        categories: {
          select: {
            category: {
              select: {
                name: true
              }
            }
          }
        }
      },
      take: 5
    });

    const booksWithReadStatus = popularBooks.map(book => ({
      ...book,
      has_read: book._count.ratings > 0 ? true : false,
    }));
      
    return NextResponse.json(booksWithReadStatus, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Erro ao buscar os livros populares'
    }, { status: 400 });
  }
}
