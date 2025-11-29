import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PGDetailsPage from './components/PGDetailsPage';
import AdminApp from "./admin/AdminApp";
import { useDispatch } from "react-redux";
import { hydrateUser } from "./Bothfeatures/features/authSlice";
import { useEffect } from "react";
import PGMap from "./components/pgmap.jsx";

function App() {
  const dispatch = useDispatch();

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


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pg/:id" element={<PGDetailsPage />} />
      <Route path="/PGMap/:branchId" element={<PGMap />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}

export default App;
