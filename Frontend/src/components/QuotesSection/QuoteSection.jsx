import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import './QuoteSection.css';

const QuotesSection = ({quotes}) => {

  const quoteRefs = useRef([]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className="quotes-section">
      <Container>
        <motion.h2 
          className="quotes-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Цитаты для тебя
        </motion.h2>
        
        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {quotes.map((quote, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="quote-item"
                >
                  <div className="quote-card">
                  <p className="quote-text">"{quote.text}"</p>
                  <p className="quote-author">— {quote.author}</p>
                  {quote.date && (
                    <small className="quote-date text-muted d-block mt-2">
                      {quote.date}
                    </small>
                  )}
                </div>
                </motion.div>
              ))}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuotesSection;