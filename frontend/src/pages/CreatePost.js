import React from 'react';
import PostForm from '../components/PostForm';

const CreatePost = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </div>
  );
};

export default CreatePost;
