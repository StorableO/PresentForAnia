import React, { useRef, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import './VideoStory.css';

const VideoStory = ({ videoText }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const initializeVideoStates = () => {
    const states = {};
    videoText?.forEach((moment, index) => {
      states[index] = {
        isPlaying: false,
        videoRef: React.createRef()
      };
    });
    return states;
  };

  const [videoStates, setVideoStates] = useState(() => initializeVideoStates());

  const handlePlayPause = (index) => {
    const videoState = videoStates[index];
    const videoElement = videoState.videoRef.current;
    
    if (!videoElement) return;
    
    if (videoState.isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    
    setVideoStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        isPlaying: !prev[index].isPlaying
      }
    }));
  };

  const itemVariants = (index) => ({
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.2
      }
    }
  });

  const finalMessageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: 0.5
      }
    }
  };

  if (!videoText || videoText.length === 0) {
    return (
      <section className="video-story" ref={sectionRef}>
        <Container>
          <h2>История нашего видео</h2>
          <p>Нет данных для отображения</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="video-story" ref={sectionRef}>
      <Container>
        <motion.h2 
          className="video-story-title"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          История нашего видео
        </motion.h2>
        
        <motion.p 
          className="video-story-subtitle"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Каждый момент нашей истории — это кадр в самом красивом фильме моей жизни
        </motion.p>
        
        <div className="timeline-container">
          <div className="timeline">
            {videoText.map((moment, index) => (
              <motion.div
                key={moment.id}
                variants={itemVariants(index)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`video-moment ${index % 2 === 0 ? 'moment-left' : 'moment-right'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="moment-card"
                  style={{ backgroundColor: moment.color || '#f8f9fa' }}
                >
                  <Card.Body>
                    <motion.h5 
                      className="card-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {moment.title}
                    </motion.h5>
                    
                    <div className="video-player-container mb-3">
                      <video
                        ref={videoStates[index]?.videoRef}
                        src={moment.url} 
                        controls
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          borderRadius: '10px',
                          maxHeight: '300px'
                        }}
                        onPlay={() => {
                          setVideoStates(prev => ({
                            ...prev,
                            [index]: { ...prev[index], isPlaying: true }
                          }));
                        }}
                        onPause={() => {
                          setVideoStates(prev => ({
                            ...prev,
                            [index]: { ...prev[index], isPlaying: false }
                          }));
                        }}
                      />
                    </div>

                    <motion.p 
                      className="card-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {moment.description}
                    </motion.p>
                    
                    {moment.date && (
                      <motion.p 
                        className="text-muted small"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {moment.date}
                      </motion.p>
                    )}
                    
                    <motion.div 
                      className="moment-number"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                        delay: 0.3
                      }}
                    >
                      {moment.id}
                    </motion.div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="final-message-container"
          variants={finalMessageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="final-message">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              И это только начало нашей истории...
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-0"
            >
              Каждый день с тобой — это новый прекрасный кадр в нашем фильме
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VideoStory;