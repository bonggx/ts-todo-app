import axios from 'axios';

const API_BASE_URL = 'https://api.oluwasetemi.dev';

// Creates axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to transform task to todo format
const transformTask = (task) => ({
  id: task.id,
  title: task.name, // API uses 'name', we use 'title'
  description: task.description,
  completed: task.status === 'DONE', // Converts status to boolean
  userId: task.owner,
  ...task, // Keeps original data too
});

// API functions (using /tasks endpoint)
export const todosApi = {
  // Get all tasks
  getAllTodos: async () => {
    const response = await api.get('/tasks');
    // Extracts data array from response and transform each task
    return response.data.data.map(transformTask);
  },

  // Gets single task by ID
  getTodoById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return transformTask(response.data);
  },

  // Creates new task
  createTodo: async (todoData) => {
    // Transforms our format to API format
    const taskData = {
      name: todoData.title,
      description: todoData.description || '',
      status: todoData.completed ? 'DONE' : 'TODO',
      priority: 'MEDIUM',
    };
    const response = await api.post('/tasks', taskData);
    return transformTask(response.data);
  },

  // Updates task
updateTodo: async (id, todoData) => {
  try {
    // Transforms our format to API format
    const taskData = {
      name: todoData.title,
      description: todoData.description || '',
      status: todoData.completed ? 'DONE' : 'TODO',
    };
    
    console.log('=== UPDATE DEBUG ===');
    console.log('Task ID:', id);
    console.log('Sending data:', taskData);
    
    // PATCH request to update task
    const response = await api.patch(`/tasks/${id}`, taskData);
    
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
    // Handles different response formats
    if (response.data.data) {
      return transformTask(response.data.data);
    } else if (response.data.id) {
      return transformTask(response.data);
    } else {
      return { id, ...todoData, completed: todoData.completed };
    }
  } catch (error) {
    console.error('=== UPDATE ERROR ===');
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    throw error;
  }
},

  // Deletes task
  deleteTodo: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;