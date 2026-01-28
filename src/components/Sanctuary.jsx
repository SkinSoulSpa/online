import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import ErrorBoundary from './ErrorBoundary';
import sanctuaryHero from '../assets/sanctuary-hero.jpg';
import sanctuarySilence1 from '../assets/sanctuary-silence-1.jpg';
import sanctuarySilence2 from '../assets/sanctuary-silence-2.jpg';

// Re-register in case it's mounted separately
gsap.registerPlugin(ScrollTrigger);

const Section = ({ children, style, className }) => (
  <section className={className} style={{
    padding: '6rem 2rem',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...style
  }}>
    {children}
  </section>
);

const Sanctuary = () => {
  const containerRef = useRef(null);
  const [currentSilenceImage, setCurrentSilenceImage] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSilenceImage(prev => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simple fade-in animations for sections
    const sections = containerRef.current.querySelectorAll('.fade-section');
    sections.forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="sanctuary-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px' // Space for fixed nav
    }}>
      
      {/* SECTION 1: THE HERO (The Entrance) */}
      <Section style={{ minHeight: '90vh', flexDirection: 'column', textAlign: 'center' }} className="fade-section">
        <div style={{ maxWidth: '800px', zIndex: 2 }}>
          <h1 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            color: '#2C332E',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            A World Away
          </h1>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            color: '#5C615E',
            fontStyle: 'italic',
            fontWeight: 300
          }}>
            In the heart of Orchard, a pause button exists.
          </p>
        </div>
        
        {/* Hero Image Placeholder */}
        <div style={{ 
          marginTop: '4rem', 
          width: '100%', 
          maxWidth: '1000px', 
          position: 'relative' 
        }}>
          <ErrorBoundary>
            <OrganicImagePlaceholder fitContent={true} style={{ width: '100%' }}>
              <img 
                src={sanctuaryHero} 
                alt="Sanctuary interior" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block'
                }} 
              />
            </OrganicImagePlaceholder>
          </ErrorBoundary>
        </div>
      </Section>

      {/* SECTION 2: THE ATMOSPHERE (The Physical Luxury) */}
      <Section className="fade-section">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          maxWidth: '1200px', 
          width: '100%', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          {/* Left Text */}
          <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5B398',
              display: 'block',
              marginBottom: '1rem'
            }}>
              The Atmosphere
            </span>
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#2C332E',
              marginBottom: '2rem'
            }}>
              Designed for Silence.
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#5C615E',
              marginBottom: '1.5rem'
            }}>
              True restoration requires total safety. Unlike open-plan salons, our Pacific Plaza residence is designed as a series of private treatment rooms, ensuring that your time remains yours alone.
            </p>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#5C615E'
            }}>
              We have curated every sensory detail to induce a state of "total surrender". From the ambient lighting to the plush beds that cradle you, this is a space where the city noise fades, and the only focus is your well-being.
            </p>
          </div>

          {/* Right Image */}
          <div style={{ flex: '1 1 400px' }}>
             <OrganicImagePlaceholder fitContent={true} style={{ width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateAreas: '"stack"' }}>
                <img 
                  src={sanctuarySilence1} 
                  alt="Sanctuary silence 1" 
                  style={{ 
                    gridArea: 'stack', 
                    width: '100%', 
                    height: 'auto', 
                    opacity: currentSilenceImage === 0 ? 1 : 0, 
                    transition: 'opacity 1s ease-in-out',
                    display: 'block'
                  }} 
                />
                <img 
                  src={sanctuarySilence2} 
                  alt="Sanctuary silence 2" 
                  style={{ 
                    gridArea: 'stack', 
                    width: '100%', 
                    height: 'auto', 
                    opacity: currentSilenceImage === 1 ? 1 : 0, 
                    transition: 'opacity 1s ease-in-out',
                    display: 'block'
                  }} 
                />
              </div>
            </OrganicImagePlaceholder>
          </div>
        </div>
      </Section>

      {/* SECTION 3: THE PHILOSOPHY (The Emotional Luxury) */}
      <Section className="fade-section">
         <div style={{ 
          display: 'flex', 
          flexDirection: 'row-reverse', // Image Left, Text Right visually (if wrapping, text drops)
          flexWrap: 'wrap-reverse', // Keeps image on top on mobile if we want, or remove reverse for standard stacking
          maxWidth: '1200px', 
          width: '100%', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          {/* Right Text (structurally first due to row-reverse) */}
          <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
             <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5B398',
              display: 'block',
              marginBottom: '1rem'
            }}>
              The Philosophy
            </span>
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#2C332E',
              marginBottom: '2rem'
            }}>
              Genuine Care.<br/>Zero Pressure.
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#5C615E',
              marginBottom: '1.5rem'
            }}>
              We believe that luxury is gentle. Our guests, like Zenn and Tee Wei, value our sanctuary not just for the results but for the respect we offer.
            </p>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#5C615E'
            }}>
              Here, there is no "hard selling". There is only honest advice, intuitive touch, and a commitment to improving your condition. We protect your peace as fiercely as we protect your skin barrier.
            </p>
          </div>

          {/* Left Image */}
           <div style={{ flex: '1 1 400px', height: '500px' }}>
             <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#DCD6CF',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#8C8C8C',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.1em'
              }}>
                CONSULTATION / CARE
              </div>
            </OrganicImagePlaceholder>
          </div>
        </div>
      </Section>

      {/* SECTION 4: THE LOCATION (The Hidden Gem) */}
      <Section className="fade-section" style={{ flexDirection: 'column', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', marginBottom: '4rem' }}>
           <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5B398',
              display: 'block',
              marginBottom: '1rem'
            }}>
              The Location
            </span>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#2C332E',
            marginBottom: '1.5rem'
          }}>
            The Hidden Gem.
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.25rem',
            lineHeight: 1.8,
            color: '#5C615E'
          }}>
            Conveniently nestled at Pacific Plaza on Scotts Road, we are the secret escape for the city's most discerning professionals. Step off the busy street and into a space where time feels suspended.
          </p>
        </div>

        {/* Map/Location Placeholder */}
        <div style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          height: '400px',
          position: 'relative'
        }}>
           <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
             <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#EAEAEA',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#8C8C8C',
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.1em'
              }}>
                MAP / EXTERIOR SHOT
              </div>
           </OrganicImagePlaceholder>
        </div>
      </Section>

    </div>
  );
};

export default Sanctuary;
