# Student CRUD Frontend (Vite + React + Tailwind CSS)

Modern, responsive frontend for the Spring Boot Student API built with **React**, **Vite**, and **Tailwind CSS**. Designed completely **without pop-up modals** for a streamlined workflow.

---

## 🚀 Features

- **No Modals**:
  - **Inline Add / Edit Form**: Switching to Edit mode populates the form on the left, highlights the edited record in the table, and provides an instant "Cancel" action.
  - **Inline Delete Confirmation**: Clicking delete switches the specific table row into a confirm/cancel prompt right inside the table, preventing accidental deletions without any annoying popup dialogs.
- **Full CRUD Support**:
  - `GET /gomez/students`: Lists all students.
  - `POST /gomez/students`: Creates new student (`firstname`, `lastname`, `course`, `section`).
  - `PUT /gomez/students/:id`: Updates student details.
  - `DELETE /gomez/students/:id`: Deletes student.
- **Search & Real-time Filter**: Instant search across name, course, and section, plus a course filter dropdown.
- **Dashboard Stats**: Displays total students, unique active courses, and sections.
- **Vite Reverse Proxy**: Automatically proxies requests from `/gomez` to `http://localhost:8080`.

---

## 🛠️ Running the Frontend

### 1. Install dependencies (if not already installed)
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

The application will start at:
👉 **`http://localhost:3000`**

### 3. Production Build
```bash
npm run build
```

---

## 🔌 Backend Configuration
Ensure your Spring Boot backend is running on `http://localhost:8080`.
The Vite development server is pre-configured in `vite.config.js` to proxy `/gomez/*` API requests directly to `http://localhost:8080`.
