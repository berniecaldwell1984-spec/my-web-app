import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App';

// Inject Vercel Speed Insights
injectSpeedInsights();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
