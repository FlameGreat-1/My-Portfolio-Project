import React from 'react';
import InteractiveRoadmapList from './InteractiveRoadmapList';

const InteractiveRoadmaps = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Interactive Roadmaps</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our interactive roadmaps to guide your learning journey.
          </p>
          <InteractiveRoadmapList />
        </div>
      </div>
    </div>
  );
};

export default InteractiveRoadmaps;
