import React, { useState } from "react";
import TextSequenceAnimation from "../startWindowAnim/TextSequenceAnimation";
import './styles.css'

function FloatingParticles() {
  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}
    </>
  );
}

function PageContent({ changeAnimationStatus }) {
  return (
    <div className="start-container">
      <FloatingParticles />
      <TextSequenceAnimation changeAnimationStatus={changeAnimationStatus} />
    </div>
  );
}

export default PageContent;
