import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaChevronRight, FaSpinner, FaGithub } from 'react-icons/fa';
import { getTutorial, updateTutorialProgress } from '../services/api';
import TutorialProgress from './TutorialProgress';

const TutorialDetail = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await getTutorial(id);
        setTutorial(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tutorial. Please try again later.');
        setLoading(false);
      }
    };

    fetchTutorial();
  }, [id]);

  const handleProgressUpdate = async (newStep) => {
    try {
      await updateTutorialProgress(id, { current_step: newStep });
      setTutorial({ ...tutorial, current_step: newStep });
    } catch (err) {
      console.error('Failed to update tutorial progress:', err);
    }
  };

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

  if (!tutorial) {
    return <p className="text-gray-600 text-center">Tutorial not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{tutorial.post_title}</h1>
      <TutorialProgress totalSteps={tutorial.steps} currentStep={tutorial.current_step} />
      
      {tutorial.image && (
        <img src={tutorial.image} alt="Tutorial illustration" className="w-full rounded-lg shadow-md mb-6" />
      )}
      
      {tutorial.video && (
        <video src={tutorial.video} controls className="w-full rounded-lg shadow-md mb-6" />
      )}
      
      {tutorial.github_repo && (
        <a 
          href={tutorial.github_repo} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-600 mb-6"
        >
          <FaGithub className="mr-2" />
          View GitHub Repository
        </a>
      )}

      <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: tutorial.post.content }} />
      
      <div className="mt-8 space-y-8">
        {Array.from({ length: tutorial.steps }, (_, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              index + 1 === tutorial.current_step ? 'border-2 border-blue-500' : ''
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Step {index + 1}</h2>
            {index + 1 === tutorial.current_step && index + 1 < tutorial.steps && (
              <button
                onClick={() => handleProgressUpdate(index + 2)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
              >
                Mark as Complete
                <FaChevronRight className="ml-2" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

TutorialDetail.propTypes = {
  tutorial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    post_title: PropTypes.string.isRequired,
    post: PropTypes.shape({
      content: PropTypes.string.isRequired,
    }),
    steps: PropTypes.number.isRequired,
    current_step: PropTypes.number.isRequired,
    github_repo: PropTypes.string,
    video: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default TutorialDetail;