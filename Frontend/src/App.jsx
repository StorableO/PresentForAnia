import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextSequenceAnimation from './components/startWindowAnim/TextSequenceAnimation';

const App = () => {
  return (
    <div className="App">
      <TextSequenceAnimation></TextSequenceAnimation>
    </div>
  );
};

export default App;