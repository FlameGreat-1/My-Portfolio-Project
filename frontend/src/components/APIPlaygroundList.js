import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCode, FaPlay, FaSpinner } from 'react-icons/fa';
import { getAPIPlaygrounds } from '../services/api';

const APIPlaygroundList = () => {
  const [playgrounds, setPlaygrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaygrounds = async () => {
      try {
        const response = await getAPIPlaygrounds();
        setPlaygrounds(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load API playgrounds. Please try again later.');
        setLoading(false);
      }
    };

    fetchPlaygrounds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (playgrounds.length === 0) {
    return <p className="text-gray-600 text-center">No API playgrounds available at the moment.</p>;
  }

  return (
    <div className="space-y-6">
      {playgrounds.map((playground) => (
        <div key={playground.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <FaCode className="mr-2 text-blue-500" />
              {playground.title}
            </h3>
            <p className="text-gray-600 mb-4">{playground.description}</p>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <pre className="text-sm overflow-x-auto">
                <code>{playground.sampleCode}</code>
              </pre>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">API: {playground.apiName}</span>
              <a
                href={playground.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                <FaPlay className="mr-2" />
                Try it out
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

APIPlaygroundList.propTypes = {
  playgrounds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      apiName: PropTypes.string.isRequired,
      sampleCode: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default APIPlaygroundList;
