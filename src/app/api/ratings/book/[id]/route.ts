import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } =  params
    
    const ratingsPerBook = await prisma.rating.findMany({
      where: {
        book_id: id
      },
      select: {
        created_at: true,
        description: true,
        rate: true,
        id: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(ratingsPerBook, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Erro ao buscar dados do livro'
    }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { description, rate, bookId, userId } = body
    
    const rating = await prisma.rating.create({
      data: {
        description,
        rate,
        book_id: bookId,
        user_id: userId,
      },
      select: {
        created_at: true,
        description: true,
        rate: true,
        id: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
      },
    })

    const average = await prisma.rating.aggregate({
      where: { book_id: bookId },
      _avg: {
        rate: true,
      },
    });

    await prisma.book.update({
      where: {
        id: bookId
      },
      data: {
        average_rate: average._avg.rate || 0
      }
    })

  
    return NextResponse.json(rating, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Erro ao criar as avaliações'
    }, { status: 400 });
  }
}
