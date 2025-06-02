import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SegmentBuilder from "./SegmentBuilder";

function CampaignCreation() {
  const [campaignName, setCampaignName] = useState("");
  const [segment, setSegment] = useState([]);
  const [audienceCount, setAudienceCount] = useState(0);

  const navigate = useNavigate();

  // 👇 Update audience count whenever segment changes
  useEffect(() => {
    const fetchAudienceCount = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/customers/preview", { segment });
        setAudienceCount(response.data.count);
      } catch (error) {
        console.error("Error fetching audience preview:", error);
      }
    };

    if (segment.length > 0) {
      fetchAudienceCount();
    } else {
      setAudienceCount(0);
    }
  }, [segment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/campaigns", {
        name: campaignName,
        segment
      });

      console.log("Campaign created:", response.data);
      // Redirect to campaign history
      navigate("/campaigns/history");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="campaignName" className="form-label">Campaign Name</label>
          <input
            type="text"
            className="form-control"
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>

        <SegmentBuilder segment={segment} setSegment={setSegment} />

        <div className="mt-3">
          <p><strong>Matching Audience:</strong> {audienceCount} customers</p>
        </div>

        <button type="submit" className="btn btn-primary">Create Campaign</button>
      </form>
    </div>
  );
}

export default CampaignCreation;
