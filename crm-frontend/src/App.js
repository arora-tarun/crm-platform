import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Dashboard from './pages/DashboardPage';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CampaignsPage from './pages/CampaignsPage';
import CampaignCreation from './pages/CampaignCreation';
import LogsPage from './pages/LogsPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${baseURL}/auth/user`, { withCredentials: true })
      .then(res => {
        setUser(res.data && res.data._id ? res.data : null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [baseURL]);

  const handleLogout = async () => {
    try {
      await axios.get(`${baseURL}/auth/logout`, { withCredentials: true });
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} toggleSidebar={toggleSidebar} />
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {user && <Sidebar visible={sidebarVisible} />}
        <MainContent sidebarVisible={user ? sidebarVisible : false}>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/customers" element={user ? <CustomerList /> : <Navigate to="/" />} />
            <Route path="/add-customer" element={user ? <CustomerForm /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />} />
            <Route path="/campaigns" element={user ? <CampaignsPage /> : <Navigate to="/" />} />
            <Route path="/campaigns/create" element={user ? <CampaignCreation /> : <Navigate to="/" />} />
            <Route path="/logs" element={user ? <LogsPage /> : <Navigate to="/" />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;
