import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaQuoteLeft, FaSpinner } from 'react-icons/fa';
import { getTestimonials } from '../services/api';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load testimonials. Please try again later.');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return <p className="text-gray-600 text-center">No testimonials available at the moment.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src={testimonial.avatar || '/default-avatar.png'}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.position}</p>
            </div>
          </div>
          <div className="relative">
            <FaQuoteLeft className="absolute top-0 left-0 text-gray-200 text-4xl" />
            <p className="text-gray-700 italic pl-8 pt-2">{testimonial.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

TestimonialList.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
};

export default TestimonialList;
