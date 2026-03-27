import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from './SEO';

import MistBackground from './MistBackground';

gsap.registerPlugin(ScrollTrigger);

const Promotions = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top when mounting
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Fade in headers
      gsap.fromTo('.promo-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power2.out" }
      );

      // Fade in cards
      gsap.fromTo('.promo-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.3, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.promo-cards-container',
            start: "top 80%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '100vh', paddingTop: '10rem', paddingBottom: '8rem' }}>
      <MistBackground />
      <SEO 
        title="Promotions | Skin Soul Spa"
        description="Discover our exclusive Spa Memberships and Packages. Enjoy luxurious facial treatments and rewarding spa credits."
      />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p className="promo-header" style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '1.2rem',
            color: '#A89675',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '1rem'
          }}>
            Skin Soul Spa
          </p>
          <h1 className="promo-header" style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#2C332E',
            marginBottom: '1.5rem',
            fontWeight: 'normal',
            letterSpacing: '0.05em'
          }}>
            Spa Membership
          </h1>
          <div className="promo-header" style={{
            width: '60px',
            height: '1px',
            background: '#C5B398',
            margin: '0 auto 2rem auto'
          }}></div>
          <p className="promo-header" style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '1.1rem',
            color: '#555',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.8
          }}>
            Elevate your wellness journey with our exclusive spa packages, thoughtfully designed to offer you more value on our signature treatments.
          </p>
        </div>

        {/* Packages Container */}
        <div className="promo-cards-container" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'stretch'
        }}>
          
          {/* $1,500 Package */}
          <div className="promo-card" style={{
            background: '#FFFFFF',
            padding: '4rem 3rem',
            borderRadius: '2px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(197, 179, 152, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, rgba(197,179,152,0.4) 0%, rgba(168,150,117,0.8) 100%)'
            }}></div>
            
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '2.2rem',
              color: '#2C332E',
              marginBottom: '1.5rem',
              fontWeight: 'normal'
            }}>
              $1,500 <br/>
              <span style={{ fontSize: '1.6rem', color: '#A89675' }}>Spa Package</span>
            </h2>
            
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '1rem',
              color: '#4A4A4A',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              flexGrow: 1
            }}>
              Receive <strong style={{ color: '#2C332E', fontWeight: 600 }}>$1,650 worth of Spa Credits</strong><br/>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>(redeemable for à la carte facial treatments)</span>
            </p>
            
            <Link to="/reservations" style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: 'transparent',
              color: '#2C332E',
              fontFamily: '"Tenor Sans", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.85rem',
              textDecoration: 'none',
              border: '1px solid #2C332E',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2C332E';
              e.target.style.color = '#FAF9F6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#2C332E';
            }}
            >
              Enquire Now
            </Link>
          </div>

          {/* $3,000 Package */}
          <div className="promo-card" style={{
            background: '#FFFFFF',
            padding: '4rem 3rem',
            borderRadius: '2px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            border: '1px solid rgba(197, 179, 152, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, rgba(168,150,117,0.8) 0%, rgba(44,51,46,0.8) 100%)'
            }}></div>
            
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '2.2rem',
              color: '#2C332E',
              marginBottom: '1.5rem',
              fontWeight: 'normal'
            }}>
              $3,000 <br/>
              <span style={{ fontSize: '1.6rem', color: '#A89675' }}>Spa Package</span>
            </h2>
            
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '1rem',
              color: '#4A4A4A',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              flexGrow: 1
            }}>
              Receive <strong style={{ color: '#2C332E', fontWeight: 600 }}>$3,500 worth of Spa Credits</strong><br/>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>(redeemable for à la carte facial treatments)</span>
            </p>
            
            <Link to="/reservations" style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: '#2C332E',
              color: '#FAF9F6',
              fontFamily: '"Tenor Sans", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.85rem',
              textDecoration: 'none',
              border: '1px solid #2C332E',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#2C332E';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#2C332E';
              e.target.style.color = '#FAF9F6';
            }}
            >
              Enquire Now
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Promotions;