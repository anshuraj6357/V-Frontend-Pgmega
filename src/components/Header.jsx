import { Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ onAuthClick, showHome = false }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 group">
    <Link to="/" className="flex items-center space-x-3 group">
  <img
    src="/WhatsApp_Image_2025-11-28_at_2.07.04_AM-removebg-preview (1).png"
    alt="Logo"
    className="h-20 w-auto object-contain transition-transform group-hover:scale-105"

  />
</Link>



          <span className="text-3xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-all">
            ROOMGI
          </span>
        </Link>



        {/* Right Section */}
        <div className="flex items-center space-x-6">

          {showHome && (
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Home
            </Link>
          )}

          <button
            onClick={onAuthClick}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            <User className="w-5 h-5" />
            <span className="hidden md:inline">Sign In / Sign Up</span>
          </button>

        </div>
      </div>
    </header>
  );
}
