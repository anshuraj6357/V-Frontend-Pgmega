import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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

import AdminApp from "./admin/AdminApp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { hydrateUser } from "./Bothfeatures/features/authSlice";

function App() {
  const dispatch = useDispatch();

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pg/:id" element={<PGDetailsPage />} />
          <Route path="/PGMap/:branchId" element={<PGMap />} />

          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/CancellationPolicy" element={<CancellationPolicy />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandcondition" element={<TermsConditions />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* AUTH MODAL */}
          <Route path="/login" element={<AuthModal />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
