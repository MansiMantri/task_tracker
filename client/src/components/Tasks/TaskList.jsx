import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import RoleGate from '../Auth/RoleGate';
import TaskForm from './TaskForm';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const STATUSES = ['pending', 'approved', 'rejected','done'];

const TaskList = () => {
  const { currentUser } = useAuth();
  const { tasks, updateTask, filteredTasks } = useTasks(); // <-- add filteredTasks here
  const [showForm, setShowForm] = useState(false);

  const isSubmitter = currentUser.role === 'submitter';

  // Group tasks by status for columns
  const tasksByStatus = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    // If dropped in a different column, update status
    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }
    // Optionally, handle reordering within the same column if needed
  };

  return (
    <div className="transition-colors duration-300">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Task Dashboard
          </h2>
          <RoleGate allowed={['submitter']}>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow"
            >
              {showForm ? 'Hide Form' : 'Create Task'}
            </button>
          </RoleGate>
        </div>
        <TaskFilter />
        {showForm && (
          <RoleGate allowed={['submitter']}>
            <div className="mt-6">
              <TaskForm />
            </div>
          </RoleGate>
        )}
      </div>

      {/* Submitter: show normal list */}
      <RoleGate allowed={['submitter']}>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Your Tasks
          </h3>
          {filteredTasks
            .filter((task) => task.createdBy === currentUser.id)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div>
      </RoleGate>

      {/* Approver: show board with columns */}
      <RoleGate allowed={['approver']}>
        <div className="flex gap-4">
          <DragDropContext onDragEnd={onDragEnd}>
            {STATUSES.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex-1 min-h-[300px]"
                  >
                    <h4 className="font-bold capitalize mb-2">{status}</h4>
                    {tasksByStatus[status].length === 0 ? (
                      <p className="text-gray-400 italic">No tasks</p>
                    ) : (
                      tasksByStatus[status].map((task, idx) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={idx}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2"
                            >
                              <TaskItem task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </RoleGate>
    </div>
  );
};

export default TaskList;
