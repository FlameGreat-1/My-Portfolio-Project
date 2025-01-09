import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUserPosts } from '../services/api';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { username } = useParams();

  const fetchUserPosts = useCallback(async () => {
    try {
      const response = await getUserPosts(username, currentPage);
      setPosts(response.posts);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  }, [username, currentPage]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);


  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Posts by {username}</h1>
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserPosts;
