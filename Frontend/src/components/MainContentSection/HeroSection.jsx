import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section d-flex align-items-center justify-content-center">
      <div className="hero-content text-center">
        <h1 className="display-4 mb-3">Для самой прекрасной Ани</h1>
        <p className="lead">Каждый момент с тобой — это маленькое чудо</p>
        <div className="heart-animation">❤️</div>
      </div>
    </section>
  );
};

export default HeroSection;