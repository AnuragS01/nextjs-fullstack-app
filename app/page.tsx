'use client'

import { useState, useEffect } from 'react'
import { CreateBoardModal } from '@/components/Modals/CreateBoardModal'
import { useRouter } from 'next/navigation'

interface Board {
  id: string
  title: string
  description?: string
  color: string
  createdAt: string
  tasks: Task[]
  _count: {
    tasks: number
  }
}

interface Task {
  id: string
  title: string
  description?: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  createdAt: string
}

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await fetch('/api/boards')
      if (response.ok) {
        const data = await response.json()
        setBoards(data)
        // Auto-navigate to first board if exists
        if (data.length > 0) {
          router.push(`/boards/${data[0].id}`)
        }
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBoard = async (boardData: { title: string; description: string; color: string }) => {
    try {
      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(boardData)
      })

      if (response.ok) {
        const newBoard = await response.json()
        setBoards(prev => [newBoard, ...prev])
        setShowCreateModal(false)
        // Navigate to the newly created board
        router.push(`/boards/${newBoard.id}`)
      }
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    )
  }

  if (boards.length === 0) {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <div className="welcome-icon">
            <svg className="welcome-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="welcome-title">Welcome to TaskBoard</h1>
          <p className="welcome-description">
            Get started by creating your first board to organize your tasks and projects efficiently.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="welcome-cta-btn"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Board
          </button>
        </div>

        {showCreateModal && (
          <CreateBoardModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateBoard}
          />
        )}
      </div>
    )
  }

  // If we have boards, redirect to the first one
  return null
}