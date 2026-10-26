import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Reservation />
      <Footer />
    </div>
  );
}

export default App;
