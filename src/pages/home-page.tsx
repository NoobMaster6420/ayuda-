import { Link } from 'wouter';
import { Latex } from '../components/ui/latex';
import { useAuth } from '../hooks/use-auth';

export default function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-repeat-[100px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  <span className="block text-cyberpink glow-text-cyberpink">CYBER</span>
                  <span className="block text-cyberblue glow-text-cyberblue">CALC</span>
                </h1>
                <p className="mt-3 text-lg text-gray-300 sm:mt-5 sm:text-xl">
                  Transformando el aprendizaje del cálculo con una experiencia digital interactiva y gamificada.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link href="/theory">
                    <a className="transform rounded-lg bg-cyberpink px-6 py-3 text-lg font-medium text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90">
                      Comenzar a Aprender
                    </a>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <a className="transform rounded-lg bg-cyberpink px-6 py-3 text-lg font-medium text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90">
                      Crear Cuenta
                    </a>
                  </Link>
                )}
                
                <Link href="/theory">
                  <a className="transform rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-lg font-medium text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700">
                    Explorar
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="h-full w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 bg-opacity-80 p-8 shadow-2xl backdrop-blur">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">Resolviendo derivadas con estilo</h3>
                  <div className="border-l-4 border-cyberpink bg-gray-800 bg-opacity-50 p-4">
                    <Latex formula={`f(x) = x^3 - 2x^2 + 5x - 3`} className="mb-3" />
                    <Latex formula={`f'(x) = 3x^2 - 4x + 5`} className="text-cyberblue" />
                  </div>
                  
                  <p className="text-gray-300">
                    Domina el cálculo diferencial paso a paso con nuestra plataforma interactiva y gamificada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Características Principales
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-300 sm:mt-4">
              Una nueva forma de aprender cálculo diferencial con herramientas digitales diseñadas para todos los niveles.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-gray-800 bg-gray-800 bg-opacity-50 p-6 transition-transform duration-300 hover:scale-105">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-cyberpink bg-opacity-20 text-cyberpink">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Teoría Interactiva</h3>
              <p className="mt-2 text-gray-300">
                Aprende los conceptos fundamentales del cálculo con ejemplos interactivos y visualizaciones.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-lg border border-gray-800 bg-gray-800 bg-opacity-50 p-6 transition-transform duration-300 hover:scale-105">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-cyberblue bg-opacity-20 text-cyberblue">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Quizzes Adaptativos</h3>
              <p className="mt-2 text-gray-300">
                Pon a prueba tus conocimientos con quizzes que se adaptan a tu nivel de comprensión.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-lg border border-gray-800 bg-gray-800 bg-opacity-50 p-6 transition-transform duration-300 hover:scale-105">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-500 bg-opacity-20 text-purple-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Desafíos Diarios</h3>
              <p className="mt-2 text-gray-300">
                Mantén tus habilidades afiladas con desafíos diarios que aumentan en dificultad.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="rounded-lg border border-gray-800 bg-gray-800 bg-opacity-50 p-6 transition-transform duration-300 hover:scale-105">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-green-500 bg-opacity-20 text-green-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Análisis de Progreso</h3>
              <p className="mt-2 text-gray-300">
                Visualiza tu progreso a través del tiempo y descubre tus áreas de mejora.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="rounded-lg border border-gray-800 bg-gray-800 bg-opacity-50 p-6 transition-transform duration-300 hover:scale-105">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-yellow-500 bg-opacity-20 text-yellow-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Modo Práctica</h3>
              <p className="mt-2 text-gray-300">
                Practica sin presión con ejercicios ilimitados en todos los temas del cálculo.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="rounded-lg border border-gray-800 bg-gray-800 bg-opacity-50 p-6 transition-transform duration-300 hover:scale-105">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-red-500 bg-opacity-20 text-red-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Modo Juego</h3>
              <p className="mt-2 text-gray-300">
                Aprende jugando y compite con otros estudiantes en nuestra tabla de clasificación.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl bg-gradient-to-r from-cyberpink to-cyberblue p-0.5 shadow-lg">
            <div className="bg-gray-900 px-6 py-12 sm:px-12 sm:py-16">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Listo para comenzar tu viaje en el mundo del cálculo?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                  Únete a miles de estudiantes que están transformando su manera de aprender cálculo diferencial.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex rounded-md shadow">
                    <Link href={user ? "/theory" : "/auth"}>
                      <a className="rounded-lg bg-cyberpink px-6 py-3 text-lg font-medium text-white hover:bg-opacity-90">
                        {user ? "Ir a la Teoría" : "Comenzar ahora"}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}