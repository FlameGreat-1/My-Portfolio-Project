import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaRoad, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { getInteractiveRoadmaps } from '../services/api';

const InteractiveRoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await getInteractiveRoadmaps();
        setRoadmaps(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load roadmaps. Please try again later.');
        setLoading(false);
      }
    };

    fetchRoadmaps();
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

  if (roadmaps.length === 0) {
    return <p className="text-gray-600 text-center">No roadmaps available at the moment.</p>;
  }

  return (
    <div className="space-y-6">
      {roadmaps.map((roadmap) => (
        <div key={roadmap.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <FaRoad className="mr-2 text-blue-500" />
              {roadmap.title}
            </h3>
            <p className="text-gray-600 mb-4">{roadmap.description}</p>
            <div className="space-y-3">
              {roadmap.steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-3">
                    {index + 1}
                  </div>
                  <p className="flex-grow">{step}</p>
                  {index < roadmap.steps.length - 1 && (
                    <FaChevronRight className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
            <a
              href={roadmap.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Start this Roadmap
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

InteractiveRoadmapList.propTypes = {
  roadmaps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      steps: PropTypes.arrayOf(PropTypes.string).isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default InteractiveRoadmapList;
