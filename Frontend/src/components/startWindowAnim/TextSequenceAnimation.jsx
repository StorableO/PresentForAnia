import React, { useEffect, useState } from "react";
import {motion, AnimatePresence} from 'framer-motion';
import './styles.css'
import textData from "./textForStart";

const TextSequenceAnimation = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  // const navigate = useNavigate()

  const text = textData;

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
  }, []);

  useEffect( () =>{
    if(!isTextComplete) return;

    if(isTextComplete){
        const bgTimer = setInterval(() => {
      setBgOpacity((prev) => {
        if (prev > 0.1) {
          return prev - 0.005;
        } else {
          clearInterval(bgTimer);
          setIsFinish(true);
          return 0;
        }
      });
    }, 10);

    return () =>{
        clearInterval(bgTimer);
    }
    }
  }, [isTextComplete])

  useEffect(()=>{
    if(!isFinish) return;


  }, [isFinish])
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };


  return (
    <motion.div 
      className="motionContainer"
      style={{background: `rgba(0,0,0, ${bgOpacity})`}}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          className="motionDivText"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {text[currentTextIndex].text}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
export default TextSequenceAnimation;