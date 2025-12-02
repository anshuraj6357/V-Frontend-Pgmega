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
    <header className="backdrop-blur-xl bg-white/80 shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">

       <img
  src={logo}
  alt="Logo"
  className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
/>


        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-semibold text-lg">
            Contact
          </Link>
        </nav>

        {/* DESKTOP RIGHT SIDE */}
        <div className="hidden md:flex items-center space-x-6">
          {!isAuthenticated ? (
            <>
              {/* Add Property */}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Add Your Property
              </button>

              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-7 py-2 rounded-full font-medium shadow hover:shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Sign In / Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              {/* USER BUTTON */}
              <div
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>

                <span className="font-medium text-gray-700 text-lg">{user?.username}</span>
              </div>

              {/* DROPDOWN */}
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg border py-2 animate-fadeIn z-50">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </button>

                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
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
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden ml-3"
          onClick={() => setMobileMenu((p) => !p)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-4 space-y-4 animate-slideDown">

          {/* MOBILE NAV LINKS */}
          <button
            onClick={() => { setMobileMenu(false); navigate("/"); }}
            className="block w-full text-left px-2 py-2 text-gray-700 font-medium text-lg"
          >
            Home
          </button>

          <button
            onClick={() => { setMobileMenu(false); navigate("/about"); }}
            className="block w-full text-left px-2 py-2 text-gray-700 font-medium text-lg"
          >
            About
          </button>

          <button
            onClick={() => { setMobileMenu(false); navigate("/contact"); }}
            className="block w-full text-left px-2 py-2 text-gray-700 font-medium text-lg"
          >
            Contact
          </button>

          {/* ADD PROPERTY (MOBILE) */}
          {!isAuthenticated && (
            <button
              onClick={() => { setMobileMenu(false); navigate("/login"); }}
              className="flex items-center gap-2 w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition text-lg"
            >
              <Plus className="w-5 h-5" /> Add Your Property
            </button>
          )}

          {/* AUTHENTICATED MOBILE OPTIONS */}
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 text-gray-800 text-lg"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="block w-full text-left px-4 py-2 text-gray-800 text-lg"
              >
                My Wishlist
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 rounded-lg bg-blue-600 text-white text-lg"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      )}
    </header>
  );
}
