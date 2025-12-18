import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

import PageContent from './components/mainPage/pageContent';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import QuotesSection from './components/QuotesSection/QuoteSection';
import VideoStory from './components/VideoStory/VideoStory';
import Gallery from './components/Gallery/Gallery';

function App() {
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [activePage, setActivePage] = useState('home');
  
  if (!isAnimationDone) {
    return <PageContent changeAnimationStatus={setIsAnimationDone} />;
  }
  
  return (
    <motion.div className="App">
      <Header activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        {activePage === 'home' ? (
          <>
            <HeroSection />
            <QuotesSection />
            <VideoStory />
          </>
        ) : (
          <Gallery />
        )}
      </main>
      
      <footer className="footer text-center py-4">
        <p>С любовью для самой прекрасной девушки ❤️</p>
      </footer>
    </motion.div>
  );
}

export default App;