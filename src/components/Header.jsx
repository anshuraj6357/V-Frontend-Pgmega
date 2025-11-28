import { Home, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../components/features/api/authapi";
import { userLoggedout, hydrateUser } from "../components/features/authSlice";

export default function Header({ onAuthClick, showHome = false }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => setOpenDropdown(!openDropdown);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [logoutUser] = useLogoutUserMutation();

  // Hydrate user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        dispatch(hydrateUser({ user: parsedUser, isAuthenticated: true }));
      }
    } else {
      dispatch(userLoggedout());
    }
  }, [dispatch]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(userLoggedout());
      localStorage.removeItem("user");
      setOpenDropdown(false);
      alert("Logged out successfully");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <header className="backdrop-blur-lg bg-white/80 shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {showHome && (
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Home
            </Link>
          )}

          {isAuthenticated ? (
            <div className="relative flex items-center space-x-2">
              {/* Avatar + Username Container */}
              <div
                onClick={toggleMenu}
                className="flex items-center space-x-2 cursor-pointer select-none"
              >
                {/* Avatar */}
                <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:shadow-lg transition">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>
                {/* Username */}
                <span className="font-medium text-gray-700 hidden md:inline">
                  {user?.username}
                </span>
              </div>

              {/* Dropdown Menu */}
              {openDropdown && (
                <div className="absolute right-0 mt-12 w-44 bg-white shadow-lg rounded-lg border py-2 animate-fadeIn z-50">
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                    My Bookings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              <User className="w-5 h-5" />
              <span>Sign In / Sign Up</span>
            </button>
          )}

        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-4 space-y-4 animate-slideDown">
          <input
            type="text"
            placeholder="Search rooms, PGs..."
            className="w-full px-4 py-2 bg-gray-100 rounded-xl"
          />

          <button className="block w-full text-left px-4 py-2 bg-gray-100 rounded-lg">
            Select City
          </button>

          {isAuthenticated ? (
            <>
              <button className="block w-full text-left px-4 py-2">Profile</button>
              <button className="block w-full text-left px-4 py-2">My Bookings</button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className="w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
}
