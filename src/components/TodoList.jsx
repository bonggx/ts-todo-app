import { Link } from 'react-router-dom';

function TodoList({ todos }) {
  return (
    <div className="space-y-4" role="list" aria-label="Todo items">
      {todos.map((todo) => (
        <Link
          key={todo.id}
          to={`/todos/${todo.id}`}
          className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          aria-label={`View details for: ${todo.title}. Status: ${todo.completed ? 'Completed' : 'Incomplete'}`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="mt-1 h-5 w-5 text-blue-600 rounded pointer-events-none"
              aria-label={todo.completed ? 'Completed' : 'Not completed'}
              tabIndex={-1}
            />
            <div className="flex-1">
              <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TodoList;