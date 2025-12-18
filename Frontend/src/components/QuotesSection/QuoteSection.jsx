import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, spring } from 'framer-motion';
import './QuoteSection.css';

const QuotesSection = () => {
  const quotes = [
    {
      text: "Ты — мое самое большое счастье, мое вдохновение и моя самая красивая история.",
      author: "Для тебя"
    },
    {
      text: "Любовь — это когда каждая мелочь напоминает о тебе, а каждый день хочется начинать с тобой.",
      author: "Из наших разговоров"
    },
    {
      text: "Там, где есть ты, там мой дом, мое спокойствие и мое счастье.",
      author: "Из наших встреч"
    },
    {
      text: "С тобой даже обычный день превращается в маленькое приключение.",
      author: "Из нашей жизни"
    },
    {
      text: "Ты — та самая причина, по которой я верю в чудеса.",
      author: "Для тебя"
    },
    {
      text: "Каждая улыбка твоя — это солнце, которое освещает мои самые темные дни.",
      author: "Из моих мыслей"
    },
    {
      text: "Я счастлив просто от того, что ты существуешь в этом мире, а тем более в моей жизни.",
      author: "Для тебя"
    }
  ];

  const [visibleQuotes, setVisibleQuotes] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const quoteElements = document.querySelectorAll('.quote-item');
      
      quoteElements.forEach((el, index) => {
        if (el.offsetTop < scrollPosition - 100) {
          if (!visibleQuotes.includes(index)) {
            setVisibleQuotes(prev => [...prev, index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleQuotes]);

  return (
    <section className="quotes-section">
      <Container>
        <h2 className="quotes-title">Цитаты для тебя</h2>
        
        <Row className="justify-content-center">
          <Col lg={8}>
            {quotes.map((quote, index) => (
              <motion
                key={index}
                defaultStyle={{ opacity: 0, y: 50 }}
                style={{
                  opacity: spring(visibleQuotes.includes(index) ? 1 : 0),
                  y: spring(visibleQuotes.includes(index) ? 0 : 50)
                }}
              >
                {style => (
                  <div 
                    className="quote-item"
                    style={{
                      opacity: style.opacity,
                      transform: `translateY(${style.y}px)`
                    }}
                  >
                    <div className="quote-card">
                      <p className="quote-text">"{quote.text}"</p>
                      <p className="quote-author">— {quote.author}</p>
                    </div>
                  </div>
                )}
              </motion>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuotesSection;