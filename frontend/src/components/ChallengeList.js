import React from 'react';
import PropTypes from 'prop-types';
import { FaTrophy, FaClock, FaUserGraduate } from 'react-icons/fa';

const ChallengeList = ({ challenges }) => {
  console.log('Challenges received in ChallengeList:', challenges);

  if (!Array.isArray(challenges) || challenges.length === 0) {
    console.log('No challenges to display or invalid challenges data');
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Challenges</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaTrophy className="mr-2" />
              <span>Difficulty: {challenge.difficulty}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaClock className="mr-2" />
              <span>Duration: {challenge.duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaUserGraduate className="mr-2" />
              <span>Participants: {challenge.participants_count}</span>
            </div>
            <a
              href={challenge.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Start Challenge
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      participants_count: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChallengeList;
