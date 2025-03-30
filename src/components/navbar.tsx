import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../hooks/use-auth';
import { toast } from '../components/ui/toaster';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión',
        variant: 'error',
      });
    }
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="text-2xl font-bold text-cyberpink glow-text-cyberpink tracking-wider">
                CYBER<span className="text-cyberblue glow-text-cyberblue">CALC</span>
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/" 
                    ? "text-white bg-gray-800" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}>
                  Inicio
                </a>
              </Link>
              
              <Link href="/theory">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/theory" 
                    ? "text-white bg-gray-800" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}>
                  Teoría
                </a>
              </Link>
              
              <Link href="/quiz">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/quiz" 
                    ? "text-white bg-gray-800" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}>
                  Quiz
                </a>
              </Link>
              
              <Link href="/challenges">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/challenges" 
                    ? "text-white bg-gray-800" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}>
                  Desafíos
                </a>
              </Link>
              
              <Link href="/game">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/game" 
                    ? "text-white bg-gray-800" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}>
                  Juego
                </a>
              </Link>
              
              <Link href="/leaderboard">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/leaderboard" 
                    ? "text-white bg-gray-800" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}>
                  Tabla
                </a>
              </Link>
            </div>
          </div>
          
          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <span className="text-sm font-medium text-gray-300">{user.username}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-sm font-medium text-yellow-500">{user.points} pts</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link href="/auth">
                  <a className="rounded-md bg-cyberpink px-3 py-2 text-sm font-medium text-white hover:bg-opacity-80">
                    Iniciar Sesión
                  </a>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link href="/">
            <a
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location === "/"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Inicio
            </a>
          </Link>
          
          <Link href="/theory">
            <a
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location === "/theory"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Teoría
            </a>
          </Link>
          
          <Link href="/quiz">
            <a
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location === "/quiz"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Quiz
            </a>
          </Link>
          
          <Link href="/challenges">
            <a
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location === "/challenges"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Desafíos
            </a>
          </Link>
          
          <Link href="/game">
            <a
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location === "/game"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Juego
            </a>
          </Link>
          
          <Link href="/leaderboard">
            <a
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                location === "/leaderboard"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={closeMobileMenu}
            >
              Tabla
            </a>
          </Link>
        </div>
        
        <div className="border-t border-gray-700 pb-3 pt-4">
          {user ? (
            <div className="space-y-2 px-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.username}</div>
                  <div className="flex items-center text-sm font-medium text-yellow-500">
                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {user.points} puntos
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="mt-2 block w-full rounded-md bg-gray-800 px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="px-5">
              <Link href="/auth">
                <a
                  className="block w-full rounded-md bg-cyberpink px-3 py-2 text-center text-base font-medium text-white hover:bg-opacity-80"
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}