import Link from 'next/link'
import { LoadingSpinner } from '@/components/ui'

interface Board {
  id: string
  title: string
  color: string
  _count: {
    tasks: number
  }
}

interface SidebarNavProps {
  boards: Board[]
  loading: boolean
  isCurrentBoard: (boardId: string) => boolean
  onCreateBoard: () => void
}

export function SidebarNav({ boards, loading, isCurrentBoard, onCreateBoard }: SidebarNavProps) {
  if (loading) {
    return (
      <div className="loading-skeleton">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="loading-skeleton-item" />
        ))}
      </div>
    )
  }

  return (
    <nav className="sidebar-nav">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`/boards/${board.id}`}
          className={`sidebar-nav-item ${
            isCurrentBoard(board.id)
              ? 'sidebar-nav-item-active'
              : 'sidebar-nav-item-inactive'
          }`}
        >
          <div 
            className="sidebar-nav-icon"
            style={{ backgroundColor: board.color }}
          />
          <span className="sidebar-nav-text">{board.title}</span>
        </Link>
      ))}

      <button
        onClick={onCreateBoard}
        className="sidebar-nav-item sidebar-nav-item-create"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="sidebar-nav-text">Create New Board</span>
      </button>
    </nav>
  )
}