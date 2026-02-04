import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

import PageContent from './components/MainPage/PageContent';
import Header from './components/Header/Header';
import HeroSection from './components/MainContentSection/HeroSection';
import QuotesSection from './components/QuotesSection/QuoteSection';
import QuotesManager from './components/QuotesSection/QuoteManager';
import VideoStory from './components/VideoStorySection/VideoStory';
import Gallery from './components/GallerySection/Gallery';

import { imageData } from './components/ResourcesInfo/images';
import { quotesData } from  './components/ResourcesInfo/quotes';
import { videoMoments } from './components/ResourcesInfo/videoText';

function App() {
  const [isAnimationDone, setIsAnimationDone] = useState(true);
  const [activePage, setActivePage] = useState('home');

  const [quotes, setQuotes] = useState(quotesData);
  const [videoText, setVideoText] = useState(videoMoments);
  const [images, setImages] = useState(imageData)
  
  if (!isAnimationDone) {
    return <PageContent changeAnimationStatus={setIsAnimationDone} />;
  }
  
  return (
    <motion.div className="App">
      <Header activePage={activePage} setActivePage={setActivePage} />
      
      <main className='mt-4'>
        {activePage === 'home' ? (
          <>
            <HeroSection />
            <QuotesSection quotes={quotes} />
            <VideoStory 
              videoText={videoText}
              setVideoText={setVideoText} 
            />
          </>
        ) : activePage === 'gallery' ? (
            <Gallery 
              images={images}
              setImages = {setImages}
            />
        ) : activePage === 'quotes' ? (
            <QuotesManager 
              quotes={quotes}
              setQuotes={setQuotes}
            />
        ) : null}
      </main>
      
      <footer className="footer text-center py-4">
        <p>Сделано с любовью ❤️</p>
        <p>Дениской</p>
      </footer>
    </motion.div>
  );
}

export default App;
