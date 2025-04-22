// Default mock users
const defaultUsers = [
  { id: '1', name: 'John Doe', role: 'submitter', password: 'password123' },
  { id: '2', name: 'Jane Smith', role: 'approver',password: 'password123' },
  { id: '3', name: 'Mike Johnson', role: 'submitter',password: 'password123' },
];

// Get users from localStorage or use defaults
export const getUsers = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  
  // Initialize with default users if none exist
  localStorage.setItem('users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

// Store current user in localStorage
export const storeCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Get tasks from localStorage
export const getTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Store tasks in localStorage
export const storeTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear all localStorage data (for testing)
export const clearStorage = () => {
  localStorage.removeItem('tasks');
  localStorage.removeItem('currentUser');
 
};