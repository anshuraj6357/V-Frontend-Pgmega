import { Home, User, Menu, Loader2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../Bothfeatures/features/api/authapi";
import { userLoggedout, hydrateUser } from "../Bothfeatures/features/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  // Hydrate user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");

    try {
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed) {
        dispatch(hydrateUser({ user: parsed, isAuthenticated: true }));
      } else {
        dispatch(userLoggedout());
      }
    } catch (err) {
      localStorage.removeItem("user");
      dispatch(userLoggedout());
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(userLoggedout());
      localStorage.removeItem("user");
      setOpenDropdown(false);
      toast.success("Logged out successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="backdrop-blur-xl bg-white/70 shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Add Property Button */}
        <button
          onClick={() => navigate("/login")}
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Your Property
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">

          {isAuthenticated ? (
            <div className="relative">
              {/* User Avatar */}
              <div
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>

                <span className="font-medium text-gray-700">{user?.username}</span>
              </div>

              {/* Dropdown */}
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border py-2 animate-fadeIn z-50">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </button>

                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => navigate("/wishlist")}
                  >
                    My Wishlist
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow hover:shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Sign In / Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setMobileMenu((p) => !p)}>
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-4 space-y-4 animate-slideDown">

          {/* Add Property (mobile) */}
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate("/add-property");
            }}
            className="flex items-center gap-2 w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <Plus className="w-5 h-5" /> Add Your Property
          </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="block w-full text-left px-4 py-2"
              >
                My Wishlist
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 rounded-lg bg-blue-600 text-white"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
}
