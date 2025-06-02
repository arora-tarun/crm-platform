import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5000/api/campaigns', { withCredentials: true });
      setCampaigns(res.data);
    } catch (err) {
      setError('Failed to load campaigns.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Campaigns</h2>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate('/campaigns/create')}
          >
            + Create Campaign
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={fetchCampaigns}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      {campaigns.length === 0 ? (
        <p>No campaigns found. Click "Create Campaign" to add one.</p>
      ) : (
        <div className="row">
          {campaigns.map(campaign => (
            <div key={campaign._id} className="col-md-6 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{campaign.name}</h5>
                  {campaign.description && <p className="card-text">{campaign.description}</p>}

                  <p className="card-text mb-2">
                    <small className="text-muted">
                      Status: <strong>{campaign.status}</strong> <br />
                      Created on: {new Date(campaign.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
