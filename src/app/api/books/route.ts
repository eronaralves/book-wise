import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from "@/libs/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id ?? ''

    const searchParams = req.nextUrl.searchParams;
    const categorySlug = searchParams.get('category')
    const search = searchParams.get('search')

    let whereCondition = {}

    if(categorySlug !== "all" && categorySlug !== 'undefined') {
      whereCondition = {
        ...whereCondition,
        categories: {
          some: {
            category: {
              slug: categorySlug
            }
          }
        },
      }
    }

    if(search !== "undefined") {
      whereCondition = {
        ...whereCondition,
        OR: [
          {
            name: {
              contains: search
            }
          },
          {
            author: {
              contains: search
            }
          }
        ]
      }
    }

    const books = await prisma.book.findMany({
      where: whereCondition,
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
