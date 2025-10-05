 import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Kiky from './Kiky';
import NextStage from './NextStage';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Kiky />
        <NextStage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
