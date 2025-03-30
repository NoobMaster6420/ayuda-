import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { initializeLeaderboardIfEmpty } from '@/lib/storage';

export default function HomePage() {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);
  
  // Inicializar datos si es necesario
  useEffect(() => {
    initializeLeaderboardIfEmpty();
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Domina el Cálculo Diferencial con CyberCalc
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Una forma innovadora y entretenida de aprender derivadas a través de desafíos, juegos y conceptos teóricos.
          </p>
          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/theory">
                <a className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Comenzar a aprender
                </a>
              </Link>
              <Link href="/quiz">
                <a className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-500 transition-colors">
                  Probar tus conocimientos
                </a>
              </Link>
            </div>
          ) : (
            <Link href="/auth">
              <a className="px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Crear una cuenta
              </a>
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué CyberCalc?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="📚" 
              title="Aprendizaje Interactivo" 
              description="Teoría explicada de forma clara con ejemplos prácticos y visualizaciones interactivas."
            />
            <FeatureCard 
              icon="🎮" 
              title="Aprender Jugando" 
              description="Desafíos y juegos que hacen el aprendizaje del cálculo diferencial divertido y efectivo."
            />
            <FeatureCard 
              icon="🏆" 
              title="Seguimiento de Progreso" 
              description="Sistema de puntos y tabla de clasificación para motivar tu avance y compararte con otros."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para dominar el cálculo?</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Únete a miles de estudiantes que han mejorado su comprensión del cálculo diferencial con nuestro enfoque interactivo.
          </p>
          
          <Link href={user ? "/quiz" : "/auth"}>
            <a className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
              {user ? "Comenzar desafío" : "Comenzar ahora"}
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}