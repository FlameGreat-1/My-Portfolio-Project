import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCode, FaCopy } from 'react-icons/fa';


const CodeSnippet = ({ postId }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!postId || postId === 'undefined') {
        setError('No valid post ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/posts/${postId}/code-snippets/`);
        setSnippets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch code snippets. Please try again later.');
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [postId]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
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

  if (!snippets || snippets.length === 0) {
    return <p className="text-gray-600">No code snippets available for this post.</p>;
  }

  return (
    <div className="space-y-6">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <FaCode className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">{snippet.title}</h3>
            </div>
            <button
              onClick={() => copyToClipboard(snippet.code)}
              className="text-gray-500 hover:text-blue-500 transition duration-200"
              title="Copy to clipboard"
            >
              <FaCopy />
            </button>
          </div>
          <SyntaxHighlighter 
            language={snippet.language || 'javascript'} 
            style={tomorrow}
            customStyle={{margin: 0, borderRadius: 0}}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
      ))}
    </div>
  );
};

export default CodeSnippet;
