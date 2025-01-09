import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/api';
import PostForm from '../components/PostForm';

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const fetchedPost = await getPost(slug);
      setPost(fetchedPost);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <div>Loading...</div>;
  }


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
};

export default EditPost;
