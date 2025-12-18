
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader.tsx';
import ResultView from './components/ResultView.tsx';
import { processHandwriting } from './services/geminiService.ts';
import { TransliterationState, FileData } from './types.ts';

const App: React.FC = () => {
  const [state, setState] = useState<TransliterationState>({
    image: null,
    result: null,
    isLoading: false,
    error: null,
  });

  const handleImageSelect = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      const previewUrl = result;

      setState(prev => ({
        ...prev,
        image: previewUrl,
        isLoading: true,
        error: null,
        result: null
      }));

      try {
        const fileData: FileData = {
          base64,
          mimeType: file.type,
        };

        const transliteratedText = await processHandwriting(fileData);
        setState(prev => ({
          ...prev,
          result: transliteratedText,
          isLoading: false
        }));
      } catch (err: any) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message || "Failed to process image. Please try again."
        }));
      }
    };
    reader.onerror = () => {
      setState(prev => ({ ...prev, error: "Failed to read the selected file." }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReset = () => {
    setState({
      image: null,
      result: null,
      isLoading: false,
      error: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-900/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">LyricScribe</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide mt-1 uppercase">Native Kannada Transliteration</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="text-xs text-slate-400 font-semibold px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700 uppercase tracking-wider">
              AI Powered Workflow
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {state.error && (
          <div className="w-full max-w-2xl mb-8 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{state.error}</p>
          </div>
        )}

        {!state.image && !state.isLoading && (
          <div className="w-full h-full flex items-center justify-center mt-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="max-w-2xl w-full text-center">
              <div className="mb-10 space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Handwriting to Script</h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto">
                  Video editors: Transliterate Kannada lyrics written in Devanagari back to native characters instantly.
                </p>
              </div>
              <ImageUploader onImageSelect={handleImageSelect} isLoading={state.isLoading} />
            </div>
          </div>
        )}

        {state.isLoading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in duration-500">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-800 border-t-sky-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-sky-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white">Analyzing the written script</h3>
              <p className="text-slate-400">AI is reading your handwriting and converting the script...</p>
            </div>
          </div>
        )}

        {state.image && !state.isLoading && state.result && (
          <ResultView image={state.image} result={state.result} onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;
