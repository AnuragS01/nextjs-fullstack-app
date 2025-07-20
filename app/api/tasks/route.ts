import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { title, description, columnId, priority, dueDate, boardId } = await request.json()

    if (!title || !boardId || !columnId) {
      return NextResponse.json(
        { error: 'Title, board ID, and column ID are required' },
        { status: 400 }
      )
    }

    // Verify board and column exist
    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: { columns: true }
    })

    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      )
    }

    const columnExists = board.columns.some(col => col.id === columnId)
    if (!columnExists) {
      return NextResponse.json(
        { error: 'Column not found' },
        { status: 404 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        columnId,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        boardId
      },
      include: {
        column: true
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Create task error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}