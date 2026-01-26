import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ClientStories = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Reviews Stagger Animation
      gsap.fromTo(".review-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      id: 1,
      quote: "It not only nurtured my skin but also nourished my soul. The treatment rooms are a sanctuary of serenity... Soft lighting, calming scents, and plush linens created an ambiance that allowed me to completely unwind.",
      attribution: "Agnes"
    },
    {
      id: 2,
      quote: "Kelly is very gentle and very good. No hard selling. I appreciate the fact that she is genuine in trying to improve my face condition.",
      attribution: "Zenn Choo"
    },
    {
      id: 3,
      quote: "I have been trusting Freya’s recommendations for many years. She is experienced and gives professional advice. The overall experience is awesome... and importantly, no pressure.",
      attribution: "Tee Wei"
    }
  ];

  const RatingDisplay = () => {
    // Random shimmer effect
    const shimmerRef = useRef(null);
    // Use a unique ref for the timeline to ensure independent control
    const timelineRef = useRef(null);

    useEffect(() => {
      const el = shimmerRef.current;
      if (!el) return;

      // Generate truly random delays for each instance
      // The key is to make sure these are calculated inside the effect instance
      const initialDelay = Math.random() * 2; // Start between 0-2s
      const repeatDelay = 2 + Math.random() * 3; // Wait 2-5s between shimmers
      
      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: repeatDelay,
        delay: initialDelay
      });

      tl.to(el, {
        backgroundPosition: '200% center',
        duration: 1.5,
        ease: 'power2.inOut',
      }).set(el, {
        backgroundPosition: '-100% center'
      });
      
      timelineRef.current = tl;

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }, []); // Empty dependency array means this runs once on mount per component instance

    return (
      <div style={{ marginTop: '1.5rem', opacity: 0.9 }}>
        <span 
          ref={shimmerRef}
          style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '1.5rem',
            color: '#BFA475',
            background: 'linear-gradient(90deg, #BFA475 0%, #FFF8E7 50%, #BFA475 100%)',
            backgroundSize: '200% auto',
            backgroundPosition: '-100% center', // Start off-screen
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          5.0
        </span>
      </div>
    );
  };

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      padding: isMobile ? '6rem 1.5rem' : '12rem 2rem',
      backgroundColor: 'transparent',
      color: '#2C332E',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: 'center',
          marginBottom: '6rem'
        }}>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: isMobile ? '2rem' : '3.5rem',
            color: '#2C332E',
            margin: '0 0 1.5rem 0',
            fontWeight: 400,
            letterSpacing: '0.05em'
          }}>
            Client Stories
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: isMobile ? '1.25rem' : '1.6rem',
            fontStyle: 'italic',
            color: '#5C615E',
            margin: 0,
            letterSpacing: '0.02em'
          }}>
            Quiet Confidence. We let our guests speak for us.
          </p>
        </div>

        {/* Reviews Grid */}
        <div ref={reviewsRef} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '4rem' : '5rem',
          alignItems: 'start' // Ensure columns start at the top
        }}>
          {reviews.map((review, index) => (
            <div key={review.id} className="review-card" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%' // Ensure full height for flex distribution
            }}>
              
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: isMobile ? '1.2rem' : '1.4rem',
                  lineHeight: 1.8,
                  color: '#2C332E',
                  margin: 0,
                  fontStyle: 'italic',
                  maxWidth: '90%'
                }}>
                  "{review.quote}"
                </p>
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: '100%',
                marginTop: '1.5rem' // Ensure consistent spacing from text
              }}>
                <RatingDisplay />

                <div style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: '#BFA475',
                  margin: '1.5rem 0',
                  opacity: 0.5
                }} />

                <h4 style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#5C615E',
                  margin: 0
                }}>
                  {review.attribution}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStories;
