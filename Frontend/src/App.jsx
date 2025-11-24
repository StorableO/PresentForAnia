import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextSequenceAnimation from './components/startWindowAnim/TextSequenceAnimation';
import PageContent from './components/mainWindow/pageContent';

const App = () => {
  return (
    <div className="App">
      <PageContent></PageContent>
    </div>
  );
};

export default App;