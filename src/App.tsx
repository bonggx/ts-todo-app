import { Routes, Route } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage.tsx'
import TodoDetailPage from './pages/TodoDetailPage.tsx'
import NotFoundPage from './pages/NotFoundPage'
import ErrorTestPage from './pages/ErrorTestPage'
import SkipLink from './components/SkipLink'

function App() {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen bg-gray-50">
        <main id="main-content">
          <Routes>
            <Route path="/" element={<TodoListPage />} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
            <Route path="/error-test" element={<ErrorTestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App