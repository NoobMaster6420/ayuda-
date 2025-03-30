import React, { ReactNode } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  // If authentication is still loading, show a simple loading spinner
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-cyberpink"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Redirect to="/auth" />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
};