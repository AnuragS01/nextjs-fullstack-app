'use client'

import { useState } from 'react'
import { Modal, Input, Textarea, Select, Button } from '@/components/ui'

interface Column {
  id: string
  title: string
  color: string
  order: number
}

interface CreateTaskModalProps {
  onClose: () => void
  onCreate: (data: {
    title: string
    description: string
    columnId: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
    dueDate?: string
  }) => void
  columns: Column[]
}

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' }
]

export function CreateTaskModal({ onClose, onCreate, columns }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    columnId: columns.length > 0 ? columns[0].id : '',
    priority: 'MEDIUM' as const,
    dueDate: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters'
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }

    if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onCreate({
        title: formData.title.trim(),
        description: formData.description.trim(),
        columnId: formData.columnId,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Create New Task"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        <Input
          id="title"
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter task title"
          required
          error={errors.title}
        />

        <Textarea
          id="description"
          label="Description"
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter task description (optional)"
          error={errors.description}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            id="columnId"
            label="Column"
            value={formData.columnId}
            onChange={(e) => handleChange('columnId', e.target.value)}
            options={columns.map(column => ({ value: column.id, label: column.title }))}
          />

          <Select
            id="priority"
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={PRIORITY_OPTIONS}
          />
        </div>

        <Input
          id="dueDate"
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          error={errors.dueDate}
        />

        <div className="modal-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  )
}