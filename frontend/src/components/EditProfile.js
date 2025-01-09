import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    website: '',
    profile_picture: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/accounts/profile/');
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profile_picture: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in profile) {
        formData.append(key, profile[key]);
      }
      await api.put('/accounts/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setLoading(false);
    }
  };  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={profile.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" value={profile.first_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" value={profile.last_name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange}></textarea>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={profile.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input type="url" id="website" name="website" value={profile.website} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="profile_picture">Profile Picture:</label>
          <input type="file" id="profile_picture" name="profile_picture" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
