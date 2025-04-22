import { useTasks } from '../../context/TaskContext';

const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">
        Filter Tasks
      </label>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === item.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
