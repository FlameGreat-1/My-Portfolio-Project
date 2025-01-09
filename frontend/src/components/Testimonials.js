import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const fetchedTestimonials = await getTestimonials();
      setTestimonials(fetchedTestimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Testimonials</h1>
      <div className="space-y-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">{testimonial.content}</p>
            <div className="flex items-center">
              <img
                src={testimonial.author_image || '/default-avatar.png'}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
