import { NextResponse } from 'next/server'; // Importa NextResponse
import { prisma } from "@/libs/prisma";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } =  params

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        created_at: true,
        email: true,
        image: true,
        name: true,
        id: true,
        _count: {
          select: {
            ratings: true,
          }
        },
      }
    })

    const booksEvaluated = await prisma.rating.findMany({
      where: {
        user_id: userId,
      },
      select: {
        book_id: true,
      },
      distinct: ['book_id'],
    });

    const ratedBooks = await prisma.rating.findMany({
      where: {
        user_id: userId,
      },
      select: {
        book: {
          select: {
            author: true,
          },
        },
      },
    });
    
    const authorsRead = Array.from(new Set(ratedBooks.map(rating => rating.book.author)));
    
    const ratedCategories = await prisma.categoriesOnBooks.groupBy({
      by: ['categoryId'],
      where: {
        book: {
          ratings: {
            some: {
              user_id: userId,
            },
          },
        },
      },
      _count: {
        categoryId: true,
      },
    });
    
    const mostRated = ratedCategories.sort((a, b) => b._count.categoryId - a._count.categoryId)[0];
    
    const categoryDetails = await prisma.category.findUnique({
      where: {
        id: mostRated.categoryId,
      },
      select: {
        name: true,
      },
    });

    const detailsUser = {
      ...user,
      booksEvaluated: booksEvaluated.length,
      authorsRead: authorsRead.length,
      mostReadCategory: categoryDetails?.name ?? null
    }

    console.log(mostRated, 'AAAAAAAAA')
    return NextResponse.json(detailsUser, { status: 201 });
  } catch(error) {
    console.error(error)
    return NextResponse.json({
      message: 'Erro ao criar usuário'
    }, { status: 400 });
  }
}

