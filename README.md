```md
# Todo Application (TypeScript Version)

A modern, full-featured Todo application built with **React + TypeScript**, designed to help users manage daily tasks efficiently while showcasing scalable frontend architecture, type safety, and clean UI practices.

This project demonstrates real-world experience with API integration, state management using React Query, and building responsive, accessible interfaces.

---

## Features

### Core Features

- View all todos with pagination (10 items per page)
- Real-time search by title
- Filter todos by status (All / Completed / Incomplete)
- View detailed information for each todo
- Create new todos (title + description)
- Edit existing todos
- Delete todos with confirmation modal
- Mark todos as complete/incomplete

---

### Technical Features

- Fully typed with **TypeScript**
- Client-side routing with nested routes
- Error Boundary for graceful error handling
- Custom 404 page
- Responsive design (mobile and desktop)
- Loading and error states for API calls
- Accessibility features (ARIA labels, keyboard navigation, skip links)
- Code splitting using React Suspense
- Clean separation of concerns (components, pages, services, types)

---

## Technology Stack

- **React 19 + TypeScript** — UI development with type safety
- **React Router** — Client-side routing
- **TanStack Query (React Query)** — Data fetching, caching, mutations
- **Axios** — API requests
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icons
- **Vite** — Development and build tool

---

## Project Structure
```

todo-app/
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── ErrorBoundary.tsx
│ │ ├── Modal.tsx
│ │ ├── Pagination.tsx
│ │ ├── SkipLink.tsx
│ │ ├── TodoFilters.tsx
│ │ ├── TodoForm.tsx
│ │ └── TodoList.tsx
│ ├── pages/  
│ │ ├── ErrorTestPage.tsx
│ │ ├── NotFoundPage.tsx
│ │ ├── TodoDetailPage.tsx
│ │ └── TodoListPage.tsx
│ ├── services/  
│ │ └── api.ts
│ ├── types/  
│ │ └── types.ts
│ ├── App.tsx  
│ ├── main.tsx  
│ └── index.css
│ └── settings.json
│ └── vite-env.d.ts  
├── index.html
├── package-lock.json
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md

````

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

---

### Installation

1. Clone the repository
```bash
git clone https://github.com/Bonggx/Todo-Application-Project.git
cd todo-app
````

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

---

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## API Integration

The application connects to:

```
https://api.oluwasetemi.dev
```

### Endpoints Used:

- `GET /tasks` — Fetch all todos
- `GET /tasks/:id` — Fetch a single todo
- `POST /tasks` — Create a todo
- `PATCH /tasks/:id` — Update a todo
- `DELETE /tasks/:id` — Delete a todo

---

### Data Transformation

The API uses different field names than the frontend, so a transformation layer is implemented:

- API `name` → Frontend `title`
- API `status` → Frontend `completed` (boolean)

---

## Key Design Decisions

### TypeScript Migration

The project was migrated from JavaScript to TypeScript to:

- Improve type safety
- Catch bugs early
- Enhance maintainability
- Improve developer experience

---

### React Query

Used for:

- Server state management
- Automatic caching
- Background refetching
- Handling mutations efficiently

---

### Tailwind CSS

Chosen for:

- Rapid UI development
- Consistent styling
- Responsive design utilities
- Minimal custom CSS

---

### Architecture

- **Components** → reusable UI elements
- **Pages** → route-based views
- **Services** → API logic
- **Types** → centralized TypeScript definitions

---

## Accessibility Features

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Skip-to-content link
- Focus management in modals
- WCAG-compliant color contrast

---

## Project Status

### Implemented Features

- Full CRUD operations (Create, Read, Update, Delete)
- Pagination, search, and filtering
- API integration
- TypeScript migration
- Error handling and 404 page
- Responsive UI

---

### Future Improvements

- Authentication (login/signup)
- User-specific todos
- Real-time updates (WebSockets)
- Offline support (PWA)
- Categories and tags
- Due dates and reminders
- Drag-and-drop reordering
- Dark mode

---

## Known Limitations

- No user authentication (todos are public)
- No offline support
- Fixed pagination size

---

## Deployment

The application is deployed on Vercel at:

```
https://ts-todo-app-pi.vercel.app
```

---

## Development Challenges and Solutions

### Challenge 1: Type Migration

**Problem:** Transitioning from JavaScript to TypeScript introduced type inconsistencies.

**Solution:** Centralized types in `/types` and enforced strict typing across components and API.

---

### Challenge 2: API Data Mismatch

**Problem:** Backend fields differed from frontend expectations.

**Solution:** Implemented a transformation layer in the API service.

---

### Challenge 3: UI Not Updating After Mutations

**Problem:** Changes were not immediately reflected in the UI.

**Solution:** Used React Query’s `invalidateQueries` to refetch updated data.

---

## Author

Created by Bongg for the ALT School of Engineering Frontend Second Semester Project Examination.

---

## License

This project is for educational and portfolio purposes.

```

```
