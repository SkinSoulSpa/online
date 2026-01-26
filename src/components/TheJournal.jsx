import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TheJournal = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      padding: isMobile ? '6rem 1.5rem' : '10rem 2rem',
      backgroundColor: 'transparent',
      color: '#2C332E',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    }}>
      <div ref={contentRef} style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem'
      }}>
        {/* Section Title */}
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          color: '#6B5E48', // Dark Bronze
          margin: 0,
          lineHeight: 1.1,
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.05em'
        }}>
          The Journal
        </h2>

        {/* Headline */}
        <h3 style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: '#2C332E',
          margin: 0,
          fontWeight: 400,
          letterSpacing: '0.02em',
          marginTop: '1rem'
        }}>
          From Our Library: The Urban Shield
        </h3>

        {/* Sub-Headline */}
        <h4 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
          color: '#5C615E',
          margin: 0,
          fontWeight: 300,
          fontStyle: 'italic'
        }}>
          Why hydration is the first line of defense against city pollution.
        </h4>

        {/* Body Copy */}
        <div style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: '1rem',
          lineHeight: 1.8,
          color: '#4A504D',
          maxWidth: '600px',
          marginTop: '1rem'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Living in the heart of the city takes a toll on the skin barrier. Our artisans do not just treat the surface; they protect the future of your complexion.
          </p>
          <p>
            Discover the philosophy behind our "Hydra Global" rituals and why we choose specific botanical ingredients to lock in moisture and lock out the noise of the city. This is how you extend the glow between visits.
          </p>
        </div>

        {/* Call to Action */}
        <Button 
          href="#" 
          style={{
            marginTop: '2rem'
          }}
        >
          Read The Journal
        </Button>
      </div>
    </section>
  );
};

export default TheJournal;
