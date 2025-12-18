
import React, { useState } from 'react';

interface ResultViewProps {
  image: string;
  result: string;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ image, result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
          Transliteration Result
        </h2>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Original Image Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-widest text-slate-500">Original Image</h3>
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
            <img 
              src={image} 
              alt="Handwritten Lyrics" 
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </div>
        </div>

        {/* Transliterated Text Section */}
        <div className="space-y-3 flex flex-col h-full">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-medium uppercase tracking-widest text-slate-500">Transliterated Script</h3>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                copied 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white'
              }`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy All
                </>
              )}
            </button>
          </div>
          <div className="flex-grow rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl overflow-y-auto max-h-[600px]">
            <pre className="whitespace-pre-wrap text-lg leading-relaxed text-slate-200 kannada-text font-sans">
              {result}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
