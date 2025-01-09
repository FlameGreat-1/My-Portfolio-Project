import React, { useState } from 'react';
import { votePoll } from '../services/api';

const PollForm = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await votePoll(poll.id, { option: selectedOption });
      // Optionally, you can trigger a re-fetch of the poll data here
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{poll.question}</h3>
      {poll.options.map((option) => (
        <div key={option.id} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">{option.option_text}</span>
          </label>
        </div>
      ))}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        disabled={!selectedOption}
      >
        Vote
      </button>
    </form>
  );
};

export default PollForm;
