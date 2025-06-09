import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import icono from '../assets/icono.webp'
import '../styles/RegisterForm.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api-backend-1-01s5.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role}),
      });

      if (res.ok) {
        Swal.fire('Registrado', 'Cuenta creada con éxito', 'success');
        navigate('/');
      } else {
        Swal.fire('Error', 'No se pudo registrar', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Fallo al conectar con la API', 'error');
    }
  };

  return (
    <div className="register-container">
      <div className="icon-circle">
    <img src={icono} alt="Icono Usuario" />
      </div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="student">Estudiante</option>
          <option value="teacher">Docente</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </div>
  );
};

export default RegisterForm;