import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/auth/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('token', response.data.access);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication
export const login = (credentials) => api.post('/auth/login/', credentials);
export const register = (userData) => api.post('/auth/register/', userData);
export const logout = () => api.post('/auth/logout/');
export const loginUser = login;
export const registerUser = register;
export const verifyOTP = (otpData) => api.post('/auth/verify-otp/', otpData);
export const resendOTP = (userData) => api.post('/auth/resend-otp/', userData);
export const loginWithGoogle = (tokenId) => api.post('/auth/google/', { token: tokenId });
export const registerWithGoogle = (tokenId) => api.post('/auth/google/register/', { token: tokenId });

// Posts
export const getPosts = (page = 1, status = 'published') => api.get(`/posts/?page=${page}&status=${status}`);
export const getPost = (slug) => api.get(`/posts/${slug}/`);
export const createPost = (postData) => api.post('/posts/new/', postData);
export const updatePost = (slug, postData) => api.put(`/posts/${slug}/update/`, postData);
export const deletePost = (slug) => api.delete(`/posts/${slug}/delete/`);
export const getUserPosts = (username, page = 1) => api.get(`/user/${username}/?page=${page}`);
export const likePost = (postId) => api.post(`/posts/${postId}/like/`);
export const savePost = (postId) => api.post(`/posts/${postId}/save/`);
export const ratePost = (postId, rating) => api.post(`/posts/${postId}/rate/`, { rating });

// Comments
export const getComments = (postId) => api.get(`/posts/${postId}/comments/`);
export const createComment = (postId, commentData) => api.post(`/posts/${postId}/comments/`, commentData);

// Polls
export const createPoll = (postId, pollData) => api.post(`/posts/${postId}/polls/`, pollData);
export const votePoll = (pollId, optionId) => api.post(`/polls/${pollId}/vote/`, { option: optionId });
export const getPolls = () => api.get('/polls/');

// Challenges
export const createChallenge = (postId, challengeData) => api.post(`/posts/${postId}/challenges/`, challengeData);
export const getChallenges = () => api.get('/challenges/');

// Certifications
export const getCertifications = () => api.get('/certifications/');

// Testimonials
export const getTestimonials = () => api.get('/testimonials/');

// Newsletter
export const subscribeNewsletter = (email) => api.post('/newsletter-signup/', { email });

// Resources
export const createResource = (postId, resourceData) => api.post(`/posts/${postId}/resources/`, resourceData);
export const getResources = (postId) => api.get(`/posts/${postId}/resources/`);
export const getAllResources = () => api.get('/resources/');

// Code Snippets
export const createCodeSnippet = (postId, snippetData) => api.post(`/posts/${postId}/code-snippets/`, snippetData);
export const getCodeSnippets = (postId) => api.get(`/posts/${postId}/code-snippets/`);

// DevOps Showcases
export const createDevOpsShowcase = (postId, showcaseData) => api.post(`/posts/${postId}/devops-showcases/`, showcaseData);
export const getDevOpsShowcases = () => api.get('/devops-showcases/');

// Project Highlights
export const createProjectHighlight = (postId, highlightData) => api.post(`/posts/${postId}/project-highlights/`, highlightData);
export const getProjectHighlights = () => api.get('/project-highlights/');

// Interactive Roadmaps
export const createInteractiveRoadmap = (postId, roadmapData) => api.post(`/posts/${postId}/interactive-roadmaps/`, roadmapData);
export const getInteractiveRoadmaps = () => api.get('/interactive-roadmaps/');

// API Playgrounds
export const createAPIPlayground = (postId, playgroundData) => api.post(`/posts/${postId}/api-playgrounds/`, playgroundData);
export const getAPIPlaygrounds = () => api.get('/api-playgrounds/');

// Tutorials
export const updateTutorialProgress = (tutorialId, progressData) => api.post(`/tutorials/${tutorialId}/progress/`, progressData);
export const getTutorial = (id) => api.get(`/tutorials/${id}/`);
export const getTutorials = () => api.get('/tutorials/');

// User Profile and Dashboard
export const getProfile = () => api.get('/accounts/profile/');
export const updateProfile = (profileData) => api.put('/accounts/profile/', profileData);
export const getDashboard = () => api.get('/accounts/dashboard/');

// Subscriptions
export const subscribeCategory = (categoryId) => api.post(`/categories/${categoryId}/subscribe/`);
export const subscribeAuthor = (authorId) => api.post(`/authors/${authorId}/subscribe/`);

// Premium Content
export const getPremiumContent = () => api.get('/premium-content/');

// Guest Post Requests
export const createGuestPostRequest = (requestData) => api.post('/guest-post-requests/', requestData);

// Search
export const search = (query) => api.get(`/search/?q=${query}`);

export default api;
