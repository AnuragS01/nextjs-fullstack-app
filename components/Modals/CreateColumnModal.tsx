'use client'

import { useState } from 'react'
import { Button, Input, Modal } from '@/components/ui'
import { ColorPicker } from '@/components/ColorPicker'

interface CreateColumnModalProps {
  onClose: () => void
  onCreate: (columnData: {
    title: string
    color: string
  }) => void
}

const COLUMN_COLORS = [
  '#06B6D4', // cyan
  '#8B5CF6', // violet
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#6366F1', // indigo
  '#84CC16', // lime
]

export function CreateColumnModal({ onClose, onCreate }: CreateColumnModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    color: COLUMN_COLORS[0]
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onCreate({
      title: formData.title.trim(),
      color: formData.color
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Modal 
      isOpen={true}
      onClose={onClose}
      title="Create New Column"
    >

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="modal-form-group">
          <label htmlFor="title" className="modal-label">
            Column Title *
          </label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`modal-input ${errors.title ? 'modal-input-error' : 'modal-input-normal'}`}
            placeholder="Enter column title"
            autoFocus
          />
          {errors.title && (
            <p className="modal-error-text">{errors.title}</p>
          )}
        </div>

        <div className="modal-form-group">
          <label className="modal-label">
            Column Color
          </label>
          <ColorPicker
            selectedColor={formData.color}
            colors={COLUMN_COLORS}
            onColorSelect={(color) => handleChange('color', color)}
          />
        </div>

        <div className="modal-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="modal-btn-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="modal-btn-submit"
          >
            Create Column
          </Button>
        </div>
      </form>
    </Modal>
  )
}