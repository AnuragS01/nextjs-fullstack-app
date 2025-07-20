import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const column = await prisma.column.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    })

    if (!column) {
      return NextResponse.json(
        { error: 'Column not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(column)
  } catch (error) {
    console.error('Get column error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const column = await prisma.column.update({
      where: { id: params.id },
      data,
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    })

    return NextResponse.json(column)
  } catch (error) {
    console.error('Update column error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}