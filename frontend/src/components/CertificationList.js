import React from 'react';
import PropTypes from 'prop-types';
import { FaCertificate, FaCalendar, FaGraduationCap } from 'react-icons/fa';

const CertificationList = ({ certifications }) => {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification) => (
          <div key={certification.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-3">
              <FaCertificate className="text-blue-500 text-2xl mr-2" />
              <h3 className="text-xl font-semibold">{certification.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{certification.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaCalendar className="mr-2" />
              <span>Valid for: {certification.validity}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaGraduationCap className="mr-2" />
              <span>Level: {certification.level}</span>
            </div>
            <a
              href={certification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

CertificationList.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      validity: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CertificationList;
