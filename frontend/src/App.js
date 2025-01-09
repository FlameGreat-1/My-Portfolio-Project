import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './components/ProjectDetail';


// Blog import
import BlogLayout from './components/BlogLayout';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-eerie-black-1 text-litewhite">
        <Routes>
          {/* Main Portfolio Routes (No Authentication) */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<ProjectDetail />} />


          {/* Blog Routes (With Authentication) */}
          <Route 
            path="/blog/*" 
            element={
              <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <AuthProvider>
                  <BlogLayout />
                </AuthProvider>
              </GoogleOAuthProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
