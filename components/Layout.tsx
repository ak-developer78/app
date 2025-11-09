import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const publicPaths = ['/about', '/contact', '/privacy-policy', '/terms-of-service'];
  const isPublicPage = publicPaths.includes(location.pathname);

  // This layout is primarily for authenticated routes, but let's make it work for public ones too
  // if they are nested under it in the router.
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isAuthenticated && <Navbar />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
