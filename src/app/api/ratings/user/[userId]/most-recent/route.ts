import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } =  params

    const lastRating = await prisma.rating.findFirst({
      where: {
        user_id: userId,
      },
      select: {
        created_at: true,
        book: {
          select: {
            id: true,
            author: true,
            name: true,
            average_rate: true,
            cover_url: true,
            summary: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    

    return NextResponse.json(lastRating, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Erro ao buscar ultima avaliação'
    }, { status: 400 });
  }
}