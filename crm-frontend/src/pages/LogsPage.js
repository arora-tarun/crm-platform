import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/logs', { withCredentials: true });
        setLogs(res.data);
      } catch (err) {
        setError('Failed to load logs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div>Loading logs...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Activity Logs</h2>
      <ul className="list-group">
        {logs.map(log => (
          <li key={log._id} className="list-group-item">
            <strong>{log.action}</strong> by {log.userName} at {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsPage;
