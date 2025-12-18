import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { motion, spring } from 'framer-motion';
import './VideoStory.css';

const VideoStory = () => {
  const videoMoments = [
    {
      id: 1,
      title: "Первая встреча",
      description: "Тот самый день, когда все началось. Помню твою улыбку и как ты смотрела на меня.",
      date: "Начало нашей истории",
      color: "#ffccd5"
    },
    {
      id: 2,
      title: "Первое свидание",
      description: "Мы гуляли весь вечер и разговаривали обо всем на свете. Я понял, что хочу видеть тебя каждый день.",
      date: "Незабываемый вечер",
      color: "#c9e4ff"
    },
    {
      id: 3,
      title: "Наши совместные путешествия",
      description: "Каждая поездка с тобой — это приключение. Мы открывали новые места и создавали воспоминания.",
      date: "Множество счастливых моментов",
      color: "#d0f0c0"
    },
    {
      id: 4,
      title: "Твоя поддержка",
      description: "В трудные моменты ты всегда была рядом. Твоя вера в меня делает меня сильнее.",
      date: "Все это время",
      color: "#fcf4a3"
    },
    {
      id: 5,
      title: "Простые радости",
      description: "Вечера за чашкой чая, совместные завтраки, смех над шутками — с тобой даже обычное становится особенным.",
      date: "Каждый день",
      color: "#e6d3ff"
    },
    {
      id: 6,
      title: "Планы на будущее",
      description: "Я смотрю вперед и вижу там тебя. Наши мечты и планы, которые мы обязательно осуществим вместе.",
      date: "Наше будущее",
      color: "#ffd8b1"
    }
  ];

  const [visibleMoments, setVisibleMoments] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const momentElements = document.querySelectorAll('.video-moment');
      
      momentElements.forEach((el, index) => {
        if (el.offsetTop < scrollPosition - 150) {
          if (!visibleMoments.includes(index)) {
            setVisibleMoments(prev => [...prev, index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleMoments]);

  return (
    <section className="video-story">
      <Container>
        <h2 className="video-story-title">История нашего видео</h2>
        <p className="video-story-subtitle">Каждый момент нашей истории — это кадр в самом красивом фильме моей жизни</p>
        
        <div className="timeline-container">
          <div className="timeline">
            {videoMoments.map((moment, index) => (
              <motion
                key={moment.id}
                defaultStyle={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                style={{
                  opacity: spring(visibleMoments.includes(index) ? 1 : 0),
                  x: spring(visibleMoments.includes(index) ? 0 : (index % 2 === 0 ? -50 : 50))
                }}
              >
                {style => (
                  <div 
                    className={`video-moment ${index % 2 === 0 ? 'moment-left' : 'moment-right'}`}
                    style={{
                      opacity: style.opacity,
                      transform: `translateX(${style.x}px)`
                    }}
                  >
                    <Card 
                      className="moment-card"
                      style={{ backgroundColor: moment.color }}
                    >
                      <Card.Body>
                        <Card.Title>{moment.title}</Card.Title>
                        <Card.Subtitle className="mb-3">{moment.date}</Card.Subtitle>
                        <Card.Text>{moment.description}</Card.Text>
                        <div className="moment-number">{moment.id}</div>
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </motion>
            ))}
          </div>
        </div>
        
        <div className="final-message-container">
          <div className="final-message">
            <h4>И это только начало нашей истории...</h4>
            <p>Каждый день с тобой — это новый прекрасный кадр в нашем фильме</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoStory;