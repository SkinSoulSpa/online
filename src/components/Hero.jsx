import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for preloader animation (2s + 0.5s buffer)
    
    tl.to('.reveal-text', {
      y: 0, 
      opacity: 1, 
      duration: 1.5, 
      stagger: 0.2, 
      ease: "power3.out" 
    });
  }, []);

  return (
    <header ref={containerRef} style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Background Video (Abstract Water) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundColor: '#9CAFA0' // soul-sage
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
            opacity: 0.7,
            filter: 'grayscale(20%)'
          }}
        >
          <source src={`${import.meta.env.BASE_URL}1.mp4`} type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(250, 249, 246, 0.2), transparent, #FAF9F6)'
        }}></div>
      </div>

      <div className="hero-text-container">
        <p className="reveal-text" style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          color: '#2C332E',
          opacity: 0,
          transform: 'translateY(30px)'
        }}>Orchard's Hidden Gem</p>
        
        <h1 className="reveal-text" style={{
          fontFamily: 'Montserrat, sans-serif', // Changed to Sans Serif
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: '#2C332E',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          opacity: 0,
          transform: 'translateY(30px)',
          fontWeight: 300
        }}>
          Peaceful <br /> 
          <span className="shimmer-text" style={{
            fontWeight: 300 // Same weight as Orchard's Hidden Gem
          }}>Haven</span>
        </h1>
        
      </div>
    </header>
  );
};

export default Hero;