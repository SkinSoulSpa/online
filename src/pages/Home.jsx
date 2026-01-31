import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ErrorBoundary from '../components/ErrorBoundary';
import SlowBeauty from '../components/SlowBeauty';
import OurPhilosophy from '../components/OurPhilosophy';
import Experiences from '../components/Experiences';
import Artisans from '../components/Artisans';
import ClientStories from '../components/ClientStories';

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

      // Scroll Trigger for "Gentle."
      gsap.to(".gentle-char", {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=300", // Animate over first 300px of scroll
          scrub: 1
        },
        opacity: 1,
        stagger: 0.1,
        ease: "none"
      });

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
    <div style={{ 
      position: 'relative', 
      zIndex: 1, 
      minHeight: '300vh', // Extended height to demonstrate scrolling
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // Left align content container
      paddingTop: '35vh'
    }}>
      <div 
        ref={heroRef}
        style={{
          textAlign: 'left',
          maxWidth: '800px',
          padding: '0 2rem',
          marginLeft: isMobile ? '0' : '10vw', // Removed margin on mobile
          // opacity: 0 // Removed to prevent permanent invisibility if JS fails
        }}
      >
        <h1 style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#2C332E',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '1.5rem',
          letterSpacing: '0.02em',
          opacity: 0.9,
          maxWidth: '600px' // Increased width
        }}>
          A Hidden Gem<br />
          Where Luxury is{isMobile ? <br /> : ' '}
          <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
            {"Gentle.".split('').map((char, i) => (
              <span key={i} className="gentle-char" style={{ opacity: 0, display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </span>
        </h1>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: '#5C615E',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.6,
          maxWidth: '500px', // Tighter width for elegance
          margin: '0' // Reset margin since we are left aligned
        }}>
          Experience the art of slow beauty. A transformative escape designed to nourish your skin and calm your spirit.
        </p>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <SlowBeauty />
      <OurPhilosophy />
      <Experiences />
      <Artisans />
      <ClientStories />
    </div>
  );
};

export default Home;
