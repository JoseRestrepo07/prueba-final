import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/Dashboard.css'

const TeacherDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    const taskObj = { title: newTask, done: false };

    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskObj),
    });

    if (res.ok) {
      const newTaskFromServer = await res.json(); // para obtener el ID generado
      setTasks([...tasks, newTaskFromServer]);
      setNewTask('');
      Swal.fire('Tarea añadida', '', 'success');
    }
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter(t => t.id !== id));
    Swal.fire('Tarea eliminada', '', 'info');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Gestión de Tareas (Docente)</h1>
        {/* Aquí podrías poner el botón de logout */}
      </div>

      <div className="add-task-form">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            {task.title}
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;