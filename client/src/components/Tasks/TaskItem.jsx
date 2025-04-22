import { useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import RoleGate from '../Auth/RoleGate';
import TaskForm from './TaskForm';

const TaskItem = ({ task }) => {
  const { currentUser } = useAuth();
  const { deleteTask, changeTaskStatus } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = currentUser.id === task.createdBy;
  const canEdit = isOwner && task.status === 'pending';

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    done: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const handleStatusChange = (newStatus) => {
    changeTaskStatus(task.id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
        <TaskForm editTask={task} onClose={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        <p>Created by: {task.creatorName}</p>
        <p>Created at: {format(new Date(task.createdAt), 'MMM d, yyyy h:mm a')}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <RoleGate allowed={['submitter']}>
          {canEdit && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
              >
                Delete
              </button>
            </>
          )}
        </RoleGate>

        <RoleGate allowed={['approver']}>
          {task.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusChange('approved')}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-800"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
              >
                Reject
              </button>
            </>
          )}

          {task.status === 'approved' && (
            <button
              onClick={() => handleStatusChange('done')}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              Mark as Done
            </button>
          )}
        </RoleGate>
      </div>
    </div>
  );
};

export default TaskItem;
