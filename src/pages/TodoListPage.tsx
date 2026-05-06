import { useState, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Loader2, Plus } from 'lucide-react'
import TodoList from '../components/TodoList'
import TodoFilters from '../components/TodoFilters'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import TodoForm from '../components/TodoForm'
import { todosApi } from '../services/api'
import { Todo } from '../types/types'

interface TodoData {
  title?: string
  description?: string
  completed: boolean
}

function TodoListPage() {
  // UI state
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'incomplete'>('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const ITEMS_PER_PAGE = 10
  const queryClient = useQueryClient()

  // Fetch todos
  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAllTodos,
  })

  // Create todo
  const createMutation = useMutation({
    mutationFn: todosApi.createTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.refetchQueries({ queryKey: ['todos'] }) // force refresh
      setIsCreateModalOpen(false)
    },

    onError: (error: Error) => {
      alert(`Failed to create todo: ${error.message}`)
    },
  })

  // Filter + search logic
  const filteredTodos = useMemo(() => {
    if (!todos) return []

    let filtered = [...todos]

    // Search filter (safe null check)
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed)
    } else if (filterStatus === 'incomplete') {
      filtered = filtered.filter(todo => !todo.completed)
    }

    return filtered
  }, [todos, searchTerm, filterStatus])

  // Pagination logic
  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTodos.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredTodos, currentPage])

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (value: string) => {
    setFilterStatus(value as any)
    setCurrentPage(1)
  }

  const handleCreateTodo = (data: Partial<Todo>) => {
  createMutation.mutate({
    title: data.title ?? '',
    description: data.description ?? '',
    completed: data.completed ?? false,
  })
}

  // Loading UI
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  // Error UI
  if (isError) {
    return <p>Error: {error?.message}</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Create
        </button>
      </div>

      {/* Test error page link */}
      <Link to="/error-test" className="text-red-500 text-sm underline">
        Trigger Error Test →
      </Link>

      {/* Filters */}
      <TodoFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterStatus={filterStatus}
        onFilterChange={handleFilterChange}
      />

      {/* Results */}
      <p className="text-sm text-gray-500 mb-2">
        Showing {paginatedTodos.length} of {filteredTodos.length}
      </p>

      {/* Todo list */}
      {paginatedTodos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <>
          <TodoList todos={paginatedTodos} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Create modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Todo"
      >
        <TodoForm
          onSubmit={handleCreateTodo}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </div>
  )
}

export default TodoListPage