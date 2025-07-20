'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { KanbanTaskCard } from '@/components/KanbanBoard/KanbanTaskCard'
import { CreateTaskModal, CreateColumnModal } from '@/components/Modals'

interface Column {
  id: string
  title: string
  color: string
  order: number
  tasks?: Task[]
}

interface Board {
  id: string
  title: string
  description?: string
  color: string
  tasks: Task[]
  columns: Column[]
}

interface Task {
  id: string
  title: string
  description?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  createdAt: string
  boardId: string
  columnId: string
  column?: Column
}

export default function BoardPage({ params }: { params: { id: string } }) {
  const [board, setBoard] = useState<Board | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)
  const [showCreateColumnModal, setShowCreateColumnModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBoard()
  }, [params.id])

  const fetchBoard = async () => {
    try {
      const response = await fetch(`/api/boards/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setBoard(data)
      } else if (response.status === 404) {
        // Board not found, redirect to root
        router.push('/')
        return
      } else {
        // Other API errors, redirect to root
        console.error('API Error:', response.status, response.statusText)
        router.push('/')
        return
      }
    } catch (error) {
      // Network errors or other issues, redirect to root
      console.error('Error fetching board:', error)
      router.push('/')
      return
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: {
    title: string
    description: string
    columnId: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
    dueDate?: string
  }) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...taskData,
          boardId: params.id
        })
      })

      if (response.ok) {
        const newTask = await response.json()
        setBoard(prev => prev ? {
          ...prev,
          tasks: [newTask, ...prev.tasks]
        } : null)
        setShowCreateTaskModal(false)
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleCreateColumn = async (columnData: {
    title: string
    color: string
  }) => {
    try {
      const response = await fetch('/api/columns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...columnData,
          boardId: params.id
        })
      })

      if (response.ok) {
        const newColumn = await response.json()
        setBoard(prev => prev ? {
          ...prev,
          columns: [...prev.columns, newColumn].sort((a, b) => a.order - b.order)
        } : null)
        setShowCreateColumnModal(false)
      }
    } catch (error) {
      console.error('Error creating column:', error)
    }
  }

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setBoard(prev => prev ? {
          ...prev,
          tasks: prev.tasks.map(task => 
            task.id === taskId ? updatedTask : task
          )
        } : null)
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBoard(prev => prev ? {
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== taskId)
        } : null)
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Board not found</h2>
        <button
          onClick={() => router.push('/')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Boards
        </button>
      </div>
    )
  }

  return (
    <div className="board-container">
      {/* Header */}
      <div className="board-header">
        <div className="board-header-content">
          <h1 className="board-title">
            {board.title}
          </h1>
          <button
            onClick={() => setShowCreateTaskModal(true)}
            className="board-add-task-btn"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Task
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="board-columns">
        {board.columns.map(column => {
          const columnTasks = board.tasks.filter(task => task.columnId === column.id)
          return (
            <div key={column.id} className="board-column">
              <div className="board-column-header">
                <div 
                  className="board-column-indicator"
                  style={{ backgroundColor: column.color }}
                />
                <h2 className="board-column-title">
                  {column.title} ({columnTasks.length})
                </h2>
              </div>
              <div className="board-column-content">
                {columnTasks.map(task => (
                  <KanbanTaskCard
                    key={task.id}
                    task={task}
                    onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                    onDelete={() => handleDeleteTask(task.id)}
                    columns={board.columns}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {/* Add New Column */}
        <div className="board-add-column">
          <button 
            className="board-add-column-btn"
            onClick={() => setShowCreateColumnModal(true)}
          >
            + New Column
          </button>
        </div>
      </div>

      {showCreateTaskModal && (
        <CreateTaskModal
          onClose={() => setShowCreateTaskModal(false)}
          onCreate={handleCreateTask}
          columns={board.columns}
        />
      )}

      {showCreateColumnModal && (
        <CreateColumnModal
          onClose={() => setShowCreateColumnModal(false)}
          onCreate={handleCreateColumn}
        />
      )}
    </div>
  )
}