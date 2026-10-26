import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="bg-gradient-to-br from-primary to-accent text-white text-center py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to Aura Bistro
        </h1>
        <p className="text-xl sm:text-2xl mb-8 opacity-95">
          Experience culinary excellence in an elegant atmosphere
        </p>
        <a
          href="#reservation"
          className="inline-block bg-secondary hover:bg-orange-600 text-white font-semibold py-4 px-10 rounded-lg transition-colors"
        >
          Reserve Your Table
        </a>
      </div>
    </section>
  );
};

export default Hero;
