import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Footer from '../components/Footer';

// Import Login and Register components
import Login from '../components/Login';
import Register from '../components/Register';

// Import all your blog-related components
import BlogHome from '../pages/BlogHome';
import BlogAbout from '../pages/BlogAbout';
import PostPage from '../pages/PostPage';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import UserPosts from '../pages/UserPosts';
import Certifications from './Certifications';
import Testimonials from './Testimonials';
import LikeUnlikeButton from './LikeButton';
import SaveUnsaveButton from './SaveButton';
import Profile from './Profile';
import Dashboard from './Dashboard';
import EditProfile from './EditProfile';
import PremiumContent from '../pages/PremiumContent';
import Challenges from './Challenges';
import DevOpsShowcases from './DevOpsShowcases';
import ProjectHighlights from './ProjectHighlights';
import InteractiveRoadmaps from './InteractiveRoadmaps';
import APIPlaygrounds from './APIPlaygrounds';
import TutorialList from './TutorialList';
import TutorialDetail from './TutorialDetail';
import GuestPostRequestForm from './GuestPostRequestForm';
import Newsletter from './Newsletter';
import Resources from './Resources';
import CodeSnippet from './CodeSnippet';

function BlogLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Blog Header */}
      <header className="bg-black text-white w-full">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/blog" className="text-2xl font-bold">DevBlog</Link>
          <nav className="flex items-center space-x-4">
            <input type="text" placeholder="Search..." className="px-2 py-1 rounded text-black" />
            <Link to="/blog" className="hover:text-gray-300">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/blog/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
              </>
            ) : (
              <>
                <button onClick={handleLoginClick} className="hover:text-gray-300">Login</button>
                <button onClick={handleRegisterClick} className="hover:text-gray-300">Register</button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Blog Routes */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route index element={<BlogHome />} />
          <Route path="about" element={<BlogAbout />} />
          <Route path="post/:slug" element={<PostPage />} />
          <Route path="user/:username" element={<UserPosts />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="edit-post/:slug" element={<PrivateRoute><EditPost /></PrivateRoute>} />
          <Route path="like-unlike" element={<LikeUnlikeButton />} />
          <Route path="save-unsave" element={<SaveUnsaveButton />} />
          <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="premium-content" element={<PrivateRoute><PremiumContent /></PrivateRoute>} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="devops-showcases" element={<DevOpsShowcases />} />
          <Route path="project-highlights" element={<ProjectHighlights />} />
          <Route path="interactive-roadmaps" element={<InteractiveRoadmaps />} />
          <Route path="api-playgrounds" element={<APIPlaygrounds />} />
          <Route path="tutorials" element={<TutorialList />} />
          <Route path="tutorial/:id" element={<TutorialDetail />} />
          <Route path="guest-post-request" element={<GuestPostRequestForm />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="resources" element={<Resources />} />
          <Route path="code-snippet" element={<CodeSnippet />} />
        </Routes>
      </main>

      <Footer />

      {/* Login Modal */}
      {isLoginOpen && (
        <Login isOpen={isLoginOpen} onClose={handleCloseLogin} />
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <Register isOpen={isRegisterOpen} onClose={handleCloseRegister} />
      )}
    </div>
  );
}

export default BlogLayout;
