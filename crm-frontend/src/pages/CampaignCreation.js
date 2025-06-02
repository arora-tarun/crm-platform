import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampaignCreation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Campaign name is required.');
      return;
    }

    setError('');
    setSaving(true);

    const payload = {
      name,
      description,
      status,
    };

    try {
      await axios.post('http://localhost:5000/api/campaigns', payload, { withCredentials: true });
      navigate('/campaigns');
    } catch (err) {
      setError('Failed to save campaign. Try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container my-4">
      <h2>Create New Campaign</h2>

      <div className="mb-3">
        <label className="form-label">Campaign Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter campaign name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description (optional)</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe the campaign"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Campaign'}
      </button>
    </div>
  );
};

export default CampaignCreation;
