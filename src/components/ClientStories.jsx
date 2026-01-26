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

  const StarRating = () => (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', opacity: 0.8 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.4 9.6H22.4L16 14.4L18.4 22.4L12 17.6L5.6 22.4L8 14.4L1.6 9.6H9.6L12 2Z" fill="#BFA475" stroke="#BFA475" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      padding: isMobile ? '6rem 1.5rem' : '12rem 2rem', // More breathing room
      backgroundColor: 'transparent', // Transparent to show organic curve
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
        }}>
          {reviews.map((review, index) => (
            <div key={review.id} className="review-card" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: (!isMobile && index === 1) ? '4rem' : '0' // Stagger middle card for poetic flow
            }}>
              <StarRating />

              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                lineHeight: 1.8,
                color: '#2C332E',
                marginBottom: '2.5rem',
                flex: 1,
                fontStyle: 'italic',
                maxWidth: '90%'
              }}>
                "{review.quote}"
              </p>

              <div style={{
                width: '40px',
                height: '1px',
                backgroundColor: '#BFA475',
                marginBottom: '1.5rem',
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStories;
