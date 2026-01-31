import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import testImage from '../assets/test.png';
import experience1 from '../assets/experience_1.png';
import experience2 from '../assets/experience_2.png';
import experience3 from '../assets/experience_3.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Experiences = () => {
  const navigate = useNavigate();
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

  const handleCardClick = (type) => {
    navigate('/experiences', { state: { scrollTo: type } });
  };

  const cards = [
    {
      id: 'signature',
      title: 'The Signature Journeys',
      subtitle: 'Holistic Restoration',
      body: 'Offer transformative skincare journeys tailored for urban life, resetting your skin with profound clarity, deep hydration, luminous brightness, or natural lift. Each luxurious experience blends advanced actives, expert techniques, and sensorial calm to deliver visible, lasting radiance, leaving you unburdened, plump, glowing, or sculpted.',
      cta: 'Explore The Journeys',
      type: 'signature',
      image: experience1,
      features: [
        'Urban-targeted rituals',
        'Gentle deep results',
        'Luxurious multi-sensory',
        'Visible lasting glow',
        'Personalised indulgence'
      ]
    },
    {
      id: 'intensive',
      title: 'The Intensive Journeys',
      subtitle: 'Clinical Precision',
      body: 'Deliver high-performance skincare transformations for demanding urban skin, harnessing cutting-edge technologies and regenerative protocols to achieve glass-like radiance, porcelain smoothness, sculpted contours, firm definition, shielded vitality, ageless clarity, and flawless dermal architecture. Each meticulously crafted ritual combines precision actives, advanced modalities, and soothing expertise to provide profound renewal, visible firmness, and luminous results without compromise or downtime.',
      cta: 'Explore The Journeys',
      type: 'intensive',
      image: experience2,
      features: [
        'Advanced regenerative tech',
        'Gentle intensive renewal',
        'Sculpted lifted contours',
        'Shielded luminous glow',
        'Flawless texture reset'
      ]
    },
    {
      id: 'enhancements',
      title: 'The Enhancements',
      subtitle: 'Curated Add-Ons',
      body: 'Provide quick, targeted boosts to elevate your skin and spirit in minutes, delivering instant oxygen revival, brighter eyes, flawless clarity, velvety smoothness, calmed inflammation, rested gaze, glass-like pores, energised contours, unified tone, firmed architecture, and deep nutrient saturation. These precise add-ons harness oxygen, light, massage, and advanced delivery for visible refreshment, luminosity, and resilience with zero downtime.',
      cta: 'Explore The Journeys',
      type: 'enhancements',
      image: experience3,
      features: [
        'Quick targeted boosts',
        'Instant visible refresh',
        'Advanced light tech',
        'Gentle deep delivery',
        'Radiant rested results'
      ]
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
                onClick={() => handleCardClick(card.type)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1rem', // rounded-2xl
                  border: isHovered ? '1px solid rgba(191, 164, 117, 0.3)' : '1px solid transparent', // hover:border-soul-gold/30
                  boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none', // hover:shadow-xl
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  transform: isHovered ? 'translateY(-2px)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'stretch'
                }}
              >
                {/* Image Section (Mobile: Top, Desktop: Right) */}
                <div style={{
                  position: 'relative',
                  width: isMobile ? '100%' : '30%',
                  height: isMobile ? '250px' : 'auto',
                  minHeight: isMobile ? 'auto' : '100%',
                  order: isMobile ? -1 : 1,
                  flexShrink: 0
                }}>
                   <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maskImage: isMobile 
                      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L200 0 L200 85 Q150 100 100 85 T0 85 Z' fill='black'/%3E%3C/svg%3E")`
                      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200' preserveAspectRatio='none'%3E%3Cpath d='M100 0 L100 200 L25 200 Q0 175 25 150 T25 100 Q0 75 25 50 T25 0 Z' fill='black'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: isMobile 
                      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L200 0 L200 85 Q150 100 100 85 T0 85 Z' fill='black'/%3E%3C/svg%3E")`
                      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200' preserveAspectRatio='none'%3E%3Cpath d='M100 0 L100 200 L25 200 Q0 175 25 150 T25 100 Q0 75 25 50 T25 0 Z' fill='black'/%3E%3C/svg%3E")`,
                    maskSize: isMobile ? '200% 100%' : '100% 200%',
                    WebkitMaskSize: isMobile ? '200% 100%' : '100% 200%',
                    maskRepeat: isMobile ? 'repeat-x' : 'repeat-y',
                    WebkitMaskRepeat: isMobile ? 'repeat-x' : 'repeat-y',
                    pointerEvents: 'none',
                    animation: isMobile ? 'waveFlowHorizontal 30s linear infinite' : 'waveFlow 12s linear infinite'
                  }}>
                    <style>
                      {`
                        @keyframes waveFlow {
                          0% { -webkit-mask-position: 0 0; mask-position: 0 0; }
                          100% { -webkit-mask-position: 0 100%; mask-position: 0 100%; }
                        }
                        @keyframes waveFlowHorizontal {
                          0% { -webkit-mask-position: 0 0; mask-position: 0 0; }
                          100% { -webkit-mask-position: -200% 0; mask-position: -200% 0; }
                        }
                      `}
                    </style>
                  </div>

                  {/* Hover Overlay Text */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
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
                </div>

                {/* Content Section */}
                <div style={{
                  padding: isMobile ? '2rem' : '3rem', // p-8 md:p-12
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
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
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      backgroundColor: '#9CAFA0', // Misty Sage from brand guide
                      padding: '0.25rem 0.75rem',
                      marginTop: '0.75rem',
                      position: 'relative',
                      display: 'inline-block',
                      boxShadow: '0 2px 4px rgba(156, 175, 160, 0.2)',
                      borderRadius: '4px' // Soft edges
                    }}>
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '100%' // Full width inside flex item
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
                      
                      {/* List Items - Tags Design */}
                      {card.features && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          marginTop: '1.5rem'
                        }}>
                          {card.features.map((feature, i) => (
                            <span key={i} style={{
                              fontFamily: '"Montserrat", sans-serif',
                              fontSize: '0.65rem',
                              letterSpacing: '0.05em',
                              textTransform: 'uppercase',
                              color: '#5C615E',
                              backgroundColor: 'rgba(156, 175, 160, 0.15)', // Very light sage
                              padding: '0.4rem 0.8rem',
                              borderRadius: '50px', // Pill shape
                              fontWeight: 500,
                              whiteSpace: 'nowrap'
                            }}>
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
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
