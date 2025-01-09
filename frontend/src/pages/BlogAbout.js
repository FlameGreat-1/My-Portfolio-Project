import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">About DevBlog</h1>
        <div className="prose prose-lg text-gray-600">
          <p className="mb-4">
            Welcome to DevBlog, your go-to resource for cutting-edge insights and knowledge in the world of technology and programming. We are passionate about sharing valuable information and fostering a community of lifelong learners in the tech industry.
          </p>
          <p className="mb-4">
            Our team of experienced writers and industry experts work tirelessly to bring you high-quality content that keeps you up-to-date with the latest trends, best practices, and innovative solutions in the ever-evolving tech landscape.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Our Mission</h2>
          <p className="mb-4">
            At DevBlog, our mission is to empower developers, tech enthusiasts, and professionals by providing:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>In-depth tutorials and guides on various programming languages and frameworks</li>
            <li>Insightful articles on software development methodologies and best practices</li>
            <li>Comprehensive reviews of the latest tools and technologies</li>
            <li>Expert opinions on industry trends and future predictions</li>
            <li>A platform for knowledge sharing and community engagement</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Get Involved</h2>
          <p className="mb-4">
            We believe in the power of community and encourage our readers to actively participate in discussions, share their experiences, and contribute to the growth of our collective knowledge. Here's how you can get involved:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Leave comments on articles and engage in meaningful discussions</li>
            <li>Share our content with your network to spread knowledge</li>
            <li>Follow us on social media for real-time updates and interactions</li>
            <li>Suggest topics you'd like us to cover in future articles</li>
            <li>Consider becoming a guest writer and share your expertise with our community</li>
          </ul>
          <p className="mt-8">
            Thank you for being a part of the DevBlog community. Together, we can push the boundaries of technology and create a brighter future for the world of software development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;