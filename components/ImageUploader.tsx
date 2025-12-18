
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full max-w-2xl mx-auto border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center p-12 text-center bg-slate-800/50 backdrop-blur-sm
        ${isDragging ? 'border-cyan-400 bg-cyan-400/10 scale-[1.02]' : 'border-slate-600 hover:border-slate-400'}
        ${isLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
      `}
    >
      <div className="mb-4 p-4 rounded-full bg-slate-700/50 text-cyan-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Upload Lyrics Image</h3>
      <p className="text-slate-400 mb-6">Drag and drop a photo of your handwritten lyrics here, or click to browse.</p>
      
      <label className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors cursor-pointer shadow-lg shadow-cyan-900/20">
        Choose File
        <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
      </label>
      
      <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest">Supports JPG, PNG, WEBP</p>
    </div>
  );
};

export default ImageUploader;
