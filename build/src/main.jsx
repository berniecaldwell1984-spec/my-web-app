<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { injectSpeedInsights } from '@vercel/speed-insights'

// Inject Vercel Speed Insights
injectSpeedInsights()
>>>>>>> 599edb43d3d162a2829fe56b128f67968483981d

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
