'use client'
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') as string) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskChange = (e) => {
    setTaskText(e.target.value);
  };

  const addTask = () => {
    if (taskText.trim() === '') return;

    if (editTaskId) {
      // Editing an existing task
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { id: task.id, text: taskText } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setTaskText('');
    } else {
      // Adding a new task
      const newTask = { id: uuidv4(), text: taskText };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };
  const editTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskText(taskToEdit.text);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setEditTaskId(null);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <input
        className="w-full py-2 px-3 border rounded mb-4"
        type="text"
        placeholder="Enter a task"
        value={taskText}
        onChange={handleTaskChange}
      />
       <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={addTask}
      >
        {editTaskId ? 'Update' : 'Add'}
      </button>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-3 mb-2 border rounded shadow"
          >
            <span>{task.text}</span>
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => editTask(task.id)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      </div>

    </main>
  )
}
