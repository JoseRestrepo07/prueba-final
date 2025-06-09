import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'
import icono from '../assets/icono.webp'
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];

        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);

        Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
        navigate('/dashboard');
      } else {
        Swal.fire('Error', 'Correo o contraseña incorrectos', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Algo salió mal al conectar con la API', 'error');
    }
  };

  return (
    <div className="login-container">
      <div className="icon-circle">
    <img src={icono} alt="Icono Usuario" />
      </div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
};

export default LoginForm;