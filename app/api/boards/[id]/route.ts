import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: params.id,
      },
      include: {
        tasks: {
          orderBy: { createdAt: "desc" },
          include: {
            column: true
          }
        },
        columns: {
          orderBy: { order: "asc" }
        }
      },
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(board);
  } catch (error) {
    console.error("Get board error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, color } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const board = await prisma.board.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        color,
      },
      include: {
        tasks: {
          include: {
            column: true
          }
        },
        columns: {
          orderBy: { order: "asc" }
        },
        _count: {
          select: { tasks: true },
        },
      },
    });

    return NextResponse.json(board);
  } catch (error) {
    console.error("Update board error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
