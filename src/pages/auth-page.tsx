import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { toast } from '../components/ui/toaster';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const [, navigate] = useLocation();
  
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError(null);
  };
  
  const validateForm = () => {
    if (!username || !password) {
      setError('Por favor, ingresa un nombre de usuario y contraseña');
      return false;
    }
    
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (isRegister && password !== passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isRegister) {
        // Register new user
        await register({ username, password });
        toast({
          title: '¡Registro exitoso!',
          description: 'Tu cuenta ha sido creada y has iniciado sesión automáticamente.',
          variant: 'success',
        });
      } else {
        // Login existing user
        await login({ username, password });
        toast({
          title: 'Inicio de sesión exitoso',
          description: 'Has iniciado sesión correctamente.',
          variant: 'success',
        });
      }
      
      // Redirect to home page after successful auth
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error. Por favor, intenta de nuevo.');
      toast({
        title: 'Error',
        description: err.message || 'Ha ocurrido un error. Por favor, intenta de nuevo.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-cyberpink glow-text-cyberpink">
            {isRegister ? 'Crea tu cuenta' : 'Inicia sesión'}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {isRegister 
              ? 'Únete a CyberCalc y comienza tu viaje de aprendizaje' 
              : 'Bienvenido de nuevo, continúa tu viaje de aprendizaje'}
          </p>
        </div>
        
        <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Nombre de usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-cyberpink focus:outline-none focus:ring-1 focus:ring-cyberpink sm:text-sm"
                  placeholder="Elige un nombre de usuario"
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-cyberpink focus:outline-none focus:ring-1 focus:ring-cyberpink sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>
            
            {/* Password Confirmation (only for register) */}
            {isRegister && (
              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-300">
                  Confirma tu contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="passwordConfirm"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 shadow-sm focus:border-cyberpink focus:outline-none focus:ring-1 focus:ring-cyberpink sm:text-sm"
                    placeholder="Repite tu contraseña"
                  />
                </div>
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="rounded-md bg-red-900 bg-opacity-25 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyberpink px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="mr-2 h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  isRegister ? 'Crear cuenta' : 'Iniciar sesión'
                )}
              </button>
            </div>
          </form>
          
          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-cyberpink hover:underline"
            >
              {isRegister 
                ? '¿Ya tienes una cuenta? Inicia sesión' 
                : '¿No tienes una cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}