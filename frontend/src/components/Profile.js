import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className="profile-container">
      <h1>{profile.username}'s Profile</h1>
      <img src={profile.profile_picture || '/default-avatar.png'} alt="Profile" className="profile-picture" />
      <div className="profile-details">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Bio:</strong> {profile.bio || 'No bio available'}</p>
        <p><strong>Location:</strong> {profile.location || 'Not specified'}</p>
        <p><strong>Website:</strong> {profile.website ? <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a> : 'Not specified'}</p>
      </div>
      <Link to="/edit-profile" className="edit-profile-btn">Edit Profile</Link>
    </div>
  );
};

export default Profile;
