import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';
import textData from "./textForStart";

const TextSequenceAnimation = ({ changeAnimationStatus }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  const text = textData;

  // Анимация текста
  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentTextIndex((prev) => {
        if (prev < text.length - 1) {
          return prev + 1;
        } else {
          clearInterval(textTimer);
          setIsTextComplete(true);
          return prev;
        }
      });
    }, 3000);
    
    return () => {
      clearInterval(textTimer);
    };
  }, [text.length]);

  useEffect(() => {
    if (!userAnswer) return;

    const timer = setTimeout(() => {
      setIsQuestionComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [userAnswer]);

  // Анимация фона после ответа
  useEffect(() => {
    if (!isQuestionComplete) return;

    const bgTimer = setInterval(() => {
      setBgOpacity((prev) => {
        if (prev > 0.05) {
          return prev - 0.005;
        } else {
          clearInterval(bgTimer);
          changeAnimationStatus(true);
          return 0;
        }
      });
    }, 10);

    return () => {
      clearInterval(bgTimer);
    };
  }, [isQuestionComplete, changeAnimationStatus]);

  const handleAnswer = (answerType) => {
    setUserAnswer(answerType);
  };

  return (
    <motion.div 
      className="motionContainer"
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {!userAnswer ? (
          <motion.div
            key={currentTextIndex}
            className="motionDivText"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {!isTextComplete ? text[currentTextIndex]?.text : <></> || ""}
          </motion.div>
        ) : (
          <motion.div
            key="final-text"
            className="motionDivText final-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            {userAnswer}
          </motion.div>
        )}
      </AnimatePresence>

      {isTextComplete && !userAnswer && (
        <motion.div
          className="ask-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button className="btn-answer-anim" onClick={() => handleAnswer("Я так и знал!")}>Конечно!</button>
          <button className="btn-answer-anim" onClick={() => handleAnswer("Я так и знал!")}>Еще бы!</button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TextSequenceAnimation;