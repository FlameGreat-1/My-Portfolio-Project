import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCode, FaCopy } from 'react-icons/fa';

const CodeSnippetList = ({ snippets }) => {
  if (!snippets || snippets.length === 0) {
    return null;
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Code Snippets</h2>
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
    </div>
  );
};

CodeSnippetList.propTypes = {
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      language: PropTypes.string,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CodeSnippetList;
