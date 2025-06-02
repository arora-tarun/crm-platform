import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

function Profile() {
  const googleUser = {
    name: 'Mohit Sharma',
    email: 'mohit@example.com',
    picture: 'https://lh3.googleusercontent.com/a-/AOh14GgU1c3Q.jpg', // Replace with real image URL
  };

  const [profile, setProfile] = useState({
    name: googleUser.name,
    email: googleUser.email,
    image: googleUser.picture,
    gender: '',
    dob: '',
    about: '',
    businessName: '',
    businessCategory: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile Updated!');
  };

  return (
    <div className="container mt-4">
      <style>{`
        .profile-image-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #dee2e6;
        }

        .camera-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #ffffffcc;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          border: 1px solid #ccc;
        }

        .camera-icon:hover {
          background: #e9ecef;
        }
      `}</style>

      <h2 className="mb-4">My Profile</h2>

      <div className="d-flex justify-content-center mb-4">
        <div className="profile-image-wrapper">
          <img
            src={profile.image}
            alt="Profile"
            className="profile-image"
          />
          <label htmlFor="imageUpload" className="camera-icon">
            <FaCamera />
          </label>
          <input
            type="file"
            id="imageUpload"
            className="d-none"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value={profile.name} disabled />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={profile.email} disabled />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={profile.dob}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              name="businessName"
              className="form-control"
              value={profile.businessName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Business Category</label>
            <select
              name="businessCategory"
              className="form-select"
              value={profile.businessCategory}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Fashion & Apparel</option>
              <option>Food & Beverage</option>
              <option>Electronics</option>
              <option>Health & Wellness</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">About You</label>
            <textarea
              name="about"
              className="form-control"
              rows="3"
              value={profile.about}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
