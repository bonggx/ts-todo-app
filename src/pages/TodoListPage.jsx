import { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Loader2, Plus } from 'lucide-react';
import TodoList from '../components/TodoList';
import TodoFilters from '../components/TodoFilters';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import TodoForm from '../components/TodoForm';
import { todosApi } from '../services/api';

function TodoListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const ITEMS_PER_PAGE = 10;
  const queryClient = useQueryClient();

  // Fetches all todos
  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAllTodos,
  });

  // Creates todo mutation
  const createMutation = useMutation({
    mutationFn: todosApi.createTodo,
    onSuccess: () => {
      // Refetches todos to get fresh data from server
      queryClient.invalidateQueries(['todos']);
      setIsCreateModalOpen(false);
      alert('Todo created successfully!');
    },
    onError: (error) => {
      alert(`Failed to create todo: ${error.message}`);
    },
  });

  // Filters and search todos
  const filteredTodos = useMemo(() => {
    if (!todos) return [];

    let filtered = [...todos];

    // Applies search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Applies status filter
    if (filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed === true);
    } else if (filterStatus === 'incomplete') {
      filtered = filtered.filter(todo => todo.completed === false);
    }

    return filtered;
  }, [todos, searchTerm, filterStatus]);

  // Paginates todos
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTodos.slice(startIndex, endIndex);
  }, [filteredTodos, currentPage]);

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);

  // Resets to page 1 when filters change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const handleCreateTodo = (todoData) => {
    createMutation.mutate(todoData);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading todos...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading todos: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with Create button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Todo
        </button>
      </div>

      {/* Test Error Boundary Button */}
      <div className="mb-4">
        <Link
          to="/error-test"
          className="inline-block text-sm text-red-600 hover:text-red-800 underline"
        >
          Test Error Boundary →
        </Link>
      </div>

      {/* Filters */}
      <TodoFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterStatus={filterStatus}
        onFilterChange={handleFilterChange}
      />

      {/* Results count */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {paginatedTodos.length} of {filteredTodos.length} todos
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Todo list */}
      {paginatedTodos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No todos found. Try adjusting your filters.
        </div>
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

      {/* Creates Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Todo"
      >
        <TodoForm
          onSubmit={handleCreateTodo}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </div>
  );
}

export default TodoListPage;