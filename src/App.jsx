import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LandingPage from './components/LandingPage';
import PGDetailsPage from './components/PGDetailsPage';
import PGMap from "./components/pgmap.jsx";
import AuthModal from "./components/AuthModal";
import Wishlist from "./components/wishlist";
import CancellationPolicy from "./components/cancilationandrefundpolicy";
import ContactUs from "./components/contactus";
import PrivacyPolicy from "./components/privacypolicy";
import TermsConditions from "./components/termsandcondition";
import ShippingPolicy from "./components/shippingpolicy";

import DashboardHeader from "./admin/header";
import AdminApp from "./admin/AdminApp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { hydrateUser } from "./Bothfeatures/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hydrate user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed) {
        dispatch(hydrateUser({ user: parsed, isAuthenticated: true }));
      }
    } catch (e) {
      console.warn("Invalid user in localStorage. Clearing...");
      localStorage.removeItem("user");
      dispatch(hydrateUser({ user: null, isAuthenticated: false }));
    }
  }, [dispatch]);

  // Check if user is admin/owner/branch-manager
  const isAdminRoute = user?.role === "owner" || user?.role === "branch-manager";

  return (
    <div className="flex flex-col min-h-screen">

      {/* Conditional Header */}
      {isAdminRoute ? (
        <>
          <DashboardHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
     
        </>

      ) : (
        <Header />
      )}

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pg/:id" element={<PGDetailsPage />} />
          <Route path="/PGMap/:branchId" element={<PGMap />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/CancellationPolicy" element={<CancellationPolicy />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandcondition" element={<TermsConditions />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* Auth */}
          <Route path="/login" element={<AuthModal />} />
        </Routes>
      </main>

      {/* Conditional Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
