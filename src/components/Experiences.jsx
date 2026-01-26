import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

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
                  transform: isHovered ? 'translateY(-2px)' : 'none'
                }}
              >
                {/* Card Header: Title & Subtitle/Price */}
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'flex-start' : 'baseline',
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
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                    opacity: 0.6,
                    marginTop: isMobile ? '0.5rem' : '0',
                    textTransform: 'uppercase'
                  }}>
                    {card.subtitle}
                  </span>
                </div>

                {/* Card Body Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '8fr 4fr', // md:col-span-8 / 4
                  gap: '2rem'
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

                  {/* Button Area */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: isMobile ? 'flex-start' : 'flex-end'
                  }}>
                    <Button
                      style={{
                        padding: '0.75rem 2rem', // slightly smaller padding for cards
                        fontSize: '0.7rem' // slightly smaller font for cards
                      }}
                    >
                      {card.cta}
                    </Button>
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
