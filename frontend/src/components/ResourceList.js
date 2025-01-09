import React from 'react';
import PropTypes from 'prop-types';
import { FaFile, FaExternalLinkAlt } from 'react-icons/fa';

const ResourceList = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-2">
              <FaFile className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">{resource.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
            <a
              href={resource.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Download Resource
              <FaExternalLinkAlt className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

ResourceList.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      file: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ResourceList;
