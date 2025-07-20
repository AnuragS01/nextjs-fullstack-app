'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNav } from './SidebarNav'
import { ThemeToggle } from './ThemeToggle'
import { LoadingSpinner } from '@/components/ui'
import { CreateBoardModal } from '@/components/Modals'

interface Board {
  id: string
  title: string
  color: string
  _count: {
    tasks: number
  }
}

export function Sidebar() {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await fetch('/api/boards')
      if (response.ok) {
        const data = await response.json()
        setBoards(data)
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBoard = async (boardData: {
    title: string
    description: string
    color: string
  }) => {
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
      }
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  const isCurrentBoard = (boardId: string) => {
    return pathname === `/boards/${boardId}`
  }

  return (
    <>
      <div className="sidebar">
        <SidebarHeader />
        
        <div className="sidebar-content">
          <div className="sidebar-section-header">
            <h2 className="sidebar-section-title">
              All Boards ({boards.length})
            </h2>
          </div>

          <SidebarNav 
            boards={boards}
            loading={loading}
            isCurrentBoard={isCurrentBoard}
            onCreateBoard={() => setShowCreateModal(true)}
          />
        </div>

        <ThemeToggle />
      </div>

      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </>
  )
}