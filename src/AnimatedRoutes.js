import React, { useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Kiky from './Kiky';
import AdminQuantumSpell from './AdminQuantumSpell';
import NextStage from './NextStage';
import StormVoiceSpeaker from './StormVoiceSpeaker';
import WillOfTheStorm from './WillOfTheStorm';
import Father from './Father';
import Mother from './Mother';
import Weaver from './Weaver';
import Asemole from './Asemole';
import Children from './Children';
import Chorus from './Chorus';
import EchoesOfTruth from './EchoesOfTruth';
import RitualBinding from './RitualBinding';
import MetaIsi from './MetaIsi';

// Animations temporarily disabled pending dependency stabilization

function AnimatedRoutes() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Determine directional transition
  const dirClass = useMemo(() => {
    const prev = prevPathRef.current;
    const curr = location.pathname;
    if (prev === curr) return 'page-fade-enter page-fade-enter-active';

    // Define hub and pillars
    const hub = '/meta-isi';
    const pillars = ['/mother', '/father', '/children'];

    const isHubPrev = prev === hub;
    const isHubCurr = curr === hub;
    const prevIdx = pillars.indexOf(prev);
    const currIdx = pillars.indexOf(curr);

    // Hub -> Pillar: slide-up; Pillar -> Hub: slide-down
    if (isHubPrev && currIdx !== -1) return 'slide-up';
    if (isHubCurr && prevIdx !== -1) return 'slide-down';

    // Pillar -> Pillar: left/right by index order (father < mother < children if desired)
    if (prevIdx !== -1 && currIdx !== -1) {
      return currIdx > prevIdx ? 'slide-left' : 'slide-right';
    }

    // Default subtle fade
    return 'page-fade-enter page-fade-enter-active';
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<div className={dirClass}><Kiky /></div>}
        />
        <Route
          path="/meta-isi"
          element={<div className={dirClass}><MetaIsi /></div>}
        />
        <Route
          path="/nextstage"
          element={<div className={dirClass}><NextStage /></div>}
        />
        <Route
          path="/stormvoicespeaker"
          element={<div className={dirClass}><StormVoiceSpeaker /></div>}
        />
        <Route
          path="/willofthestorm"
          element={<div className={dirClass}><WillOfTheStorm /></div>}
        />
        <Route
          path="/father"
          element={<div className={dirClass}><Father /></div>}
        />
        <Route
          path="/mother"
          element={<div className={dirClass}><Mother /></div>}
        />
        <Route
          path="/weaver"
          element={<div className={dirClass}><Weaver /></div>}
        />
        <Route
          path="/asemole"
          element={<div className={dirClass}><Asemole /></div>}
        />
        <Route
          path="/children"
          element={<div className={dirClass}><Children /></div>}
        />
        <Route
          path="/chorus"
          element={<div className={dirClass}><Chorus /></div>}
        />
        <Route
          path="/ritualbinding"
          element={<div className={dirClass}><RitualBinding /></div>}
        />
        <Route
          path="/echoes"
          element={<div className={dirClass}><EchoesOfTruth /></div>}
        />
        <Route
          path="/admin"
          element={<div className={dirClass}><AdminQuantumSpell /></div>}
        />
    </Routes>
  );
}

export default AnimatedRoutes;
