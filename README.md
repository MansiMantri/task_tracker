# Task Tracker

A full-stack intern take-home assignment: a role-based task tracker built with React and localStorage.

## Overview

This app demonstrates role-based access control (RBAC) for a simple workflow:
- **Submitters** can create, view, edit, and delete their own tasks (status: pending).
- **Approvers** can view all pending tasks, approve/reject them, and later mark approved tasks as done.
- Both roles can filter tasks by status.
- All data (users, tasks) is persisted in localStorage.

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   ```bash
   npm run dev
   ```
3. (Optional) Run tests:
   ```bash
   npm run test
    ```

## Features

- Role-based access (Submitter/Approver)
- Drag-and-drop task board for approvers
- Persistent tasks and users using localStorage
- Simple authentication with mock users
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

Enjoy tracking your tasks!