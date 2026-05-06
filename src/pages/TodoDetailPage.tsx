import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { todosApi } from "../services/api";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Edit,
  Trash2,
} from "lucide-react";
import Modal from "../components/Modal";
import TodoForm from "../components/TodoForm";

interface TodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch single todo (enabled only when id exists)
  const {
    data: todo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => todosApi.getTodoById(id!),
    enabled: !!id,
  });

  // Updates todo mutation
  const updateMutation = useMutation({
    mutationFn: (todoData: TodoData) => todosApi.updateTodo(id!, todoData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditModalOpen(false);
      alert("Todo updated successfully!");
    },

    onError: (error: Error) => {
      console.error("Update error:", error);
      alert(`Failed to update todo: ${error.message}`);
    },
  });

  // Deletes todo mutation
  const deleteMutation = useMutation({
    mutationFn: () => todosApi.deleteTodo(id!),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      alert("Todo deleted successfully!");
      navigate("/");
    },

    onError: (error: Error) => {
      alert(`Failed to delete todo: ${error.message}`);
    },
  });

  const handleUpdate = (data: TodoData) => {
    updateMutation.mutate({
      title: data.title ?? "",
      description: data.description ?? "",
      completed: data.completed ?? false,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Loading todo...</span>
        </div>
      </div>
    );
  }

  // Error state (API failure)
  if (isError) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading todo: {error?.message || "Unknown error"}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to todos
        </button>
      </div>
    );
  }

  // Empty state (no todo found)
  if (!todo) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          Todo not found
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to todos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all todos
      </button>

      {/* Todo card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Status icon */}
          {todo.completed ? (
            <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
          ) : (
            <Circle className="w-8 h-8 text-gray-300 flex-shrink-0" />
          )}

          <div className="flex-1">
            {/* Title */}
            <h1
              className={`text-2xl font-bold mb-2 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {todo.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span
                className={`px-3 py-1 rounded-full ${
                  todo.completed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>

              {/* Optional field safeguard */}
              {todo.status && (
                <span className="text-gray-500">Status: {todo.status}</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {todo.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {todo.description}
            </p>
          </div>
        )}

        {/* Details section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Details</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Priority:</span>
              <span className="ml-2 font-medium">
                {todo.priority || "Not set"}
              </span>
            </div>

            {todo.createdAt && (
              <div>
                <span className="text-gray-500">Created:</span>
                <span className="ml-2 font-medium">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            Edit Todo
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete Todo
          </button>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Todo"
      >
        <TodoForm
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          initialData={todo}
          isLoading={updateMutation.isPending}
        />
      </Modal>

      {/* Delete modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Todo"
      >
        <div>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>

          <div className="bg-gray-50 p-3 rounded mb-6">
            <p className="font-medium">{todo.title}</p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TodoDetailPage;
