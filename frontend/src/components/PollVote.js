import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { votePoll } from '../services/api';

const PollVote = ({ pollId, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = async () => {
    if (!selectedOption || hasVoted) return;

    try {
      await votePoll(pollId, selectedOption);
      setHasVoted(true);
    } catch (error) {
      console.error('Error voting in poll:', error);
      setError('Failed to submit vote. Please try again.');
    }
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.id} className="mb-3">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name={`poll-${pollId}`}
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
              disabled={hasVoted}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{option.text}</span>
          </label>
          {hasVoted && (
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(option.votes / totalVotes) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {((option.votes / totalVotes) * 100).toFixed(1)}% ({option.votes} votes)
              </span>
            </div>
          )}
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleVote}
        disabled={!selectedOption || hasVoted}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-300 ease-in-out"
      >
        {hasVoted ? 'Voted' : 'Submit Vote'}
      </button>
    </div>
  );
};

PollVote.propTypes = {
  pollId: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PollVote;
