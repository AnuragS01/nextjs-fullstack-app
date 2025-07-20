'use client'

import { useState } from 'react'
import { Modal, Input, Textarea, Button } from '@/components/ui'
import { ColorPicker } from '../ColorPicker'

interface CreateBoardModalProps {
  onClose: () => void
  onCreate: (data: { title: string; description: string; color: string }) => void
}

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
]

export function CreateBoardModal({ onClose, onCreate }: CreateBoardModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: COLORS[0]
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters'
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Title must be less than 50 characters'
    }

    if (formData.description.trim().length > 200) {
      newErrors.description = 'Description must be less than 200 characters'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onCreate({
        title: formData.title.trim(),
        description: formData.description.trim(),
        color: formData.color
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
      title="Create New Board"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        <Input
          id="title"
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter board title"
          required
          error={errors.title}
        />

        <Textarea
          id="description"
          label="Description"
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter board description (optional)"
          error={errors.description}
        />

        <div className="form-group">
          <label className="form-label">Board Color</label>
          <ColorPicker
            colors={COLORS}
            selectedColor={formData.color}
            onColorSelect={(color) => handleChange('color', color)}
          />
        </div>

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
            Create Board
          </Button>
        </div>
      </form>
    </Modal>
  )
}