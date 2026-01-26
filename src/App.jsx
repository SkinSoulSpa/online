import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MistBackground from './components/MistBackground';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import OrganicLine from './components/OrganicLine';
import SlowBeauty from './components/SlowBeauty';
import OurPhilosophy from './components/OurPhilosophy';
import Experiences from './components/Experiences';
import Artisans from './components/Artisans';
import TheJournal from './components/TheJournal';
import ClientStories from './components/ClientStories';
import { AudioProvider } from './context/AudioContext';
import './styles/main.scss';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", // When top of hero hits top of viewport
          end: "bottom top", // When bottom of hero hits top of viewport
          scrub: true
        },
        y: -100, // Move up slightly (parallax)
        opacity: 0, // Fade out
        ease: "none"
      });
    }
  }, []);

  return (
    <AudioProvider>
      <div className="app" style={{ position: 'relative' }}>
        <Preloader />
        <MistBackground />
        <OrganicLine />
        <Navigation />
        
        <main style={{ 
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
              opacity: 0,
              animation: 'fadeInUp 1.5s ease-out forwards 0.5s'
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
              maxWidth: '400px' // Constrained width to force wrapping
            }}>
              A Hidden Gem Where Luxury is Gentle.
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
          <TheJournal />
          <ClientStories />
        </main>
        
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default App;
