import React from 'react';
import PropTypes from 'prop-types';
import { FaServer, FaCode, FaTools } from 'react-icons/fa';

const DevOpsShowcaseList = ({ showcases }) => {
  if (!showcases || showcases.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">DevOps Showcases</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showcases.map((showcase) => (
          <div key={showcase.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3">{showcase.title}</h3>
            <p className="text-gray-600 mb-4">{showcase.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaServer className="mr-2" />
              <span>Infrastructure: {showcase.infrastructure}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaCode className="mr-2" />
              <span>Technologies: {showcase.technologies.join(', ')}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaTools className="mr-2" />
              <span>Tools: {showcase.tools.join(', ')}</span>
            </div>
            <a
              href={showcase.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
            >
              View Showcase
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

DevOpsShowcaseList.propTypes = {
  showcases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      infrastructure: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      tools: PropTypes.arrayOf(PropTypes.string).isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DevOpsShowcaseList;
