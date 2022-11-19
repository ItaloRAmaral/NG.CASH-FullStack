import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home-page';
import UserDashboardPage from './pages/userDashboard-page';

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<UserDashboardPage /> } />
      </Routes>
    </div>
  );
}

export default App;
