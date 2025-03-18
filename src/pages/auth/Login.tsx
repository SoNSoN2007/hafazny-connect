
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAuthFormExtended from '@/components/UserAuthFormExtended';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 subtle-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <UserAuthFormExtended type="login" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
