import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import TaskContext from '../../context/TaskContext';

function TaskList() {
  const { currentUser } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');

  // Filter tasks based on selected filter
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter);

  // Group tasks by status for board view
  const statusGroups = ['pending', 'approved', 'rejected', 'done'];
  const groupedTasks = statusGroups.reduce((acc, status) => {
    acc[status] = filteredTasks.filter(task => task.status === status);
    return acc;
  }, {});

  return (
    <div>
      <h2>Task Dashboard</h2>
      {/* Only show filter buttons for submitters */}
      {currentUser.role === 'submitter' && (
  <div style={{ marginBottom: '1rem' }}>
    <button onClick={() => setFilter('all')} disabled={filter === 'all'}>All Tasks</button>
    <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>Pending</button>
    <button onClick={() => setFilter('approved')} disabled={filter === 'approved'}>Approved</button>
    <button onClick={() => setFilter('rejected')} disabled={filter === 'rejected'}>Rejected</button>
    <button onClick={() => setFilter('done')} disabled={filter === 'done'}>Done</button>
  </div>
)}

      <div style={{ display: 'flex', gap: '2rem' }}>
        {statusGroups.map(status => (
          <div key={status} style={{ flex: 1, background: '#f7f7f7', padding: '1rem', borderRadius: '8px' }}>
            <strong style={{ textTransform: 'capitalize' }}>{status}</strong>
            {groupedTasks[status] && groupedTasks[status].length > 0 ? (
              groupedTasks[status].map(task => (
                <div key={task.id} style={{ margin: '1rem 0', padding: '1rem', background: '#fff', borderRadius: '6px', boxShadow: '0 1px 4px #eee' }}>
                  <div><strong>{task.title}</strong></div>
                  <div>{task.description}</div>
                  <div style={{ fontSize: '0.85em', color: '#888' }}>
                    Created by: {task.createdByName || task.createdBy}<br />
                    Created at: {new Date(task.createdAt).toLocaleString()}
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <span style={{
                      background: status === 'pending' ? '#ffe58f'
                        : status === 'approved' ? '#b7eb8f'
                        : status === 'rejected' ? '#ffa39e'
                        : '#d9d9d9',
                      color: '#333',
                      padding: '0.2em 0.7em',
                      borderRadius: '12px',
                      fontSize: '0.85em'
                    }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#aaa', marginTop: '1rem' }}>No tasks</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;