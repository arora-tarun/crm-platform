import React, { useEffect, useState } from 'react';
import axios from 'axios';

const widgetStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  flex: '1 1 250px',
};

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  marginTop: '20px',
};

const DashboardSummary = ({ stats }) => (
  <div style={widgetStyle}>
    <h2 style={{ marginBottom: '15px' }}>Dashboard Summary</h2>
    <p><strong>Total Customers:</strong> {stats.totalCustomers}</p>
    <p><strong>Active Campaigns:</strong> {stats.activeCampaigns}</p>
    <p><strong>Delivered Messages:</strong> {stats.deliveredMessages}</p>
  </div>
);

const RecentCustomers = ({ customers }) => (
  <div style={{ ...widgetStyle, flex: '2 1 500px' }}>
    <h3 style={{ marginBottom: '15px' }}>Recent Customers</h3>
    <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto' }}>
      {customers.map(customer => (
        <li key={customer._id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <strong>{customer.name}</strong> <br />
          <small>{new Date(customer.createdAt).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
  </div>
);

const Dashboard = () => {
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const recentRes = await axios.get('https://crm-platform-s759.onrender.com/api/dashboard/recent');
        setRecentCustomers(recentRes.data);

        const statsRes = await axios.get('https://crm-platform-s759.onrender.com/api/dashboard/stats');
        setStats(statsRes.data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={containerStyle}>
        <DashboardSummary stats={stats} />
        <RecentCustomers customers={recentCustomers} />
      </div>
    </div>
  );
};

export default Dashboard;
