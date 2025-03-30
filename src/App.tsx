import { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HomePage from '@/pages/home-page';
import NotFound from '@/pages/not-found';

function Router() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {isClient && (
          <Switch>
            <Route path="/" component={HomePage} />
            {/* Add other routes as you implement them */}
            {/* 
            <Route path="/auth" component={AuthPage} />
            <Route path="/theory" component={TheoryPage} />
            <Route path="/quiz" component={QuizPage} />
            <Route path="/challenges" component={ChallengesPage} />
            <Route path="/game" component={GamePage} />
            <Route path="/leaderboard" component={LeaderboardPage} /> 
            */}
            <Route component={NotFound} />
          </Switch>
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return <Router />;
}

export default App;