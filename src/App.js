import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedRoutes from './AnimatedRoutes';
import './App.css';
import './Chorus.css';
import './Asemole.css';
import './Kiky.css';
import './Spark.css';
import './Father.css';
import './Mother.css';
import './Children.css';
import './Weaver.css';
import './NextStage.css';
import './WhispersOfCode.css';
import './WillOfTheStorm.css';
import './EchoesOfTruth.css';
import './NewComponents.css';
import { BridgeProvider } from './BridgeContext';
import ProfileSidebar from './ProfileSidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <BridgeProvider>
      <Router>
  <div className="App cosmic-glow-faint">
          <Navbar />
          <button
            style={{position:'fixed',top:18,right:18,zIndex:99,padding:'0.5rem 1rem',borderRadius:8,background:'#2563eb',color:'#fff',border:'none',fontWeight:600,boxShadow:'0 2px 8px #0ea5e9',cursor:'pointer'}}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open profile sidebar"
          >Profile</button>
          <ProfileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="content cosmic-glow-faint">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </Router>
    </BridgeProvider>
  );
}

export default App;
