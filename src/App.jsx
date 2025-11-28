import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PGDetailsPage from './components/PGDetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pg/:id" element={<PGDetailsPage />} />
    </Routes>
  );
}

export default App;
