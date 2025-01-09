import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  getPosts, 
  getAPIPlaygrounds, 
  getCertifications, 
  getChallenges, 
  getCodeSnippets,
  getDevOpsShowcases,
  getInteractiveRoadmaps
} from '../services/api';
import PostList from '../components/PostList';
import Pagination from '../components/Pagination';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import APIPlaygroundList from '../components/APIPlaygroundList';
import CertificationList from '../components/CertificationList';
import ChallengeList from '../components/ChallengeList';
import CodeSnippetList from '../components/CodeSnippetList';
import DevOpsShowcaseList from '../components/DevOpsShowcaseList';
import InteractiveRoadmapList from '../components/InteractiveRoadmapList';
import PollVote from '../components/PollVote';

const StatusFilter = ({ status, setStatus }) => (
  <select 
    value={status} 
    onChange={(e) => setStatus(e.target.value)}
    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
  >
    <option value="">All</option>
    <option value="published">Published</option>
    <option value="draft">Draft</option>
  </select>
);

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [postStatus, setPostStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // State for components that fetch data
  const [apiPlaygrounds, setApiPlaygrounds] = useState([]);
  const [apiPlaygroundsLoading, setApiPlaygroundsLoading] = useState(true);
  const [apiPlaygroundsError, setApiPlaygroundsError] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [devOpsShowcases, setDevOpsShowcases] = useState([]);
  const [interactiveRoadmaps, setInteractiveRoadmaps] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setApiPlaygroundsLoading(true);
    setApiPlaygroundsError(null);
    try {
      const [
        postsResponse,
        playgroundsResponse,
        certificationsResponse,
        challengesResponse,
        snippetsResponse,
        showcasesResponse,
        roadmapsResponse
      ] = await Promise.all([
        getPosts(currentPage, postStatus),
        getAPIPlaygrounds(),
        getCertifications(),
        getChallenges(),
        getCodeSnippets(),
        getDevOpsShowcases(),
        getInteractiveRoadmaps()
      ]);

      setPosts(postsResponse.data.posts || []);
      setTotalPages(postsResponse.data.total_pages || 1);
      setApiPlaygrounds(Array.isArray(playgroundsResponse.data.results) ? playgroundsResponse.data.results : []);
      setCertifications(certificationsResponse.data || []);
      setChallenges(Array.isArray(challengesResponse.data.results) ? challengesResponse.data.results : []);
      setCodeSnippets(snippetsResponse.data || []);
      setDevOpsShowcases(showcasesResponse.data || []);
      setInteractiveRoadmaps(roadmapsResponse.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
      setApiPlaygroundsError('Failed to fetch API playgrounds. Please try again later.');
    } finally {
      setIsLoading(false);
      setApiPlaygroundsLoading(false);
    }
  }, [currentPage, postStatus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      );
    }

    return (
      <>
        <div className="mb-4">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
            Filter by status:
          </label>
          <StatusFilter status={postStatus} setStatus={setPostStatus} />
        </div>
        <PostList posts={posts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        
        <APIPlaygroundList playgrounds={apiPlaygrounds} loading={apiPlaygroundsLoading} error={apiPlaygroundsError} />
        {certifications.length > 0 && <CertificationList certifications={certifications} />}
        {Array.isArray(challenges) && challenges.length > 0 && <ChallengeList challenges={challenges} />}
        {codeSnippets.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Code Snippets</h2>
            {codeSnippets.map(snippet => (
              <CodeSnippetList key={snippet.id} snippets={[snippet]} />
            ))}
          </div>
        )}
        {devOpsShowcases.length > 0 && <DevOpsShowcaseList showcases={devOpsShowcases} />}
        {interactiveRoadmaps.length > 0 && <InteractiveRoadmapList roadmaps={interactiveRoadmaps} />}
        
        <PollVote pollId={1} options={[]} />
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">DevBlog</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {user && (
              <div className="mb-6 bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r">
                <p className="text-blue-700">Welcome, {user.email}!</p>
              </div>
            )}
            {renderMainContent()}
          </div>

          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">About Our Blog</h2>
              <p className="text-gray-600">
                Welcome to DevBlog! Here you'll find the latest insights, tutorials, and news from the world of technology and programming.
              </p>
            </div>
            <Newsletter />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogHome;
