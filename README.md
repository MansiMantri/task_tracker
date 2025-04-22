# Task Tracker
A role-based task tracker built with React and localStorage.

🌐 **Live App**: [https://task-tracker-nu-blond.vercel.app](https://task-tracker-nu-blond.vercel.app)

---
## 🚀 Overview

This app demonstrates role-based access control (RBAC) for a simple workflow:
- **Submitters** can:
  - Create, view, edit, and delete their own `"pending"` tasks
- **Approvers** can:
  - View all tasks
  - Approve or reject `"pending"` tasks
  - Mark `"approved"` tasks as `"done"`
- Both roles can **filter tasks by status**
- All data (users, tasks) is persisted in localStorage.
- Task data is stored using `localStorage`
- Authentication is implemented using mock `JWT`

## Setup & Run

1. **Navigate to the frontend folder**:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
4. (Optional) Run tests:
   ```bash
   npm run test
    ```

## Features

- Role-based UI & permissions (Submitter/Approver)
- Drag-and-drop task board for approvers
- Persistent tasks and users using localStorage
- Simple JWT authentication with mock users
- Filtering by task status
- Created date/time and creator name shown in task list
- ≥ 2 automated tests for RBAC/UI logic

## Default Users

- **Submitter:**  
Username: John Doe  
Password: password123

- **Approver:**  
Username: Jane Smith  
Password: password123

- **Submitter:**  
Username: Mike Johnson  
Password: password123

---

## Tech Stack

- Frontend: React + Tailwind CSS + React Router
- State & Storage: React Context API + localStorage
- Auth: JWT (mocked)
- UI Components: Ant Design (for some buttons/popups)
- Testing: React Testing Library + Vitest
- Deployment: Vercel

---
Enjoy tracking your tasks!
