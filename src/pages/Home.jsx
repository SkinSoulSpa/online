import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ErrorBoundary from '../components/ErrorBoundary';
import OurPhilosophy from '../components/OurPhilosophy';
import Experiences from '../components/Experiences';
import Artisans from '../components/Artisans';
import ClientStories from '../components/ClientStories';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isLoaded = true }) => {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Force refresh ScrollTrigger to ensure layouts are correct after load
    if (isLoaded) {
      ScrollTrigger.refresh();
    }
  }, [isLoaded]);

  useEffect(() => {
    // Entrance Animation
    const ctx = gsap.context(() => {
      // Clear initial opacity from style
      gsap.set(heroRef.current, { opacity: 0, y: 30 });
      
      const tl = gsap.timeline();
      
      // If loaded, animate in. If not, wait (this effect re-runs on isLoaded change)
      if (isLoaded) {
          tl.to(heroRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.5
          });
      }

      // Scroll Parallax & Fade Out (Delayed to allow "Gentle" to appear)
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top+=100 top", // Start fading out slightly later
          end: "bottom top", 
          scrub: true
        },
        y: -100, 
        opacity: 0, 
        ease: "none",
        immediateRender: false 
      });
    }, heroRef); // Scope to heroRef

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <>
      <SEO 
        title="Soul-Deep Restoration" 
        description="A private ritual of self-reverence in a hidden Orchard gem. Experience bespoke facials, body therapies, and soul-deep restoration."
      />
      <div style={{ 
      position: 'relative', 
      zIndex: 1, 
      minHeight: '200vh', // Extended height to demonstrate scrolling
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Left align content container
      paddingTop: isMobile ? '15vh' : '22vh' // Reduced spacing from top
    }}>
      <div 
        ref={heroRef}
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          padding: '0 2rem',
          marginLeft: isMobile ? '0' : '10vw', // Removed margin on mobile
        }}
      >
        <h1 style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: 'clamp(3rem, 6vw, 4.5rem)', // Made typography larger
          color: '#2C332E',
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: '2rem',
          letterSpacing: '0.02em',
          opacity: 0.9,
          maxWidth: '800px' // Increased width for larger text
        }}>
          A Hidden Gem<br />
          Where Luxury is <span style={{ whiteSpace: 'nowrap', display: 'inline-block', fontStyle: 'italic', color: '#BFA475' }}>
            Gentle.
          </span>
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', // Larger sub-text
          color: '#5C615E',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.6,
          maxWidth: '600px', // Adjusted width
          margin: '0',
          position: 'relative'
        }}>
          Experience the art of slow beauty. A transformative escape designed to nourish your skin and calm your spirit.
        </p>
        
        {/* Scroll Indicator */}
        <div style={{
          marginTop: '4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0.7
        }}>
          <span style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#2C332E'
          }}>
            Scroll to discover
          </span>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: '#2C332E',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#BFA475',
              animation: 'scrollLine 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <OurPhilosophy />
      <Experiences />
      <Artisans />
      <ClientStories />
    </div>
    </>
  );
};

export default Home;
