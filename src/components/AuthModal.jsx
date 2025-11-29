import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegisterUserMutation,
  useLoginUserMutation
} from "../Bothfeatures/features/api/authapi";
import { userLoggedin } from "../Bothfeatures/features/authSlice";
import "react-toastify/dist/ReactToastify.css";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: ""
  });

  const [registerUser, { isLoading: registerLoading }] = useRegisterUserMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  // Hydrate user if already in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(userLoggedin({ user: JSON.parse(storedUser) }));
    }
  }, [dispatch]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Validation
        if (!formData.username || !formData.email || !formData.password || !formData.phone || !formData.role) {
          toast.error("Please fill all fields");
          return;
        }

        const res = await registerUser(formData).unwrap();
        toast.success(res.message || "Registered successfully!");

        dispatch(userLoggedin({ user: res.user }));
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        if (!formData.email || !formData.password || !formData.role) {
          toast.error("Please fill all fields");
          return;
        }

        const res = await loginUser(formData).unwrap();
        toast.success(res.message || "Logged in successfully!");

        dispatch(userLoggedin({ user: res.existingUser }));
        localStorage.setItem("user", JSON.stringify(res.existingUser));

        if (res.role !== "user") {
          navigate("/admin/properties");
        }
      }

      // Reset form and close modal
      setFormData({ username: "", email: "", password: "", phone: "", role: "" });
      onClose();

    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isSignUp ? "Create Account" : "Login"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a role</option>
              <option value="user">User</option>
              <option value="owner">PG Owner</option>
              <option value="branch-manager">Branch Manager</option>
            </select>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2"
            disabled={registerLoading || loginLoading}
          >
            {(registerLoading || loginLoading) && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <>
              <span>Already have an account? </span>
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:text-blue-700"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:text-blue-700 mb-1"
              >
                Don't have an account? Sign Up
              </button>
              <button
                onClick={() => toast.info("Forgot password clicked")}
                className="text-red-500 hover:underline"
              >
                Forgot Password?
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
