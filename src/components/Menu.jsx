import React, { useState } from 'react';
import { menuData } from '../data/menuData';
import MenuItem from './MenuItem';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Starters', 'Mains', 'Desserts'];

  const filteredItems = selectedCategory === 'All'
    ? menuData
    : menuData.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
          Our Menu
        </h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
