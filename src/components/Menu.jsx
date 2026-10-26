import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const { user } = useAuth();

  const categories = ['All', 'Starters', 'Mains', 'Desserts'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/menu`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (quantity > 0) {
        newCart[itemId] = quantity;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to checkout');
      return;
    }

    const items = Object.entries(cart).map(([id, quantity]) => ({
      id: parseInt(id),
      quantity
    }));

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Checkout failed');
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const cartItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find(i => i.id === parseInt(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  if (loading) {
    return (
      <section id="menu" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
            Our Menu
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="menu" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-12">
            Our Menu
          </h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            Error loading menu: {error}
          </div>
        </div>
      </section>
    );
  }

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

        {/* Cart Summary */}
        {cartItemsCount > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 flex justify-between items-center">
            <div>
              <span className="font-semibold text-gray-800">
                {cartItemsCount} item{cartItemsCount !== 1 ? 's' : ''} in cart
              </span>
              <span className="ml-4 text-secondary font-bold">
                Total: ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-secondary hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Checkout
            </button>
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              onQuantityChange={handleQuantityChange}
              initialQuantity={cart[item.id] || 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
