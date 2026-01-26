import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const OurPhilosophy = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: isMobile ? '6rem 2rem 4rem 2rem' : '8rem 2rem',
      position: 'relative',
      zIndex: 2,
      textAlign: isMobile ? 'left' : 'center',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <div ref={contentRef}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(2rem, 3vw, 2.5rem)',
          color: '#6B5E48', // Dark Bronze
          marginBottom: '1rem',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.05em',
          textAlign: isMobile ? 'left' : 'center'
        }}>
          Our Philosophy
        </h2>

        <h3 style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          color: '#2C332E',
          marginBottom: '2rem',
          fontWeight: 400,
          lineHeight: 1.3,
          textAlign: isMobile ? 'left' : 'center'
        }}>
          Genuine Care. Zero Pressure.
        </h3>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.25rem',
          color: '#5C615E',
          lineHeight: 1.6,
          margin: isMobile ? '0' : '0 auto',
          maxWidth: isMobile ? '100%' : '650px',
          textAlign: isMobile ? 'left' : 'center' // Explicitly set text align for paragraph
        }}>
          True luxury is the freedom to relax completely. Our philosophy is simple: we are artisans, not salespeople. 
          <br /><br />
          Whether you are visiting us for the first time or the fiftieth, you will receive expert recommendations tailored to your unique skin conditions, never a sales pitch. Your peace of mind is our priority, and the quality of our touch speaks louder than words.
        </p>
      </div>
    </section>
  );
};

export default OurPhilosophy;
