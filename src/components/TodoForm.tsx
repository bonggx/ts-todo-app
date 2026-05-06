import { useState, useEffect } from "react";
import { Loader2 } from 'lucide-react';
import { Todo } from "../types/types";

type Props = {
  onSubmit: (data: Partial<Todo>) => void;
  onCancel: () => void;
  initialData?: Todo | null;
  isLoading?: boolean;
};

function TodoForm({
  onSubmit,
  onCancel,
  initialData = null,
  isLoading = false,
}: Props) {
  // Reset-safe state
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);


  // Sync form when editing
  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setCompleted(initialData.completed || false);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Todo Description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Completed */}
      <div className="mb-4">
        <label htmlFor="completed" className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <span className="text-sm text-gray-700">Mark as Completed</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
         type="button"
         onClick={onCancel}
         disabled={isLoading}
         className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
         >
          Cancel
        </button>

        <button type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update" : "Create"} Todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
