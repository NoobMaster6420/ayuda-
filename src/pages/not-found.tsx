import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-cyberpink glow-text-cyberpink">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-white">Página no encontrada</h2>
        <p className="mt-2 text-lg text-gray-300">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/">
            <a className="rounded-md bg-cyberpink px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-opacity-80">
              Volver al inicio
            </a>
          </Link>
          
          <Link href="/theory">
            <a className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-700">
              Ir a la teoría
            </a>
          </Link>
        </div>
      </div>
      
      <div className="mt-12 max-w-xl">
        <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-xl font-medium text-white">¿Buscando algo específico?</h3>
          <p className="text-gray-300">
            Tal vez uno de estos enlaces te pueda ayudar:
          </p>
          
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li>
              <Link href="/theory">
                <a className="block rounded bg-gray-800 p-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                  <span className="font-medium">Teoría</span>
                  <span className="block text-sm text-gray-400">Conceptos y explicaciones</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/quiz">
                <a className="block rounded bg-gray-800 p-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                  <span className="font-medium">Quiz</span>
                  <span className="block text-sm text-gray-400">Pon a prueba tus conocimientos</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/challenges">
                <a className="block rounded bg-gray-800 p-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                  <span className="font-medium">Desafíos</span>
                  <span className="block text-sm text-gray-400">Problemas más complejos</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/game">
                <a className="block rounded bg-gray-800 p-3 text-gray-300 hover:bg-gray-700 hover:text-white">
                  <span className="font-medium">Juego</span>
                  <span className="block text-sm text-gray-400">Aprende jugando</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}