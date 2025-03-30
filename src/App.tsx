import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toaster from './components/ui/toaster';
import { AuthProvider } from './hooks/use-auth';
import { ProtectedRoute } from './lib/protected-route';
import Navbar from './components/navbar';
import Footer from './components/footer';

// Pages
import HomePage from './pages/home-page';
import AuthPage from './pages/auth-page';
import QuizPage from './pages/quiz-page';
import ChallengesPage from './pages/challenges-page';
import GamePage from './pages/game-page';
import LeaderboardPage from './pages/leaderboard-page';
import TheoryPage from './pages/theory-page';
import NotFound from './pages/not-found';

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Router Component
function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/quiz">
        {() => (
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/challenges">
        {() => (
          <ProtectedRoute>
            <ChallengesPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/game">
        {() => (
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/leaderboard">
        {() => (
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/theory" component={TheoryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;