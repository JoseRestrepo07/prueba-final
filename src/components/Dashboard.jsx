import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Elimina email, rol, nombre, etc.
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Panel de {role === 'teacher' ? 'Docente' : 'Estudiante'}</h1>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </div>

      {role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;