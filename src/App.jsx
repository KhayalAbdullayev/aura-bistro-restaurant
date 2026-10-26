import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
        <Routes>
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={
            <>
              <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />
              <Hero />
              <About />
              <Menu />
              <Reservation />
              <Footer />
              <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
