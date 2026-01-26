import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import testImage from '../assets/test.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Experiences = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    // GSAP context for entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(".experience-card-item", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      id: 'restoration',
      title: 'Hydration & Calm',
      subtitle: 'The Urban Shield',
      body: 'For the city-stressed skin. A deep dive into moisture that soothes, repairs, and restores the skin barrier. We utilise soothing botanicals and advanced hydration technologies to quiet inflammation and quench dehydration.',
      cta: 'Explore The Journeys',
      type: 'restoration',
      // Images removed from card layout to match 'Curated Rituals' style, but keeping data just in case
      image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=2000&q=80'
    },
    {
      id: 'transformation',
      title: 'Lift & Radiance',
      subtitle: 'The Ageless Glow',
      body: 'Powerful anti-aging protocols designed to firm, brighten, and turn back the clock without aggression. Witness a visible lift and a renewed vitality that feels entirely natural, leaving you glowing with health.',
      cta: 'Explore The Journeys',
      type: 'transformation',
      image: 'https://images.unsplash.com/photo-1509650393247-975c0249c5ee?auto=format&fit=crop&w=2000&q=80'
    },
    {
      id: 'signature',
      title: 'The Soul-Deep Journey',
      subtitle: 'The Definitive Experience',
      body: 'Our signature 90-minute immersion. A customised fusion of deep-tissue massage and advanced skincare. This is the ultimate act of self-reverence, a ritual that nurtures the skin and nourishes the soul, creating a glow that lingers for days.',
      cta: 'Explore The Journeys',
      type: 'signature',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80'
    }
  ];

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      padding: isMobile ? '4rem 1.5rem' : '8rem 2rem',
      backgroundColor: 'transparent', // Transparent to reveal OrganicLine
      color: '#2C332E',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1024px', // max-w-5xl
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '5rem',
          textAlign: isMobile ? 'center' : 'left'
        }}>
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
            Experiences
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.25rem',
            color: '#5C615E',
            lineHeight: 1.6,
            maxWidth: '650px',
            margin: isMobile ? '1.5rem auto 0' : '1.5rem 0 0',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            We do not believe in one-size-fits-all. Every treatment is a bespoke dialogue between your skin and our artisans, designed to restore not just your complexion, but your calm.
          </p>
        </div>

        {/* Cards Stack */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem' // space-y-4
        }}>
          {cards.map((card, index) => {
            const isHovered = hoveredId === card.id;
            
            return (
              <div 
                key={card.id} 
                className="experience-card-item"
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: isMobile ? '2rem' : '3rem', // p-8 md:p-12
                  borderRadius: '1rem', // rounded-2xl
                  border: isHovered ? '1px solid rgba(191, 164, 117, 0.3)' : '1px solid transparent', // hover:border-soul-gold/30
                  boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none', // hover:shadow-xl
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateY(-2px)' : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '30%',
                  backgroundImage: `url(${testImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200' preserveAspectRatio='none'%3E%3Cpath d='M100 0 L100 200 L40 200 Q0 150 40 100 T40 0 Z' fill='black'/%3E%3C/svg%3E")`,
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200' preserveAspectRatio='none'%3E%3Cpath d='M100 0 L100 200 L40 200 Q0 150 40 100 T40 0 Z' fill='black'/%3E%3C/svg%3E")`,
                  maskSize: '100% 200%',
                  WebkitMaskSize: '100% 200%',
                  maskRepeat: 'repeat-y',
                  WebkitMaskRepeat: 'repeat-y',
                  pointerEvents: 'none',
                  animation: 'waveFlow 8s linear infinite'
                }}>
                   <style>
                    {`
                      @keyframes waveFlow {
                        0% { -webkit-mask-position: 0 0; mask-position: 0 0; }
                        100% { -webkit-mask-position: 0 100%; mask-position: 0 100%; }
                      }
                    `}
                  </style>
                </div>
                
                {/* Hover Overlay Text */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '30%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}>
                  <style>
                    {`
                      @keyframes goldShimmer {
                        0% { background-position: 0% 50%; }
                        100% { background-position: 200% 50%; }
                      }
                    `}
                  </style>
                  <span style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    backgroundImage: 'linear-gradient(90deg, #BFA475 0%, #FFF8E7 50%, #BFA475 100%)',
                    backgroundSize: '200% auto',
                    color: '#BFA475',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'goldShimmer 3s linear infinite',
                    fontWeight: 600,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}>
                    Explore The Journeys
                  </span>
                </div>

                {/* Card Header: Title & Subtitle/Price */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{
                    fontFamily: '"Tenor Sans", sans-serif',
                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                    color: isHovered ? '#BFA475' : '#2C332E',
                    transition: 'color 0.3s ease',
                    margin: 0,
                    fontWeight: 400
                  }}>
                    {card.title}
                  </h3>
                  <span style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    backgroundColor: '#BFA475',
                    padding: '0.35rem 1rem',
                    marginTop: '0.75rem',
                    position: 'relative',
                    display: 'inline-block',
                    boxShadow: '0 2px 4px rgba(191, 164, 117, 0.2)'
                  }}>
                    {card.subtitle}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: isMobile ? '100%' : '65%'
                }}>
                  {/* Text Content */}
                  <div>
                    <p style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.125rem',
                      lineHeight: 1.6,
                      opacity: 1,
                      marginBottom: '1.5rem',
                      color: '#5C615E'
                    }}>
                      {card.body}
                    </p>
                    
                    {/* List Items (Optional, simulating structure) */}
                    <div style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: '0.7rem', // text-xs
                      letterSpacing: '0.1em',
                      opacity: 0.6,
                      textTransform: 'uppercase',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      color: '#2C332E'
                    }}>
                      <span>+ {index === 0 ? 'Deep Hydration' : index === 1 ? 'Firming Protocol' : 'Full Body & Face'}</span>
                      <span>+ {index === 0 ? 'Barrier Repair' : index === 1 ? 'Collagen Boost' : '90 Minutes'}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
