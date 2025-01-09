import React, { useState } from 'react';

const ChallengeForm = ({ challenge }) => {
  const [solution, setSolution] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the solution to the backend for validation
    // For this example, we'll just compare it to the stored solution
    if (solution.trim().toLowerCase() === challenge.solution.trim().toLowerCase()) {
      setFeedback('Correct! Well done!');
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
      <p className="mb-4">{challenge.description}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          required
          rows="3"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="Enter your solution..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Submit Solution
        </button>
      </form>
      {feedback && (
        <p className={`mt-2 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default ChallengeForm;
