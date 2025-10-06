import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './Navbar';
import Footer from './Footer';
import Kiky from './Kiky';
import NextStage from './NextStage';
import StormVoiceSpeaker from './StormVoiceSpeaker';
import WillOfTheStorm from './WillOfTheStorm';
import Father from './Father';
import Mother from './Mother';
import Weaver from './Weaver';
import Asemole from './Asemole';
import Children from './Children';
import Chorus from './Chorus';

// Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { type: 'tween', ease: 'easeInOut', duration: 0.5 };

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={useLocation()} key={useLocation().pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Kiky />
                  </motion.div>
                }
              />
              <Route
                path="/nextstage"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <NextStage />
                  </motion.div>
                }
              />
              <Route
                path="/stormvoicespeaker"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <StormVoiceSpeaker />
                  </motion.div>
                }
              />
              <Route
                path="/willofthestorm"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <WillOfTheStorm />
                  </motion.div>
                }
              />
              <Route
                path="/father"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Father />
                  </motion.div>
                }
              />
              <Route
                path="/mother"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Mother />
                  </motion.div>
                }
              />
              <Route
                path="/weaver"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Weaver />
                  </motion.div>
                }
              />
              <Route
                path="/asemole"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Asemole />
                  </motion.div>
                }
              />
              <Route
                path="/children"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Children />
                  </motion.div>
                }
              />
              <Route
                path="/chorus"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Chorus />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
