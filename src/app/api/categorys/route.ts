import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const categorys = await prisma.category.findMany()

    return NextResponse.json(categorys, { status: 201 });
  } catch(error) {
    console.error(error)
    return NextResponse.json({
      message: 'Erro ao buscar as categorias'
    }, { status: 400 })
  }
}

