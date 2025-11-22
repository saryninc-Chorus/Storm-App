// filepath: /home/aseej/Downloads/ghana-crystalline-5g (2)/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// filepath: /home/aseej/Downloads/ghana-crystalline-5g (2)/src/App.jsx
import React from 'react';
import SacredInnerCircle from './components/SacredInnerCircle';

export default function App() {
  return <SacredInnerCircle />;
}
