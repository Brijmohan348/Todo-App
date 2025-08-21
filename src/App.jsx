import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  clearTasks,
  loadTasks
} from './counterSlice';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.counter.tasks);

  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  useEffect(() => {
    filterTasks(filterValue);
  }, [tasks, filterValue]);

  const handleAddOrEdit = () => {
    if (!inputValue.trim()) return;

    if (editingId) {
      dispatch(editTask({ id: editingId, newText: inputValue }));
      setEditingId(null);
    } else {
      dispatch(addTask(inputValue));
    }
    setInputValue('');
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setInputValue(task.text);
  };

  const handleStatusChange = (taskId, status) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const isCompleted = status === 'completed';
    if (task.completed !== isCompleted) dispatch(toggleTask(taskId));
  };

  const filterTasks = (searchText) => {
    const filtered = tasks
      .filter(task => task.text.toLowerCase().includes(searchText.toLowerCase()))
      .sort((a, b) => a.completed - b.completed); // Pending first
    setFilteredTasks(filtered);
  };

  const handleSearchButton = () => {
    filterTasks(filterValue);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">React To-Do List</h1>

      {/* Add/Edit Input */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a new task"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAddOrEdit(); }}
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddOrEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        <button
          onClick={() => dispatch(clearTasks())}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Clear All
        </button>
      </div>

      {/* Filter/Search */}
      <div className="flex mb-6 gap-2">
        <input
          type="text"
          value={filterValue}
          placeholder="Search tasks"
          onChange={(e) => setFilterValue(e.target.value)} // dynamic filter
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearchButton} // explicit filter
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-lg shadow ${
              task.completed ? 'border-l-4 border-green-500 bg-green-50' : 'border-l-4 border-red-500 bg-red-50'
            }`}
          >
            <span className="text-lg font-medium text-gray-800">{task.text}</span>

            <div className="flex items-center gap-2">
              <select
                value={task.completed ? 'completed' : 'pending'}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
