import React, { useContext, useState } from "react";
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

function PageContent() {
    const [isAnimationDone, setIsAnimationDone] = useState(false);

    return (
        <div className="container">
            <FloatingParticles />
            {isAnimationDone ? (
                <div className="Content">
                    <h1>Добро пожаловать! 🎉</h1>
                    <p>Анимация завершена. Теперь вы можете наслаждаться основным контентом.</p>
                    <button 
                        className="replay-button"
                        onClick={() => setIsAnimationDone(false)}
                    >
                        Запустить анимацию снова
                    </button>
                </div>
            ) : (
                <TextSequenceAnimation changeAnimationStatus={setIsAnimationDone} />
            )}
        </div>
    );
}
export default PageContent;