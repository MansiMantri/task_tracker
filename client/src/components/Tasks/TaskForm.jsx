import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';

const TaskForm = ({ editTask = null, onClose = null }) => {
  const { addTask, updateTask } = useTasks();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: editTask ? editTask.title : '',
    description: editTask ? editTask.description : '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editTask) {
      updateTask(editTask.id, formData);
    } else {
      addTask(formData, currentUser.id, currentUser.name);
    }

    if (onClose) {
      onClose();
    } else {
      setFormData({ title: '', description: '' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md space-y-6 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold">
        {editTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-2 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border ${
            errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {editTask ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
