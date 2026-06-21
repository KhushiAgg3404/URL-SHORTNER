import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            NexURL
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/auth"
              className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-all"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;