
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React mounting failed:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: #ef4444; font-family: sans-serif;">
      <h2>Application Failed to Load</h2>
      <pre>${error instanceof Error ? error.message : String(error)}</pre>
    </div>`;
  }
} else {
  console.error("Target container 'root' not found in the document.");
}
