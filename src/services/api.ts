import axios from "axios";
import { Todo } from "../types/types";

const api = axios.create({
  baseURL: "https://api.oluwasetemi.dev",
  headers: { "Content-Type": "application/json" },
});

// Transform backend task → frontend Todo
const transformTask = (task: any): Todo => ({
  id: task.id,
  title: task.name ?? "", // safety fallback
  description: task.description ?? "",
  completed: task.status === "DONE",
});

export const todosApi = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const res = await api.get("/tasks");
    return (res.data?.data || []).map(transformTask);
  },

  // Get single todo
  getTodoById: async (id: string): Promise<Todo> => {
    if (!id) throw new Error("Missing todo ID");

    const res = await api.get(`/tasks/${id}`);
    return transformTask(res.data?.data ?? res.data);
  },

  // Create new todo
  createTodo: async (todo: Partial<Todo>): Promise<Todo> => {
    const payload = {
      name: todo.title ?? "", // safety fallback
      description: todo.description ?? "",
      status: todo.completed ? "DONE" : "TODO",
    };

    const res = await api.post("/tasks", payload);

    return transformTask(res.data?.data ?? res.data);
  },

  // Update todo
  updateTodo: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    if (!id) throw new Error("Missing todo ID");

    const payload = {
      name: todo.title ?? "",
      description: todo.description ?? "",
      status: todo.completed ? "DONE" : "TODO",
    };

    const res = await api.patch(`/tasks/${id}`, payload);

    return transformTask(res.data?.data ?? res.data);
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<void> => {
    if (!id) throw new Error("Missing todo ID");

    await api.delete(`/tasks/${id}`);
  },
};

export default api;
