import { useState, useEffect } from 'react';
import '../styles/Dashboard.css'

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const { name, className } = user;

  useEffect(() => {
    fetch('https://api-backend-1-01s5.onrender.com/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const toggleDone = async (id, done) => {
    await fetch(`https://api-backend-1-01s5.onrender.com/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done }),
    });

    setTasks(tasks.map(t => t.id === id ? { ...t, done: !done } : t));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Bienvenido, Aqui tus tareas</h1>
      </div>

      <h2 style={{ color: '#00bcd4' }}>Tarea Asignada: {className}</h2>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id, task.done)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;