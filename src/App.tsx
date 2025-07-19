import React, { Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

const AuthPage = React.lazy(() => import('./components/Auth/AuthPage'));
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {user ? <Dashboard /> : <AuthPage />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;