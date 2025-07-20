# TaskBoard - Dynamic Kanban Board Application

A modern, full-stack Kanban task management application built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Features dynamic columns, priority management, dark/light themes, and a completely modular architecture.

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Board Management**: Create unlimited boards with custom titles, descriptions, and colors
- **Custom Columns**: Create, modify, and organize columns with custom names and colors
- **Task Management**: Full CRUD operations with drag-and-drop between columns
- **Priority System**: Color-coded priority tags (LOW, MEDIUM, HIGH, URGENT)
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Works seamlessly across all screen sizes

### 🎨 User Interface
- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Hover states, smooth animations, and transitions
- **Modular Components**: Completely componentized UI architecture
- **Custom Dropdowns**: Styled select dropdowns with custom arrows
- **Priority Tags**: Color-coded priority indicators
- **Loading States**: Skeleton loading and spinners throughout

### 🔧 Technical Architecture
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: API routes with full validation and error handling
- **Database**: PostgreSQL with Prisma ORM and dynamic relationships
- **State Management**: React Context for themes, local state for components
- **CSS Architecture**: Modular CSS with zero inline styles
- **Type Safety**: Full TypeScript implementation throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or hosted)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-fullstack-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskboard"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
nextjs-fullstack-app/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── boards/              # Board CRUD operations
│   │   ├── columns/             # Column management
│   │   └── tasks/               # Task CRUD operations
│   ├── boards/[id]/             # Dynamic board pages
│   ├── globals.css              # Global styles and CSS imports
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Home page (auto-redirects to first board)
├── components/                   # React Components (Modular Architecture)
│   ├── ui/                      # Reusable UI Components
│   │   ├── Button.tsx           # Multi-variant button component
│   │   ├── Input.tsx            # Form input with validation
│   │   ├── Modal.tsx            # Reusable modal wrapper
│   │   ├── Select.tsx           # Custom styled dropdown
│   │   └── ...                  # Other UI primitives
│   ├── Sidebar/                 # Navigation Components
│   │   ├── Sidebar.tsx          # Main sidebar with board navigation
│   │   ├── SidebarNav.tsx       # Board list and create button
│   │   └── ThemeToggle.tsx      # Dark/light mode toggle
│   ├── KanbanBoard/             # Kanban-specific Components
│   │   ├── KanbanTaskCard.tsx   # Individual task cards
│   │   ├── TaskEditForm.tsx     # Inline task editing
│   │   └── TaskCardActions.tsx  # Task action buttons
│   ├── Modals/                  # Modal Components
│   │   ├── CreateBoardModal.tsx # Board creation modal
│   │   ├── CreateTaskModal.tsx  # Task creation modal
│   │   └── CreateColumnModal.tsx # Column creation modal
│   └── ...                      # Utility components
├── contexts/                    # React Contexts
│   └── ThemeContext.tsx         # Dark/light theme management
├── lib/                         # Utility Libraries
│   └── prisma.ts                # Prisma client singleton
├── prisma/                      # Database
│   └── schema.prisma            # Database schema with dynamic columns
├── styles/                      # CSS Architecture
│   └── components.css           # All component styles (no inline CSS)
├── seed-demo-data.js           # Database seeding script
└── README.md                   # This file
```

## 🗄️ Database Schema

### Dynamic Schema Design
- **Board**: Core board entity with color customization
- **Column**: Dynamic columns with custom names, colors, and ordering
- **Task**: Tasks belong to columns (not hardcoded statuses)
- **Priority**: Enum for task priorities with color coding

### Key Features
- **Dynamic Columns**: Create unlimited custom columns per board
- **Cascade Deletion**: Proper cleanup when boards/columns are deleted
- **Flexible Relationships**: Tasks can move between any columns
- **Data Integrity**: Foreign key constraints and proper indexing

## 🎨 Design System

### CSS Architecture
- **No Inline Styles**: All styling in dedicated CSS files
- **Component-Specific Classes**: Each component has its own CSS classes
- **Consistent Naming**: BEM-inspired naming convention
- **Theme Support**: Full dark/light mode implementation
- **Responsive Design**: Mobile-first approach with breakpoints

### Color Coding
- **Priority Tags**: 
  - LOW: Gray
  - MEDIUM: Blue  
  - HIGH: Orange
  - URGENT: Red
- **Column Indicators**: Custom colors per column
- **Theme Colors**: Consistent color palette across themes

## 📡 API Endpoints

### Boards API
- `GET /api/boards` - List all boards with tasks and columns
- `POST /api/boards` - Create board with default columns
- `GET /api/boards/[id]` - Get specific board with full data
- `PUT /api/boards/[id]` - Update board details
- `DELETE /api/boards/[id]` - Delete board and all content

### Columns API
- `GET /api/columns?boardId=x` - Get columns for a board
- `POST /api/columns` - Create new column
- `PUT /api/columns/[id]` - Update column details
- `DELETE /api/columns/[id]` - Delete column and reassign tasks

### Tasks API
- `POST /api/tasks` - Create task in specific column
- `PUT /api/tasks/[id]` - Update task (including column moves)
- `DELETE /api/tasks/[id]` - Delete task

## 🛠️ Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run seed           # Seed database with demo data

# Utilities  
npm run lint           # Run ESLint
```

## 🎯 Key Implementations

### 1. Dynamic Column System
- Users can create unlimited columns with custom names and colors
- Tasks are assigned to columns (not hardcoded statuses)
- Drag-and-drop functionality between columns
- Column ordering and management

### 2. Modular Component Architecture
- Zero inline styles - all CSS in dedicated files
- Reusable UI components (Button, Input, Modal, Select)
- Component composition patterns
- Proper separation of concerns

### 3. Theme System
- React Context-based theme management
- Persistent theme preference in localStorage
- Complete dark/light mode coverage
- Smooth theme transitions

### 4. Responsive Design
- Mobile-first approach
- Flexible column layouts
- Responsive navigation and modals
- Touch-friendly interactions

### 5. Error Handling & UX
- Graceful error handling with redirects
- Form validation with real-time feedback
- Loading states and skeleton screens
- Toast notifications and confirmations

## 🚀 Performance Features

- **Optimized Queries**: Efficient Prisma queries with proper includes
- **Client-Side Routing**: Next.js App Router for fast navigation  
- **Component Splitting**: Modular architecture for better tree shaking
- **CSS Optimization**: Tailwind CSS for minimal bundle size
- **Type Safety**: Full TypeScript for fewer runtime errors

## 💡 Development Highlights

### System Design
- **RESTful API**: Clean, predictable endpoint structure
- **Database Design**: Flexible schema supporting dynamic columns
- **Component Architecture**: Highly reusable and maintainable
- **Error Boundaries**: Comprehensive error handling throughout
- **State Management**: Efficient local and global state patterns

### Code Quality
- **TypeScript**: 100% type coverage
- **Modular CSS**: Zero inline styles, organized component classes
- **Component Reusability**: DRY principles throughout
- **Performance**: Optimized rendering and data fetching
- **Accessibility**: Proper ARIA labels and keyboard navigation

## ✅ Project Requirements Fulfilled

This application demonstrates modern full-stack development with:

✅ **Complete CRUD Operations** for boards, columns, and tasks  
✅ **Dynamic Content Management** with custom columns  
✅ **Responsive Design** working across all devices  
✅ **Modern React Patterns** with hooks and context  
✅ **Professional UI/UX** with animations and interactions  
✅ **Modular Architecture** for maintainability  
✅ **Database Design** with proper relationships  
✅ **Error Handling** and validation throughout  
✅ **Performance Optimization** and best practices  
✅ **Type Safety** with full TypeScript implementation  

---

Built with ❤️ using Next.js, TypeScript, Prisma, and PostgreSQL