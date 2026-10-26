import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
          About Aura Bistro
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="flex-1">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in 2015, Aura Bistro has been a cornerstone of fine dining in our community. Our commitment to using locally-sourced, seasonal ingredients ensures that every dish tells a story of quality and passion.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our executive chef brings over 20 years of culinary experience from some of the world's most renowned kitchens. Each plate is crafted with meticulous attention to detail, combining traditional techniques with modern innovation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Aura Bistro, we believe that great food is meant to be shared. Whether you're celebrating a special occasion or enjoying a casual evening with friends, our warm ambiance and exceptional service will make your visit memorable.
            </p>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Aura Bistro Interior"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
