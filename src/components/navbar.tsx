import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

export default function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link href="/">
            <a className="text-2xl font-bold tracking-tight flex items-center">
              <span className="mr-2">⚡</span>
              CyberCalc
            </a>
          </Link>
        </div>

        <nav className="flex flex-wrap gap-1 sm:gap-2">
          <NavLink href="/" current={location} label="Inicio" />
          <NavLink href="/theory" current={location} label="Teoría" />
          <NavLink href="/quiz" current={location} label="Quiz" />
          <NavLink href="/challenges" current={location} label="Desafíos" />
          <NavLink href="/game" current={location} label="Juego" />
          <NavLink href="/leaderboard" current={location} label="Ranking" />
          
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium px-3 py-1.5 bg-primary-700 rounded-md">
                {user.username} ({user.points} pts)
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <NavLink href="/auth" current={location} label="Ingresar" />
          )}
        </nav>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  current: string;
  label: string;
}

function NavLink({ href, current, label }: NavLinkProps) {
  const isActive = current === href;
  
  return (
    <Link href={href}>
      <a
        className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
          isActive
            ? 'bg-primary-700'
            : 'hover:bg-primary-600'
        }`}
      >
        {label}
      </a>
    </Link>
  );
}