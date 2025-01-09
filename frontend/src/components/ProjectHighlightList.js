import React from 'react';
import PropTypes from 'prop-types';
import { FaProjectDiagram, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const ProjectHighlightList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Project Highlights</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaProjectDiagram className="mr-2" />
              <span>Type: {project.project_type}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaUsers className="mr-2" />
              <span>Team Size: {project.team_size}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaCalendarAlt className="mr-2" />
              <span>Duration: {project.duration}</span>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

ProjectHighlightList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      project_type: PropTypes.string.isRequired,
      team_size: PropTypes.number.isRequired,
      duration: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProjectHighlightList;
