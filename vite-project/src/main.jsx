import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import AppWrapper from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
