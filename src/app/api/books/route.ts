import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from "@/libs/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth-options';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id ?? ''

    const searchParams = req.nextUrl.searchParams;
    const categorySlug = searchParams.get('category')
    const search = searchParams.get('search')

    const books = await prisma.book.findMany({
      where: {
        categories: categorySlug && categorySlug !== "undefined" ?
          {
            some: {
              category: {
                slug: categorySlug
              }
            }
          } 
        : undefined,
        OR: search && search !== "undefined" ? [
          {
            name: { contains: search, mode: 'insensitive' },
          },
          {
            author: { contains: search, mode: 'insensitive' }
          }
        ] 
        : undefined
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
                name: true,
                slug: true
              }
            }
          }
        }
      },
    });

    const booksWithReadStatus = books.map(book => ({
      ...book,
      has_read: book._count.ratings > 0 ? true : false,
    }));

    return NextResponse.json(booksWithReadStatus, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Erro ao buscar os livros',
    }, { status: 500 });
  }
}
