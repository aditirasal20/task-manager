'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

type Task = {
  id: string;
  name: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setTasks(tasksList);
    };
    fetchTasks();
  }, []);

  // Add a task
  const addTask = async () => {
    if (newTask.trim()) {
      const docRef = await addDoc(collection(db, 'tasks'), {
        name: newTask,
      });
      setTasks(prev => [...prev, { id: docRef.id, name: newTask }]);
      setNewTask('');
    }
  };

  // Delete a task
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Task Manager</h1>

      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="New Task"
        style={{ marginRight: 10 }}
      />
      <button onClick={addTask}>Add</button>

      <ul style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button
              onClick={() => handleDelete(task.id)}
              style={{ marginLeft: 10, color: 'red', cursor: 'pointer' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
