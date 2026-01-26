import React, { useRef, useEffect } from 'react';
import MistBackground from './components/MistBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Sanctuary from './components/Sanctuary';
import Rituals from './components/Rituals';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { AudioProvider } from './context/AudioContext';
import './styles/main.scss';

// Styled Components (inline for now)
const Section = ({ title, subtitle, children, height = "100vh", align = "center" }) => (
  <div className="generic-section" style={{
    minHeight: height,
    alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
    textAlign: align
  }}>
    {title && (
      <h2 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontFamily: 'Montserrat, sans-serif',
        color: '#2C332E',
        marginBottom: '1.5rem',
        maxWidth: '800px',
        lineHeight: 1.1
      }}>{title}</h2>
    )}
    {subtitle && (
      <p style={{
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        fontSize: '0.625rem',
        fontWeight: 500,
        color: '#C5B398',
        marginBottom: '2rem'
      }}>{subtitle}</p>
    )}
    {children && (
      <div style={{
        maxWidth: '600px',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        lineHeight: 2,
        color: '#2C332E',
        opacity: 0.8
      }}>
        {children}
      </div>
    )}
  </div>
);

const Quote = ({ text }) => (
  <div className="quote-section">
    <p style={{
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
      fontStyle: 'italic',
      color: '#2C332E',
      maxWidth: '900px',
      margin: '0 auto',
      lineHeight: 1.4
    }}>
      "{text}"
    </p>
  </div>
);

function AppV01() {
  return (
    <AudioProvider>
      <div className="app">
        <Preloader />
        <MistBackground />
        <Navigation />
        
        <main style={{ position: 'relative', zIndex: 1 }}>
          
          <Hero />

          <Quote text="Expect zero interruptions, no ringing phones, no chatter, just a bubble of tranquillity that makes time feel suspended." />
          
          <Sanctuary />

           {/* The Experiences */}
           <Rituals />

          {/* The Artisans */}
          <div id="artisans">
    <Section title="The Artisans" subtitle="Genuine Care" align="center">
      <div style={{
        width: '100%',
        height: '400px',
        background: '#F5F5F0',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #E0E0E0'
      }}>
        <span style={{ color: '#9CAFA0', fontStyle: 'italic', fontFamily: 'Montserrat, sans-serif' }}>[Image: Therapist Portrait / Hands at Work]</span>
      </div>
      <p>
        Our therapists are artisans of touch, offering genuine care without pressure. 
        Experience a hidden gem for discerning clients seeking gentle, soul-nourishing facials 
        without aggressive tech or hard sells.
      </p>
      <button style={{
          marginTop: '2rem',
          backgroundColor: '#C5B398',
          color: '#FAF9F6',
          padding: '1rem 2.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, background-color 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.backgroundColor = '#E6D8A0';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.backgroundColor = '#C5B398';
      }}
      >
        Reserve Appointment
      </button>
    </Section>
  </div>

</main>
        
        <Footer />
      </div>
    </AudioProvider>
  );
}

export default AppV01;
