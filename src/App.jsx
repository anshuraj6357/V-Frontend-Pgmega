import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { hydrateUser } from "./components/features/authSlice"; 
import LandingPage from './components/LandingPage';
import PGDetailsPage from './components/PGDetailsPage';
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(
        hydrateUser({
          user: JSON.parse(user),
          isAuthenticated: true,
        })
      );
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pg/:id" element={<PGDetailsPage />} />
    </Routes>
  );
}

export default App;
