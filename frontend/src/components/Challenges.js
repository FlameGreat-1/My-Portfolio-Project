import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeList from './ChallengeList';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('/challenges/');
        setChallenges(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch challenges. Please try again later.');
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">DevOps Challenges</h1>
        <p className="text-xl text-gray-600 mb-8">
          Enhance your skills with our curated DevOps challenges. Learn, practice, and grow!
        </p>
        <ChallengeList challenges={challenges} />
      </div>
    </div>
  );
};

export default Challenges;
