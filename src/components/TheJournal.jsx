import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import art1 from '../assets/art1.jpg';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TheJournal = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Animation
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current, // Trigger earlier
            start: "top 75%",
          }
        }
      );
      
      // Image Animation
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      padding: isMobile ? '6rem 1.5rem' : '10rem 2rem',
      backgroundColor: 'transparent',
      color: '#2C332E',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '0.6fr 1.4fr', // Changed to 30% / 70%
        gap: isMobile ? '3rem' : '5rem',
        alignItems: 'start'
      }}>
        
        {/* Featured Image */}
        <div ref={imageRef} style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <OrganicImagePlaceholder 
            className="journal-frame"
            style={{
              width: '100%',
              maxWidth: '300px', // Reduced width
              height: isMobile ? '300px' : '350px', // Reduced height
            }}
          >
            <img 
              src={art1} 
              alt="The Urban Shield" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }} 
            />
          </OrganicImagePlaceholder>
        </div>

        {/* Text Content */}
        <div ref={contentRef} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
          gap: '1.5rem'
        }}>
          {/* Section Title */}
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            color: '#C5B398', // Gold accent for section title
            margin: 0,
            lineHeight: 1.1,
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.05em'
          }}>
            The Journal
          </h2>

          {/* Headline */}
          <h3 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#2C332E',
            margin: 0,
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}>
            From Our Library: The Urban Shield
          </h3>

          {/* Sub-Headline */}
          <h4 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: '#5C615E',
            margin: 0,
            fontWeight: 300,
            fontStyle: 'italic'
          }}>
            Why hydration is the first line of defense against city pollution.
          </h4>

          {/* Body Copy */}
          <div style={{
            fontFamily: '"Cormorant Garamond", serif', // Updated to match other sections
            fontSize: '1.25rem', // Increased size for consistency
            lineHeight: 1.6,
            color: '#4A504D',
            marginTop: '0.5rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Living in the heart of the city takes a toll on the skin barrier. Our artisans do not just treat the surface; they protect the future of your complexion.
            </p>
            <p>
              Discover the philosophy behind our "Hydra Global" rituals and why we choose specific botanical ingredients to lock in moisture and lock out the noise of the city. This is how you extend the glow between visits.
            </p>
          </div>

          {/* Call to Action */}
          <Button 
            href="#" 
            style={{
              marginTop: '1.5rem'
            }}
          >
            Read The Journal
          </Button>
        </div>
      </div>
    </section>
  );
};


export default TheJournal;
