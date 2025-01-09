import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCertificate, FaCalendarAlt } from 'react-icons/fa';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get('/certifications/');
        setCertifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching certifications:', error);
        setError('Failed to load certifications. Please try again later.');
        setLoading(false);
      }
    };

    fetchCertifications();
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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Certifications</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our team's professional certifications and achievements.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
                <h2 className="text-xl font-semibold mb-3">{cert.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaCertificate className="mr-2" />
                  <span>Issuer: {cert.issuer}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>Date Earned: {new Date(cert.date_earned).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
