import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = ({ onOpenAuthModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reservation', href: '#reservation' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold">Aura Bistro</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white hover:text-secondary transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-secondary font-medium">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-secondary hover:bg-orange-600 rounded-lg font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2 bg-secondary hover:bg-orange-600 rounded-lg font-medium transition-colors"
              >
                Sign In / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-secondary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-secondary transition-colors font-medium block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="border-t border-white/20 pt-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <span className="text-secondary font-medium">Welcome, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-secondary hover:bg-orange-600 rounded-lg font-medium transition-colors text-center"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAuthModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-secondary hover:bg-orange-600 rounded-lg font-medium transition-colors text-center"
                  >
                    Sign In / Register
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
