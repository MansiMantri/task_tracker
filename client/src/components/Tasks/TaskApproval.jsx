// import React, { useState, useEffect } from 'react';
// import { Button, message, Popconfirm } from 'antd';
// import { UndoOutlined } from '@ant-design/icons';

// const TaskApproval = ({ task, currentUser, onStatusChange }) => {
//   const [taskStatus, setTaskStatus] = useState(task.status);
//   const [previousStatus, setPreviousStatus] = useState(null);
//   const [lastAction, setLastAction] = useState(null);
//   const [canUndo, setCanUndo] = useState(false);
  
//   // Reset undo availability after some time (e.g., 30 seconds)
//   useEffect(() => {
//     let undoTimer;
//     if (canUndo) {
//       undoTimer = setTimeout(() => {
//         setCanUndo(false);
//       }, 30000); // 30 seconds to undo
//     }
//     return () => clearTimeout(undoTimer);
//   }, [canUndo]);

//   // Function to handle task approval
//   const handleApprove = () => {
//     try {
//       // Store the current status before updating
//       setPreviousStatus(taskStatus);
//       setLastAction('approved');
      
//       // Update task status in local storage
//       updateTaskStatusInLocalStorage(task.id, 'approved', currentUser.id);
      
//       // Update local state
//       setTaskStatus('approved');
//       setCanUndo(true);
      
//       // Notify parent component of status change
//       if (onStatusChange) {
//         onStatusChange(task.id, 'approved');
//       }
      
//       message.success('Task approved successfully');
//     } catch (error) {
//       message.error('Failed to approve task');
//       console.error('Error approving task:', error);
//     }
//   };

//   // Function to handle task rejection
//   const handleReject = () => {
//     try {
//       // Store the current status before updating
//       setPreviousStatus(taskStatus);
//       setLastAction('rejected');
      
//       // Update task status in local storage
//       updateTaskStatusInLocalStorage(task.id, 'rejected', currentUser.id);
      
//       // Update local state
//       setTaskStatus('rejected');
//       setCanUndo(true);
      
//       // Notify parent component of status change
//       if (onStatusChange) {
//         onStatusChange(task.id, 'rejected');
//       }
      
//       message.success('Task rejected');
//     } catch (error) {
//       message.error('Failed to reject task');
//       console.error('Error rejecting task:', error);
//     }
//   };

//   // Function to handle undoing the last action
//   const handleUndo = () => {
//     try {
//       // Revert to previous status in local storage
//       updateTaskStatusInLocalStorage(task.id, previousStatus, currentUser.id, true);
      
//       // Update local state
//       setTaskStatus(previousStatus);
//       setCanUndo(false);
      
//       // Notify parent component of status change
//       if (onStatusChange) {
//         onStatusChange(task.id, previousStatus);
//       }
      
//       message.success(`Undid ${lastAction} action`);
//     } catch (error) {
//       message.error('Failed to undo action');
//       console.error('Error undoing action:', error);
//     }
//   };

//   // Function to update task status in local storage
//   const updateTaskStatusInLocalStorage = (taskId, status, userId, isUndo = false) => {
//     // Get tasks from localStorage
//     const tasksJSON = localStorage.getItem('tasks');
//     const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    
//     // Find the task to update
//     const taskIndex = tasks.findIndex(t => t.id === taskId);
    
//     if (taskIndex === -1) {
//       throw new Error('Task not found');
//     }
    
//     // Create a history entry
//     const historyEntry = {
//       action: isUndo ? 'undo' : (status === 'approved' ? 'approve' : 'reject'),
//       from: isUndo ? tasks[taskIndex].status : tasks[taskIndex].status || 'pending',
//       to: status,
//       by: userId,
//       timestamp: new Date().toISOString()
//     };
    
//     // Update the task
//     if (!isUndo) {
//       tasks[taskIndex].lastStatus = tasks[taskIndex].status;
//     }
    
//     tasks[taskIndex].status = status;
    
//     // Add to history if it doesn't exist
//     if (!tasks[taskIndex].history) {
//       tasks[taskIndex].history = [];
//     }
    
//     tasks[taskIndex].history.push(historyEntry);
    
//     // Save back to localStorage
//     localStorage.setItem('tasks', JSON.stringify(tasks));
    
//     // Also update sessionStorage if you're using it
//     if (sessionStorage.getItem('tasks')) {
//       sessionStorage.setItem('tasks', JSON.stringify(tasks));
//     }
    
//     return tasks[taskIndex];
//   };

//   return (
//     <div className="task-approval-actions">
//       <h3>Task: {task.title}</h3>
//       <p>Status: <strong>{taskStatus}</strong></p>
      
//       {/* Show approve/reject buttons only if user is an approver and task is pending */}
//       {currentUser.role === 'approver' && taskStatus === 'pending' && (
//         <div className="action-buttons">
//           <Button 
//             type="primary" 
//             onClick={handleApprove}
//             style={{ marginRight: '10px' }}
//           >
//             Approve
//           </Button>
//           <Button 
//             danger 
//             onClick={handleReject}
//           >
//             Reject
//           </Button>
//         </div>
//       )}
      
//       {/* Show undo button if the user just took an action */}
//       {canUndo && (
//         <Popconfirm
//           title={`Undo ${lastAction} action?`}
//           onConfirm={handleUndo}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Button 
//             icon={<UndoOutlined />} 
//             style={{ marginTop: '10px' }}
//           >
//             Undo {lastAction === 'approved' ? 'Approval' : 'Rejection'}
//           </Button>
//         </Popconfirm>
//       )}
//     </div>
//   );
// };

// export default TaskApproval;
import React, { useState, useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

const TaskApproval = ({ task, currentUser, onStatusChange }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [previousStatus, setPreviousStatus] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    let undoTimer;
    if (canUndo) {
      undoTimer = setTimeout(() => setCanUndo(false), 30000);
    }
    return () => clearTimeout(undoTimer);
  }, [canUndo]);

  const handleApprove = () => {
    try {
      setPreviousStatus(taskStatus);
      setLastAction('approved');
      updateTaskStatusInLocalStorage(task.id, 'approved', currentUser.id);
      setTaskStatus('approved');
      setCanUndo(true);
      if (onStatusChange) onStatusChange(task.id, 'approved');
      message.success('Task approved successfully');
    } catch (error) {
      message.error('Failed to approve task');
      console.error('Error approving task:', error);
    }
  };

  const handleReject = () => {
    try {
      setPreviousStatus(taskStatus);
      setLastAction('rejected');
      updateTaskStatusInLocalStorage(task.id, 'rejected', currentUser.id);
      setTaskStatus('rejected');
      setCanUndo(true);
      if (onStatusChange) onStatusChange(task.id, 'rejected');
      message.success('Task rejected');
    } catch (error) {
      message.error('Failed to reject task');
      console.error('Error rejecting task:', error);
    }
  };

  const handleUndo = () => {
    try {
      updateTaskStatusInLocalStorage(task.id, previousStatus, currentUser.id, true);
      setTaskStatus(previousStatus);
      setCanUndo(false);
      if (onStatusChange) onStatusChange(task.id, previousStatus);
      message.success(`Undid ${lastAction} action`);
    } catch (error) {
      message.error('Failed to undo action');
      console.error('Error undoing action:', error);
    }
  };

  const updateTaskStatusInLocalStorage = (taskId, status, userId, isUndo = false) => {
    const tasksJSON = localStorage.getItem('tasks');
    const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) throw new Error('Task not found');

    const historyEntry = {
      action: isUndo ? 'undo' : (status === 'approved' ? 'approve' : 'reject'),
      from: isUndo ? tasks[taskIndex].status : tasks[taskIndex].status || 'pending',
      to: status,
      by: userId,
      timestamp: new Date().toISOString()
    };

    if (!isUndo) tasks[taskIndex].lastStatus = tasks[taskIndex].status;
    tasks[taskIndex].status = status;

    if (!tasks[taskIndex].history) tasks[taskIndex].history = [];
    tasks[taskIndex].history.push(historyEntry);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (sessionStorage.getItem('tasks')) {
      sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return tasks[taskIndex];
  };

  return (
    <div className="task-approval-actions bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow-md space-y-4 transition-colors duration-300">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm">
        Status: <span className="font-semibold capitalize">{taskStatus}</span>
      </p>

      {currentUser.role === 'approver' && taskStatus === 'pending' && (
        <div className="flex gap-3">
          <Button
            type="primary"
            className="!bg-green-600 hover:!bg-green-700 !text-white dark:!bg-green-500 dark:hover:!bg-green-600"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            danger
            className="dark:!bg-red-600 dark:hover:!bg-red-700"
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      )}

      {canUndo && (
        <Popconfirm
          title={`Undo ${lastAction} action?`}
          onConfirm={handleUndo}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<UndoOutlined />}
            className="!bg-yellow-100 dark:!bg-yellow-900 dark:!text-yellow-200 mt-3"
          >
            Undo {lastAction === 'approved' ? 'Approval' : 'Rejection'}
          </Button>
        </Popconfirm>
      )}
    </div>
  );
};

export default TaskApproval;
