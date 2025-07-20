import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' }
        },
        columns: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(boards)
  } catch (error) {
    console.error('Get boards error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, color } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const board = await prisma.board.create({
      data: {
        title,
        description,
        color: color || '#3B82F6',
        columns: {
          create: [
            { title: 'TODO', order: 1, color: '#06B6D4' },
            { title: 'DOING', order: 2, color: '#8B5CF6' },
            { title: 'DONE', order: 3, color: '#10B981' }
          ]
        }
      },
      include: {
        tasks: true,
        columns: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { tasks: true }
        }
      }
    })

    return NextResponse.json(board)
  } catch (error) {
    console.error('Create board error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}