import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
      <div className="text-6xl font-bold text-primary mb-6">404</div>
      <h1 className="text-3xl font-bold mb-4">Página no encontrada</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors">
          Volver al inicio
        </a>
      </Link>
    </div>
  );
}