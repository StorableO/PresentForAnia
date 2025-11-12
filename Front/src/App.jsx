import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TextSequenceAnimation = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);

  const texts = [
    "Добро пожаловать",
    "Исследуйте возможности",
    "Начните свое путешествие",
    "Готовы начать?"
  ];

  useEffect(() => {

    const textTimer = setInterval(() => {
      setCurrentTextIndex((prev) => {
        if (prev < texts.length - 1) {
          return prev + 1;
        } else {
          clearInterval(textTimer);
          return prev;
        }
      });
    }, 1500);

    // Анимация осветления фона
    const bgTimer = setInterval(() => {
      setBgOpacity((prev) => {
        if (prev > 0.1) {
          return prev - 0.05;
        } else {
          clearInterval(bgTimer);
          setIsComplete(true);
          return 0;
        }
      });
    }, 100);

    return () => {
      clearInterval(textTimer);
      clearInterval(bgTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="main-content"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Добро пожаловать на сайт!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Анимация завершена. Теперь вы можете просматривать основной контент.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: rgb(0, 0, 0),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '2rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {texts[currentTextIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="App">
      <TextSequenceAnimation />
    </div>
  );
};

export default App;