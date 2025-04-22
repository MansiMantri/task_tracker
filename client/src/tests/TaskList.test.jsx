import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskList from '../components/Tasks/TaskList';
import AuthContext  from '../context/AuthContext';
import TaskContext  from '../context/TaskContext';
import userEvent from '@testing-library/user-event';

// Mock contexts with complete task data including dates
const submitterUser = { id: '1', name: 'John Doe', role: 'submitter' };
const approverUser = { id: '2', name: 'Jane Smith', role: 'approver' };
const tasks = [
  { 
    id: 't1', 
    title: 'Task 1', 
    status: 'pending', 
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 't2', 
    title: 'Task 2', 
    status: 'approved', 
    createdBy: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function renderWithContexts(ui, { user, tasksList }) {
  return render(
    <AuthContext.Provider value={{ currentUser: user }}>
      <TaskContext.Provider value={{ tasks: tasksList, filteredTasks: tasksList, updateTask: vi.fn() }}>
        {ui}
      </TaskContext.Provider>
    </AuthContext.Provider>
  );
}

test('Submitter cannot see drag-and-drop columns', () => {
  renderWithContexts(<TaskList />, { user: submitterUser, tasksList: tasks });
  // Should see "Your Tasks" but not the column headers for statuses
  expect(screen.getByText(/Your Tasks/i)).toBeInTheDocument();
  // Check that the drag-and-drop board is not present
  expect(screen.queryByRole('button', { name: /Create Task/i })).toBeInTheDocument();
  expect(screen.queryByTestId('drag-drop-board')).not.toBeInTheDocument();
});

test('Approver can see drag-and-drop columns', () => {
  renderWithContexts(<TaskList />, { user: approverUser, tasksList: tasks });
  // Should see the column headers for statuses
  const columns = screen.getAllByRole('heading', { level: 4 });
  expect(columns.some(col => col.textContent.toLowerCase() === 'pending')).toBe(true);
  expect(columns.some(col => col.textContent.toLowerCase() === 'approved')).toBe(true);
});

test('TaskForm is shown when submitter clicks "Create Task"', async () => {
  const user = userEvent.setup();
  renderWithContexts(<TaskList />, { user: submitterUser, tasksList: tasks });
  
  // Form should not be visible initially
  expect(screen.queryByText('Create New Task')).not.toBeInTheDocument();
  
  // Click "Create Task"
  const createButton = screen.getByRole('button', { name: /Create Task/i });
  await user.click(createButton);
  
  // Now the form should appear
  expect(screen.getByText('Create New Task')).toBeInTheDocument();
});