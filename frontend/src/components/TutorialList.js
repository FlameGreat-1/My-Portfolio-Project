import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaBook, FaSpinner, FaGithub, FaVideo, FaImage } from 'react-icons/fa';
import { getTutorials } from '../services/api';

const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await getTutorials();
        setTutorials(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tutorials. Please try again later.');
        setLoading(false);
      }
    };

    fetchTutorials();
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

  if (tutorials.length === 0) {
    return <p className="text-gray-600 text-center">No tutorials available at the moment.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tutorials.map((tutorial) => (
        <Link
          key={tutorial.id}
          to={`/tutorials/${tutorial.id}`}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center mb-4">
            <FaBook className="text-blue-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold">{tutorial.post_title}</h3>
          </div>
          <p className="text-gray-600 mb-4">{tutorial.post.content.substring(0, 100)}...</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{tutorial.steps} steps</span>
            <div className="flex space-x-2">
              {tutorial.github_repo && <FaGithub className="text-gray-500" />}
              {tutorial.video && <FaVideo className="text-gray-500" />}
              {tutorial.image && <FaImage className="text-gray-500" />}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

TutorialList.propTypes = {
  tutorials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      post_title: PropTypes.string.isRequired,
      post: PropTypes.shape({
        content: PropTypes.string.isRequired,
      }),
      steps: PropTypes.number.isRequired,
      github_repo: PropTypes.string,
      video: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};

export default TutorialList;