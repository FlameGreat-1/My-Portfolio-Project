import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/accounts/dashboard/');
      setDashboardData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;
  if (!dashboardData) return <div>No dashboard data available.</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Your Posts</h3>
          <p>{dashboardData.user_posts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Liked Posts</h3>
          <p>{dashboardData.liked_posts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Saved Posts</h3>
          <p>{dashboardData.saved_posts.length}</p>
        </div>
      </div>
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          {dashboardData.recent_activity.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
      <Link to="/profile" className="view-profile-btn">View Full Profile</Link>
    </div>
  );
};

export default Dashboard;
