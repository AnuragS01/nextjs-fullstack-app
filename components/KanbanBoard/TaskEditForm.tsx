import { useState } from 'react'
import { Input, Textarea, Select, Button } from '@/components/ui'

interface Task {
  id: string
  title: string
  description?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
}

interface TaskEditFormProps {
  task: Task
  onSave: (updates: Partial<Task>) => void
  onCancel: () => void
}

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' }
]

export function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSave({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined
      })
    }
  }

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="task-edit-form">
      <Input
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Task title"
        required
        className="task-edit-input"
      />
      
      <Textarea
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Task description (optional)"
        rows={2}
        className="task-edit-textarea"
      />
      
      <div className="flex space-x-2">
        <Select
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          options={PRIORITY_OPTIONS}
          className="task-edit-select"
        />
        
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          className="task-edit-select"
        />
      </div>
      
      <div className="task-edit-actions">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onCancel}
          className="task-edit-btn-cancel"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="task-edit-btn-save"
        >
          Save
        </Button>
      </div>
    </form>
  )
}