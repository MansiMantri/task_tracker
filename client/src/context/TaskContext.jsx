import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTasks, storeTasks } from '../services/localStorage';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load tasks from localStorage on mount
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    setFilteredTasks(loadedTasks);
  }, []);

  useEffect(() => {
    // Apply filters whenever tasks or filter changes
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filter));
    }
  }, [tasks, filter]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  const addTask = (taskData, userId, userName) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: userId,
      creatorName: userName
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };
  const reorderTasks = (startIndex, endIndex) => {
    const updated = Array.from(filteredTasks);
    const [moved] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, moved);
  
    setFilteredTasks(updated);
  
    // Update the main tasks array too
    const newTaskOrder = tasks.map(task =>
      updated.find(t => t.id === task.id) || task
    );
    setTasks(newTaskOrder);
  };
  
  
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const changeTaskStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      filter,
      setFilter,
      addTask,
      updateTask,
      deleteTask,
      changeTaskStatus,
      reorderTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;