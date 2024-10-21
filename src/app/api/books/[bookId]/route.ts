import { prisma } from "@/libs/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const { bookId } =  params

    const book = await prisma.book.findUnique({
      where: {
        id: bookId
      },
      select: {
        id: true,
        name: true,
        author: true,
        average_rate: true,
        cover_url: true,
        total_pages: true,
        _count: {
          select: {
            ratings: true
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
        },
        ratings: {
          select: {
            id: true,
            description: true,
            created_at: true,
            rate: true,
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
        }
      }
    })

    return NextResponse.json(book, { status: 200 }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Erro ao buscar o livro',
    }, { status: 500 });
  }
}