import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } =  params
    const searchParams = req.nextUrl.searchParams;
    const searchBook = searchParams.get('search') ?? ''

    const whereCondition = searchBook && searchBook !== ''
      ? {
        user_id: userId,
        book: {
          name: {
            contains: searchBook
          }
        }
      }
    : {
      user_id: userId,
    };
    
    const ratingsPerUser = await prisma.rating.findMany({
      where: whereCondition,
      select: {
        created_at: true,
        description: true,
        rate: true,
        id: true,
        book: {
          select: {
            id: true,
            author: true,
            name: true,
            cover_url: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 10
    })

    return NextResponse.json(ratingsPerUser, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Erro ao buscar dados do livro'
    }, { status: 400 });
  }
}