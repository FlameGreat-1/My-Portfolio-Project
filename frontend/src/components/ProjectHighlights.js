import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectHighlightList from './ProjectHighlightList';

const ProjectHighlights = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/project-highlights/');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch project highlights. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Project Highlights</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover innovative projects and their impact on the tech industry.
          </p>
          <ProjectHighlightList projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectHighlights;
