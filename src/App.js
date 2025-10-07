import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedRoutes from './AnimatedRoutes';
import './App.css';

import './NewComponents.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
