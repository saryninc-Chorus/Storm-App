import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
