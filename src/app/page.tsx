'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      setTasks(querySnapshot.docs.map(doc => doc.data().text));
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      await addDoc(collection(db, 'tasks'), { text: newTask });
      setTasks(prev => [...prev, newTask]);
      setNewTask('');
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <input 
        value={newTask} 
        onChange={e => setNewTask(e.target.value)} 
        placeholder="New Task" 
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, idx) => <li key={idx}>{task}</li>)}
      </ul>
    </main>
  );
}
