import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudio } from '../context/AudioContext';

gsap.registerPlugin(ScrollTrigger);

const ExperienceBlock = ({ title, text, align = 'left', delay = 0 }) => {
  const blockRef = useRef(null);
  const { playHoverSound } = useAudio();

  useEffect(() => {
    const el = blockRef.current;
    
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: delay
      }
    );
  }, [delay]);

  return (
    <div 
      ref={blockRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        padding: '6rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <h2 
        onMouseEnter={playHoverSound}
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontFamily: 'Playfair Display, serif',
          color: '#d4af37', // Gold accent
          marginBottom: '2rem',
          maxWidth: '800px',
          lineHeight: 1.1
        }}
      >
        {title}
      </h2>
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '500px',
        color: '#a0a0a0',
        lineHeight: 1.8
      }}>
        {text}
      </p>
    </div>
  );
};

const Experience = () => {
  const { playHoverSound } = useAudio();

  return (
    <div className="container" style={{ position: 'relative', zIndex: 5, paddingBottom: '10vh' }}>
      
      <div style={{ height: '10vh' }}></div>

      <ExperienceBlock 
        title="Zero Interruptions."
        text="No ringing phones, no chatter. Just a bubble of tranquillity where time feels suspended."
        align="left"
      />

      <div style={{
        width: '100%',
        height: '60vh',
        margin: '4rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: '#151515'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          opacity: 0.5
        }}></div>
        <div className="absolute-center" style={{ textAlign: 'center' }}>
          <p style={{ 
            fontFamily: 'Playfair Display', 
            fontSize: '2rem', 
            fontStyle: 'italic',
            color: '#666'
          }}>
            "Silence is the ultimate luxury."
          </p>
        </div>
      </div>

      <ExperienceBlock 
        title="Total Surrender."
        text="The experience isn't just about skin; it's about coaxing the body and mind into a state of deep, luxurious calm."
        align="right"
      />

      <div style={{ height: '10vh' }}></div>

      <ExperienceBlock 
        title="Deep Restoration."
        text="Every sense gently persuaded into harmony. Leaving you not just with better skin, but with a profound sense of restoration that lingers for days."
        align="center"
      />

      <div style={{ 
        marginTop: '8rem', 
        textAlign: 'center', 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        paddingTop: '4rem' 
      }}>
        <button 
          onMouseEnter={playHoverSound}
          style={{
            background: 'none',
            border: 'none',
            color: '#d4af37',
            fontSize: '1.5rem',
            fontFamily: 'Playfair Display',
            cursor: 'pointer',
            opacity: 0.8
          }}
        >
          Book Your Appointment →
        </button>
      </div>
    </div>
  );
};

export default Experience;
