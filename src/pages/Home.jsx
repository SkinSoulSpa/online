import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ErrorBoundary from '../components/ErrorBoundary';
import OurPhilosophy from '../components/OurPhilosophy';
import Experiences from '../components/Experiences';
import Artisans from '../components/Artisans';
import ClientStories from '../components/ClientStories';
import SEO from '../components/SEO';
import heroBg from '../assets/luminous.png';

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
      minHeight: '150vh', // Reduced height since we're using a full hero image
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '-80px', // Counteract the padding-top: 80px on the <main> container so hero starts at true top
    }}>
      {/* Full Width Hero Background Container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh + 80px)', // Account for the negative margin
        zIndex: -1,
        backgroundColor: '#FAF9F6', // Light brand base color
      }}>
        {/* Actual Image with adjusted opacity */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Creates a nice parallax effect
          opacity: 0.7, // Higher opacity to let the luminous image shine on light background
        }} />
        
        {/* Gradient overlay for text readability and smooth transition */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(250,249,246,0.2) 0%, rgba(250,249,246,0.85) 100%)'
        }} />
      </div>

      <div 
        ref={heroRef}
        style={{
          textAlign: 'left',
          maxWidth: '1000px',
          padding: '0 2rem',
          marginLeft: isMobile ? '0' : '10vw',
          height: 'calc(100vh + 80px)', // Take full height of viewport
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center content vertically
          paddingTop: '80px' // Add padding back so content isn't under header
        }}
      >
        <h1 style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)', // Toned down size
          color: '#2C332E', // Dark color for light background
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '1.5rem',
          letterSpacing: '0.02em',
          opacity: 0.95,
          maxWidth: '600px',
        }}>
          A Hidden Gem<br />
          Where Luxury is <span style={{ whiteSpace: 'nowrap', display: 'inline-block', color: '#BFA475' }}>
            Gentle.
          </span>
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', // Toned down size
          color: '#5A615C', // Medium dark tone for light background
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.6,
          maxWidth: '500px',
          margin: '0',
          position: 'relative',
        }}>
          Experience the art of slow beauty. A transformative escape designed to nourish your skin and calm your spirit.
        </p>
        
        {/* Scroll Indicator */}
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0.8
        }}>
          <span style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#5A615C' // Darker color for light background
          }}>
            Scroll to discover
          </span>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(44, 51, 46, 0.2)', // Darker line track
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#2C332E', // Darker animated line
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

      {/* Solid background for content below hero */}
      <div style={{ width: '100%', backgroundColor: '#FAF9F6', position: 'relative', zIndex: 2 }}>
        <OurPhilosophy />
        <Experiences />
        <Artisans />
        <ClientStories />
      </div>
    </div>
    </>
  );
};

export default Home;
