import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import testImage from '../assets/test.png';

gsap.registerPlugin(ScrollTrigger);

const Section = ({ children, style, className, id }) => (
  <section id={id} className={className} style={{
    padding: '6rem 2rem',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...style
  }}>
    {children}
  </section>
);

const TheArtisans = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [activePortrait, setActivePortrait] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      const sections = document.querySelectorAll('.fade-section');
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
    });
    return () => ctx.revert();
  }, []);

  const artisans = [
    {
      id: 'freya',
      name: "Freya",
      role: "Senior Artisan",
      vibe: "Experienced & Trusted",
      quote: "\"I have been trusting her recommendations for many years.\"",
      author: "Tee Wei"
    },
    {
      id: 'kelly',
      name: "Kelly",
      role: "Senior Artisan",
      vibe: "Gentle & Precise",
      quote: "\"She is very gentle... Kelly’s explanation was also rather clear and concise.\"",
      author: "Zenn Choo & Shi Jia Tan"
    },
    {
      id: 'shelbee',
      name: "Shelbee",
      role: "Artisan",
      vibe: "Attentive & Soothing",
      quote: "\"Very attentive to details... I was enveloped in an atmosphere of tranquillity.\"",
      author: "Agnes & Arielle Dray"
    },
    {
      id: 'karen',
      name: "Karen",
      role: "Artisan",
      vibe: "Deeply Relaxing",
      quote: "\"My therapist Karen is very professional... I fell asleep under her care!\"",
      author: "Carina Tan"
    }
  ];

  return (
    <div className="artisans-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      position: 'relative',
      backgroundColor: '#FAF9F6' // Soul Ivory
    }}>
      
      {/* SECTION 1: THE HERO */}
      <div style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div className="fade-section" style={{ maxWidth: '800px', zIndex: 2 }}>
          <h1 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#2C332E',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            Hands You Can Trust.
          </h1>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#C5B398', // Gold accent
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '3rem'
          }}>
            Technical mastery, intuitive touch, and total respect for your silence.
          </h2>
        </div>

        {/* Hero Visual - Video Placeholder */}
        <div className="fade-section" style={{ 
          marginTop: '2rem', 
          width: '100%', 
          maxWidth: '1000px', 
          height: '50vh',
          position: 'relative' 
        }}>
          <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#E6E2DD',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#8C8C8C',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.1em',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <span>HERO VIDEO PLACEHOLDER</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(Close up of hands working)</span>
            </div>
          </OrganicImagePlaceholder>
        </div>
      </div>

      {/* SECTION 2: THE PHILOSOPHY */}
      <Section className="fade-section" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px' }}>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C5B398',
            display: 'block',
            marginBottom: '1rem'
          }}>
            Our Philosophy
          </span>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#2C332E',
            marginBottom: '2rem'
          }}>
            Advisors, Not Sellers.
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: '3rem', 
            alignItems: 'center',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              color: '#5C615E',
              lineHeight: 1.8,
              flex: 1
            }}>
              We know that the modern spa industry often feels like a sales floor. At Skin Soul Spa, we have removed that pressure entirely.
              <br /><br />
              Our artisans are compensated for their care, not their conversion rates. Whether you are seeing Kelly for clarity or Freya for restoration, you will receive honest, professional advice, never a sales pitch. We believe, as our guest Zenn noted, in being "genuine in trying to improve your face condition".
            </p>
            {/* Visual Balance */}
            <div style={{ flex: 1, width: '100%', height: '300px' }}>
              <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
                 <div style={{ width: '100%', height: '100%', backgroundColor: '#DCD6CF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8C8C8C' }}>
                    PHILOSOPHY VISUAL
                 </div>
              </OrganicImagePlaceholder>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: THE PORTRAITS (The Artisans) */}
      <Section className="fade-section" style={{ flexDirection: 'column', backgroundColor: '#F5F3EF' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#2C332E',
            marginBottom: '1rem'
          }}>
            The Artisans
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.2rem',
            color: '#5C615E',
            fontStyle: 'italic'
          }}>
            Defined by those who know them best.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: '2rem', 
          maxWidth: '1200px', 
          width: '100%' 
        }}>
          {artisans.map((artisan, index) => {
            const isActive = activePortrait === artisan.id;
            
            return (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  transform: isActive ? 'translateY(-5px)' : 'none',
                  boxShadow: isActive ? '0 20px 40px rgba(197, 179, 152, 0.2)' : '0 5px 15px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={() => setActivePortrait(artisan.id)}
                onMouseLeave={() => setActivePortrait(null)}
              >
                {/* Image Area - Taking up top half or side */}
                <div style={{ 
                  height: '250px', 
                  position: 'relative',
                  backgroundColor: '#E6E2DD',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${testImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.8s ease',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }} />
                  {/* Overlay Gradient */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, width: '100%', height: '50%',
                    background: 'linear-gradient(to top, rgba(255,255,255,1), transparent)'
                  }} />
                </div>

                {/* Content Area */}
                <div style={{ 
                  padding: '2rem', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  position: 'relative',
                  marginTop: '-2rem' // Overlap slightly
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{
                      fontFamily: '"Tenor Sans", sans-serif',
                      fontSize: '2rem',
                      color: '#2C332E',
                      margin: 0
                    }}>
                      {artisan.name}
                    </h3>
                    <span style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#C5B398'
                    }}>
                      {artisan.role} | {artisan.vibe}
                    </span>
                  </div>

                  {/* The Quote - The Hero Content */}
                  <blockquote style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.25rem',
                    lineHeight: 1.4,
                    color: '#5C615E',
                    fontStyle: 'italic',
                    margin: '0 0 1rem 0',
                    borderLeft: '2px solid #C5B398',
                    paddingLeft: '1rem'
                  }}>
                    {artisan.quote}
                  </blockquote>
                  
                  <cite style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.7rem',
                    fontStyle: 'normal',
                    color: '#9CAFA0',
                    display: 'block',
                    textAlign: 'right'
                  }}>
                    — {artisan.author}
                  </cite>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SECTION 4: THE TEAM PLEDGE */}
      <Section className="fade-section" style={{ flexDirection: 'column', textAlign: 'center', minHeight: '50vh', backgroundColor: '#2C332E', color: '#FAF9F6' }}>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#C5B398',
            marginBottom: '1.5rem'
          }}>
            Our Promise of Privacy.
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.4rem',
            color: 'rgba(250, 249, 246, 0.9)',
            lineHeight: 1.8,
            marginBottom: '3rem'
          }}>
            "What is spoken in the room stays in the room. We treat your skin journey with the same confidentiality as a medical professional."
          </p>
          
          <button className="btn-shimmer" style={{
             color: '#FAF9F6',
             borderColor: '#C5B398',
             fontSize: '0.9rem',
             padding: '1rem 3rem'
          }}>
            Reserve Time With An Artisan
          </button>
        </div>
      </Section>

    </div>
  );
};

export default TheArtisans;
 
 
