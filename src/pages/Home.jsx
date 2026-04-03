import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ErrorBoundary from '../components/ErrorBoundary';
import OurPhilosophy from '../components/OurPhilosophy';
import Experiences from '../components/Experiences';
import Artisans from '../components/Artisans';
import ClientStories from '../components/ClientStories';
import SEO from '../components/SEO';
import homeHeroVideo from '../assets/1.mp4';

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

      // Scroll Parallax & Fade Out
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top+=100 top", 
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
      minHeight: '120vh', // Reduced height since we are using a distinct hero
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center align for new hero style
      paddingTop: '0' // Remove padding top to allow full bleed
    }}>
      
      {/* Background Video for Hero */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#9CAFA0'
      }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            filter: 'grayscale(20%)'
          }}
        >
          <source src={homeHeroVideo} type="video/mp4" />
        </video>
        {/* Gradient Overlay to transition into the white sections below */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(250, 249, 246, 0.3) 0%, rgba(250, 249, 246, 0.7) 70%, #FAF9F6 100%)'
        }}></div>
      </div>

      {/* Hero Content */}
      <div 
        ref={heroRef}
        style={{
          textAlign: 'center', // Center text
          maxWidth: '1000px',
          padding: '0 2rem',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-5vh' // Slight adjustment upward
        }}
      >
        <span style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#2C332E', 
          display: 'block',
          marginBottom: '1.5rem',
          opacity: 0.8
        }}>
          Orchard's Hidden Gem
        </span>
        <h1 style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: 'clamp(3rem, 7vw, 5.5rem)', // Even larger for impact
          color: '#2C332E',
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: '2rem',
          letterSpacing: '0.02em',
          opacity: 0.9,
          maxWidth: '800px',
          textShadow: '0 4px 20px rgba(250, 249, 246, 0.8)' // Better readability over video
        }}>
          Peaceful<br />
          <span style={{ whiteSpace: 'nowrap', display: 'inline-block', fontStyle: 'italic', color: '#BFA475' }}>
            Haven.
          </span>
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          color: '#2C332E',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.6,
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative'
        }}>
          Experience the art of slow beauty. A transformative escape designed to nourish your skin and calm your spirit.
        </p>
        
        {/* Scroll Indicator */}
        <div style={{
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0.8
        }}>
          <span style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#2C332E'
          }}>
            Discover
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            backgroundColor: 'rgba(44, 51, 46, 0.3)',
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
              animation: 'scrollLineVertical 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scrollLineVertical {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
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
