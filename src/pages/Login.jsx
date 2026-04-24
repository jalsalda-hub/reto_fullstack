import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación simple de Auth. Para la Fase 1, validamos cualquier email con correo "@"
    if (email.includes('@') && password.length >= 6) {
      // Creamos un User falso
      const fakeUser = {
        name: email.split('@')[0], // username basado en el mail
        email: email,
        avatar: 'https://i.pravatar.cc/150?img=11'
      };
      
      login(fakeUser);
      navigate('/'); // Redirigimos al home tras el login exitoso
    } else {
      setError('Credenciales inválidas. Usa correo válido y pw > 6 chars.');
    }
  };

  return (
    <div className="flex items-center justify-center py-20 bg-gray-50 flex-1">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Bienvenido de nuevo</h2>
          <p className="text-gray-500 mt-2">Ingresa a tu cuenta de Hexashop</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <Input 
              type="email" 
              placeholder="tu@correo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button variant="primary" type="submit" className="w-full py-3">
            Iniciar Sesión
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <span className="font-semibold text-gray-900 cursor-pointer hover:underline">Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default Login;