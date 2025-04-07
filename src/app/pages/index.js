import { useEffect, useState } from 'react';
import { auth, db, provider } from '../../../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  const addTask = async () => {
    if (!task.trim() || !user) return;
    await addDoc(collection(db, 'tasks'), {
      text: task,
      uid: user.uid,
      createdAt: new Date()
    });
    setTask('');
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Task Manager</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName} <button onClick={handleLogout}>Logout</button></p>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTask}>Add</button>

          <ul>
            {tasks.map(t => (
              <li key={t.id}>
                {t.text} <button onClick={() => deleteTask(t.id)}>❌</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}
