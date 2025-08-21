import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [], // each task: {id, text, completed}
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(), // unique ID
        text: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);

      // Persist to localStorage
      const stored = JSON.parse(localStorage.getItem('tasks')) || [];
      stored.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(stored));
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    clearTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem('tasks');
    },

    loadTasks: (state) => {
      const stored = JSON.parse(localStorage.getItem('tasks')) || [];
      state.tasks = stored;
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask, clearTasks, loadTasks } = counterSlice.actions;
export default counterSlice.reducer;

git remote set-url origin git@github.com:Brijmohan348/Todo-App.git
git push -u origin main
