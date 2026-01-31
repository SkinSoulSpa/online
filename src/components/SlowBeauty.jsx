import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import escapeVideo from '../assets/escape.mp4';
import escapeImage from '../assets/escape.png';
import roomImg from '../assets/experience_2.png';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';

// ScrollTrigger is registered in App.jsx
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SlowBeauty = () => {
  // Refreshed to ensure VideoComponent is removed
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    try {
      const section = sectionRef.current;
      const title = titleRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;

      if (section && title && row1 && row2) {
        // Animate Title
        gsap.fromTo(title, 
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          }
        );

        // Animate Row 1
        const row1Children = gsap.utils.toArray(row1.children);
        if (row1Children.length > 0) {
          gsap.fromTo(row1Children, 
            { opacity: 0, y: 50 },
            {
              scrollTrigger: {
                trigger: row1,
                start: "top 75%",
                toggleActions: "play none none reverse"
              },
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out"
            }
          );
        }

        // Animate Row 2
        const row2Children = gsap.utils.toArray(row2.children);
        if (row2Children.length > 0) {
          gsap.fromTo(row2Children, 
            { opacity: 0, y: 50 },
            {
              scrollTrigger: {
                trigger: row2,
                start: "top 75%",
                toggleActions: "play none none reverse"
              },
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power2.out"
            }
          );
        }
      }
    } catch (error) {
      console.warn("SlowBeauty animation error:", error);
    }
  }, []);

  const placeholderStyle = {
    width: '100%',
    height: '400px',
    // backgroundColor: '#E6E2DD', // Handled by SVG now
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5C615E',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.9rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    // border: '1px solid rgba(197, 179, 152, 0.3)', // Handled by SVG stroke
    position: 'relative',
    overflow: 'hidden'
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: isMobile ? '0' : '2rem',
    textAlign: isMobile ? 'left' : 'left', // Always left align text block content
    alignItems: 'flex-start' // Ensure alignment to start
  };

  const headingStyle = {
    fontFamily: '"Tenor Sans", sans-serif',
    fontSize: '2rem',
    color: '#2C332E',
    marginBottom: '1.5rem',
    fontWeight: 400
  };

  const paragraphStyle = {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '1.25rem',
    color: '#5C615E',
    lineHeight: 1.6,
    margin: 0
  };

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      maxWidth: '80rem',
      margin: '0 auto',
      padding: isMobile ? '8rem 2rem 4rem 2rem' : '15rem 2rem 8rem 2rem', // Adjusted padding for mobile
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box', // Ensure padding doesn't cause overflow
      overflowX: 'hidden' // Prevent internal overflow
    }}>
      <h2 ref={titleRef} style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
        textAlign: isMobile ? 'left' : 'center', // Left align on mobile
        color: '#6B5E48', // Dark Bronze
        marginBottom: isMobile ? '3rem' : '6rem',
        fontWeight: 400,
        fontStyle: 'italic',
        letterSpacing: '0.05em', 
        opacity: 1 
      }}>
        The Art of Slow Beauty
      </h2>

      {/* Row 1: The Escape */}
      <div ref={row1Ref} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', // Stack on mobile
        gap: isMobile ? '3rem' : '4rem',
        marginBottom: isMobile ? '4rem' : '8rem',
        alignItems: 'center'
      }}>
        <div style={textContainerStyle}>
          <h3 style={headingStyle}>The Escape</h3>
          <p style={paragraphStyle}>
            In a city that never stops, we invite you to pause. Conveniently nestled at Pacific Plaza, Skin Soul Spa is a hidden sanctuary amidst the rush of Orchard Road. A private haven where time feels suspended. We have designed our space not just to treat the skin, but to quiet the mind, offering a rare "urban shield" against the noise outside.
          </p>
        </div>
        <OrganicImagePlaceholder style={placeholderStyle}>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={escapeImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'block'
            }}
          >
            <source src={escapeVideo} type="video/mp4" />
            <img 
              src={escapeImage} 
              alt="Slow Beauty Ritual" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'block'
              }}
            />
          </video>
        </OrganicImagePlaceholder>
      </div>

      {/* Row 2: The Sensory Promise */}
      <div ref={row2Ref} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? '3rem' : '4rem',
        alignItems: 'center'
      }}>
        {/* We use order to alternate visual layout */}
        <OrganicImagePlaceholder style={{...placeholderStyle, order: isMobile ? 2 : 1}}>
           <img 
             src={roomImg} 
             alt="The Sensory Promise" 
             style={{
               width: '100%',
               height: '100%',
               objectFit: 'cover',
               position: 'absolute',
               top: 0,
               left: 0,
               display: 'block'
             }}
           />
        </OrganicImagePlaceholder>
        <div style={{...textContainerStyle, order: isMobile ? 1 : 2}}>
          <h3 style={headingStyle}>The Sensory Promise</h3>
          <p style={paragraphStyle}>
            We believe a facial is more than a procedure. It is a ritual of self-reverence. From the moment you step through our doors, you are enveloped in a bubble of tranquillity. Expect zero interruptions and the soothing embrace of our signature plush linens. Here, in our private treatment rooms, the only requirement is your total surrender to the ambient sound of rest.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SlowBeauty;
