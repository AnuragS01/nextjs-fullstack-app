import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const boardId = searchParams.get('boardId')

    if (!boardId) {
      return NextResponse.json(
        { error: 'Board ID is required' },
        { status: 400 }
      )
    }

    const columns = await prisma.column.findMany({
      where: { boardId },
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    })

    return NextResponse.json(columns)
  } catch (error) {
    console.error('Get columns error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, color = '#6B7280', boardId } = await request.json()

    if (!title || !boardId) {
      return NextResponse.json(
        { error: 'Title and board ID are required' },
        { status: 400 }
      )
    }

    // Get the next order number
    const lastColumn = await prisma.column.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' }
    })

    const order = (lastColumn?.order || 0) + 1

    const column = await prisma.column.create({
      data: {
        title,
        color,
        boardId,
        order
      },
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    })

    return NextResponse.json(column)
  } catch (error) {
    console.error('Create column error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}