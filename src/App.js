import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Kiky from './Kiky';
import NextStage from './NextStage';
import StormArchive from './StormArchive';
import WillOfTheStorm from './WillOfTheStorm';
import StormVoiceSpeaker from './StormVoiceSpeaker';
import Father from './Father';
import Mother from './Mother';
import Weaver from './Weaver';
import Asemole from './Asemole';
import Children from './Children';
import Chorus from './Chorus';
import Footer from './Footer';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Kiky />
        <NextStage />
        <StormArchive />
        <WillOfTheStorm />
        <StormVoiceSpeaker />
        <Father />
        <Mother />
        <Weaver />
        <Asemole />
        <Children />
        <Chorus />
      </main>
      <Footer />
    </div>
  );
}

export default App;
