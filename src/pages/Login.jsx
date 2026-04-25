import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      let result;
      if (isRegistering) {
        result = await register(email, password);
      } else {
        result = await login(email, password);
      }

      if (result.success) {
        navigate('/'); // Redirigimos al home tras éxito
      } else {
        // Traducimos algunos errores comunes de Firebase
        let errorMsg = 'Error al procesar la solicitud.';
        if (result.error.includes('auth/invalid-credential') || result.error.includes('auth/user-not-found') || result.error.includes('auth/wrong-password')) {
          errorMsg = 'Credenciales incorrectas.';
        } else if (result.error.includes('auth/email-already-in-use')) {
          errorMsg = 'El correo ya está registrado.';
        } else if (result.error.includes('auth/invalid-email')) {
          errorMsg = 'El formato del correo es inválido.';
        } else {
          errorMsg = result.error;
        }
        setError(errorMsg);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20 bg-gray-50 flex-1">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900">
            {isRegistering ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isRegistering ? 'Únete a Hexashop hoy mismo' : 'Ingresa a tu cuenta de Hexashop'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <Button variant="primary" type="submit" className={`w-full py-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isLoading}>
            {isLoading ? 'Procesando...' : (isRegistering ? 'Registrarse' : 'Iniciar Sesión')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}{' '}
          <button 
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="font-semibold text-gray-900 cursor-pointer hover:underline"
          >
            {isRegistering ? 'Inicia Sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;