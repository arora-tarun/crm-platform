import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    totalSpend: '',
    visits: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (!formData.name || !formData.email) {
      setError('Name and Email are required.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/customers', {
        name: formData.name,
        email: formData.email,
        totalSpend: Number(formData.totalSpend) || 0,
        visits: Number(formData.visits) || 0,
      }, { withCredentials: true });

      setSuccessMsg('Customer added successfully!');
      setFormData({ name: '', email: '', totalSpend: '', visits: '' });

      setTimeout(() => navigate('/customers'), 1500);
    } catch (err) {
      setError('Failed to add customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add New Customer</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Spend</label>
          <input
            type="number"
            name="totalSpend"
            className="form-control"
            placeholder="e.g. 10000"
            value={formData.totalSpend}
            onChange={handleChange}
            disabled={loading}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Visits</label>
          <input
            type="number"
            name="visits"
            className="form-control"
            placeholder="Number of visits"
            value={formData.visits}
            onChange={handleChange}
            disabled={loading}
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
