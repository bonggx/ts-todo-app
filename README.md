# Todo Application

A modern, full-featured todo application built with React that allows users to manage their daily tasks efficiently. This project demonstrates proficiency in frontend development, API integration, React patterns, and accessible UI design.

## Features

### Core Features
- View all todos with pagination (10 items per page)
- Search todos by title with real-time filtering
- Filter todos by completion status (All/Completed/Incomplete)
- View individual todo details
- Create new todos with title and description
- Edit existing todos
- Delete todos with confirmation dialog
- Mark todos as complete/incomplete

### Technical Features
- Client-side routing with nested routes
- Error boundary implementation for graceful error handling
- Custom 404 page for undefined routes
- Responsive design (mobile and desktop)
- Loading states during API calls
- SEO-optimized meta tags
- Accessibility features (ARIA labels, keyboard navigation, skip links)
- React Suspense for code splitting

## Technology Stack

- **React 19** - UI library with hooks and functional components
- **React Router** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## Project Structure
```
todo-app/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Modal.jsx
│   │   ├── Pagination.jsx
│   │   ├── SkipLink.jsx
│   │   ├── TodoFilters.jsx
│   │   ├── TodoForm.jsx
│   │   └── TodoList.jsx
│   ├── pages/           # Full page components
│   │   ├── ErrorTestPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── TodoDetailPage.jsx
│   │   └── TodoListPage.jsx
│   ├── services/        # API service layer
│   │   └── api.js
│   ├── App.jsx          # Main app component with routes
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Bonggx/Todo-Application-Project.git
cd todo-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## API Integration

The application connects to the backend API at `https://api.oluwasetemi.dev`

### Endpoints Used:
- `GET /tasks` - Fetch all tasks
- `GET /tasks/:id` - Fetch single task
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update existing task
- `DELETE /tasks/:id` - Delete task

### Data Transformation:
The API uses different field names than the frontend, so data is transformed:
- API `name` → Frontend `title`
- API `status` (TODO/DONE) → Frontend `completed` (boolean)

## Key Design Decisions

### Why React Query?
React Query handles caching, background refetching, and loading states automatically, reducing boilerplate code and improving user experience.

### Why Tailwind CSS?
Tailwind provides utility classes that make it easy to create responsive, consistent designs without writing custom CSS. It's also highly customizable and has excellent performance.

### Component Structure
Components are organized by purpose:
- Reusable UI components in `/components`
- Full page views in `/pages`
- Business logic separated into `/services`

### Error Handling
Multiple layers of error handling:
- Error Boundary catches React component errors
- API error handling with user-friendly messages
- 404 page for invalid routes
- Loading states to prevent confusion

## Accessibility Features

- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Skip to main content link
- Focus management in modals
- Color contrast compliance (WCAG AA)

## Project Status

### Implemented Features
- Complete CRUD operations (Create, Read, Update, Delete)
- Pagination with user-friendly controls
- Search and filtering by status
- Error boundaries and 404 page
- Responsive design
- SEO and accessibility features
- Real API integration

### Bonus Features Not Implemented
Due to time constraints, the following bonus features were not implemented:

**Authentication & User Management:**
- User signup and login flows
- Protected routes
- User-specific tasks
- User profile page

**Real-Time Notifications:**
- WebSocket integration
- Live task updates
- Notification center

**Offline Capabilities:**
- Service workers
- Offline mode
- Cache strategies

These features are documented as future improvements and would require additional backend support (authentication endpoints, WebSocket server).

## Known Issues and Future Improvements

### Current Limitations:
- No user authentication (todos are public)
- No offline support
- Limited to 10 items per page (not configurable)

### Planned Improvements:
- Add user authentication
- Implement real-time updates via WebSocket
- Add offline capability with service workers
- Todo categories and tags
- Due dates and reminders
- Drag-and-drop reordering
- Dark mode support

## Deployment

The application is deployed on Vercel at: https://todo-application-project.vercel.app

### Build for Production:
```bash
npm run build
```

The build output will be in the `dist/` folder, ready for deployment.

## Development Challenges and Solutions

### Challenge 1: API Data Format Mismatch
**Problem:** The API returns tasks with `name` and `status` fields, but the frontend uses `title` and `completed`.

**Solution:** Created a transformation layer in the API service that converts between formats seamlessly.

### Challenge 2: Pagination with Search/Filters
**Problem:** Pagination needed to work correctly with search and filter results.

**Solution:** Implemented client-side pagination that recalculates based on filtered data and resets to page 1 when filters change.

### Challenge 3: Modal Focus Management
**Problem:** Users could tab outside modals, breaking accessibility.

**Solution:** Added focus trapping and proper ARIA attributes to modals, with escape key support.

## Author

Created by Eme for the ALT School of Engineering Frontend Second Semester Project Examination.

## License

This project was created for educational purposes.