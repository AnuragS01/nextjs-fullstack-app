'use client'

import { useState } from 'react'
import { TaskEditForm } from './TaskEditForm'
import { TaskCardActions } from './TaskCardActions'
import { ConfirmDialog } from '../ConfirmDialog'
import { Select } from '@/components/ui'

interface Column {
  id: string
  title: string
  color: string
  order: number
}

interface Task {
  id: string
  title: string
  description?: string
  columnId: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  createdAt: string
  column?: Column
}

interface KanbanTaskCardProps {
  task: Task
  onUpdate: (updates: Partial<Task>) => void
  onDelete: () => void
  columns: Column[]
}

export function KanbanTaskCard({ task, onUpdate, onDelete, columns }: KanbanTaskCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleColumnChange = (newColumnId: string) => {
    onUpdate({ columnId: newColumnId })
  }

  const handleEdit = () => setIsEditing(true)
  const handleCancelEdit = () => setIsEditing(false)
  const handleSaveEdit = (updates: Partial<Task>) => {
    onUpdate(updates)
    setIsEditing(false)
  }

  const handleDelete = () => setShowDeleteConfirm(true)
  const handleCancelDelete = () => setShowDeleteConfirm(false)
  const handleConfirmDelete = () => {
    onDelete()
    setShowDeleteConfirm(false)
  }

  // Calculate subtasks based on description (mock data for demo)
  const hasSubtasks = task.description && task.description.includes('\n')
  const subtaskCount = hasSubtasks ? task.description?.split('\n').length || 0 : 0

  if (isEditing) {
    return (
      <div className="task-card group">
        <TaskEditForm
          task={task}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </div>
    )
  }

  return (
    <div className="task-card group">
      <h3 className="task-card-title">
        {task.title}
      </h3>

      {hasSubtasks && (
        <div className="task-card-subtasks">
          0 of {subtaskCount} subtasks
        </div>
      )}

      {task.description && !hasSubtasks && (
        <p className="task-card-description">
          {task.description}
        </p>
      )}

      <div className="mb-3">
        <div className="task-card-status-priority">
          <Select
            value={task.columnId}
            onChange={(e) => handleColumnChange(e.target.value)}
            options={columns.map(column => ({ value: column.id, label: column.title }))}
            className="task-card-status-select"
          />
          <span className={`task-card-priority-tag task-card-priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <TaskCardActions
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showDeleteConfirm && (
        <ConfirmDialog
          message="Delete this task?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  )
}