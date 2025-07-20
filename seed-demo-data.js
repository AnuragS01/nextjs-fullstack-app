const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create a demo board with columns
  const board = await prisma.board.create({
    data: {
      title: 'Platform Launch',
      description: 'Launch preparation for our new platform',
      color: '#8B5CF6',
      columns: {
        create: [
          { title: 'TODO', order: 1, color: '#06B6D4' },
          { title: 'DOING', order: 2, color: '#8B5CF6' },
          { title: 'DONE', order: 3, color: '#10B981' }
        ]
      }
    },
    include: {
      columns: true
    }
  })

  // Get column IDs for task assignment
  const todoColumn = board.columns.find(col => col.title === 'TODO')
  const doingColumn = board.columns.find(col => col.title === 'DOING')
  const doneColumn = board.columns.find(col => col.title === 'DONE')

  // Create demo tasks with columnId instead of status
  const tasks = [
    {
      title: 'Build UI for onboarding flow',
      description: 'Create user-friendly onboarding screens with proper validation',
      columnId: todoColumn.id,
      priority: 'HIGH',
      boardId: board.id
    },
    {
      title: 'Build UI for search',
      description: 'Implement search functionality with filters',
      columnId: todoColumn.id,
      priority: 'MEDIUM',
      boardId: board.id
    },
    {
      title: 'Build settings UI',
      description: 'Create comprehensive settings panel',
      columnId: todoColumn.id,
      priority: 'LOW',
      boardId: board.id
    },
    {
      title: 'QA and test all major user journeys',
      description: 'Comprehensive testing of all user flows',
      columnId: todoColumn.id,
      priority: 'HIGH',
      boardId: board.id
    },
    {
      title: 'Design settings and search pages',
      description: 'Complete UI/UX design for settings and search',
      columnId: doingColumn.id,
      priority: 'MEDIUM',
      boardId: board.id
    },
  ]

  for (const task of tasks) {
    await prisma.task.create({ data: task })
  }

  console.log('Demo data created successfully!')
  console.log(`Board: ${board.title} (${board.id}) - ${tasks.length} tasks`)
  console.log(`Created ${tasks.length} tasks total`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })