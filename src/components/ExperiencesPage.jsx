import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import CheckoutModal from './CheckoutModal';
import Button from './Button';
import consultationImage from '../assets/consultation_1.jpg';
import testImage from '../assets/test.png';

gsap.registerPlugin(ScrollTrigger);

import botanicalImage from '../assets/botanical.png';
import luminousImage from '../assets/luminous.png';
import experience1 from '../assets/experience_1.png';
import lushImage from '../assets/lush.png';

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

const ExperiencesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [hoveredId, setHoveredId] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('generic');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Simple OS detection for Payment Method
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
      setPaymentMethod('apple');
    } else if (/android/i.test(userAgent)) {
      setPaymentMethod('google');
    } else {
      setPaymentMethod('generic');
    }

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAcquire = (e, product) => {
    e.stopPropagation();
    setCheckoutProduct(product);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations for sections
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

      // Sticky Sub-Navigation Logic - Floating Pill at Bottom
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "bottom top", 
        end: "max", 
        onEnter: () => {
          gsap.to(navRef.current, {
            y: 100, 
            opacity: 0, 
            duration: 0.2,
            onComplete: () => {
              gsap.set(navRef.current, { 
                position: 'fixed', 
                top: 'auto', 
                bottom: '30px', 
                left: '50%', 
                xPercent: -50,
                width: isMobile ? '90vw' : 'auto',
                padding: isMobile ? '0.8rem 1rem' : '0.8rem 2rem',
                borderRadius: '50px',
                backgroundColor: 'rgba(250, 249, 246, 0.9)', 
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                zIndex: 90,
                border: '1px solid rgba(197, 179, 152, 0.3)',
                overflowX: isMobile ? 'auto' : 'visible',
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                justifyContent: isMobile ? 'flex-start' : 'center'
              });
              gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power3.out"
              });
            }
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              gsap.set(navRef.current, { 
                position: 'absolute', 
                top: 'auto', 
                bottom: '2rem', 
                left: '50%', 
                xPercent: -50,
                width: isMobile ? '90vw' : 'auto',
                padding: isMobile ? '0.8rem 1rem' : '0.8rem 2rem',
                borderRadius: '50px',
                backgroundColor: 'rgba(250, 249, 246, 0.9)', 
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid rgba(197, 179, 152, 0.3)',
                zIndex: 90,
                overflowX: isMobile ? 'auto' : 'visible',
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                justifyContent: isMobile ? 'flex-start' : 'center'
              });
              gsap.to(navRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4
              });
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id) => {
    if (isMobile) {
      if (hoveredId === id) {
        navigate('/reservations');
      } else {
        setHoveredId(id);
      }
    } else {
      navigate('/reservations');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for the sticky nav (approx 60-80px)
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const lastKeyRef = useRef(null);

  useEffect(() => {
    // Prevent re-running logic for the same history entry to avoid loops
    if (location.key === lastKeyRef.current) return;
    lastKeyRef.current = location.key;

    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(location.state.scrollTo);
      }, 100);
    } else if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div ref={containerRef} className="experiences-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px', // Space for main fixed nav
      position: 'relative'
    }}>
      
      {/* SECTION 1: THE HERO (The Mood) */}
      <div ref={heroRef} style={{ 
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
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            color: '#2C332E',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            The Art of Transformation
          </h1>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#C5B398', // Gold accent
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '2rem'
          }}>
            Where science meets the soul.
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#5C615E',
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Your skin is unique, and so is our approach. We do not believe in standard protocols. Every journey begins with a conversation. A deep-dive consultation to understand your skin’s history and your soul’s needs.
          </p>
        </div>

        {/* Hero Visual - Replaced with Consultation Image */}
        <div className="fade-section" style={{ 
          marginTop: '4rem', 
          width: '100%', 
          maxWidth: '1000px', 
          height: 'auto',
          position: 'relative' 
        }}>
          <OrganicImagePlaceholder fitContent={true} style={{ width: '100%' }}>
            <img 
              src={consultationImage} 
              alt="Consultation" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block',
                objectFit: 'cover'
              }} 
            />
          </OrganicImagePlaceholder>
        </div>

        {/* Sticky Anchor Bar (initially absolute at bottom of hero) */}
        <div ref={navRef} style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '90vw' : 'auto', // Responsive width
          padding: isMobile ? '0.8rem 1rem' : '0.8rem 2rem', // Less padding on mobile
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center', // Align start for scrolling
          gap: isMobile ? '1.5rem' : '2rem',
          zIndex: 90,
          flexWrap: isMobile ? 'nowrap' : 'wrap', // Prevent wrapping on mobile
          overflowX: isMobile ? 'auto' : 'visible', // Enable horizontal scroll
          // Hide scrollbar styles
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch', // Smooth scroll on iOS
          // Pill Styles
          backgroundColor: 'rgba(250, 249, 246, 0.9)', 
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(197, 179, 152, 0.3)',
          borderRadius: '50px'
        }}>
          {/* Hide scrollbar for Chrome/Safari/Opera */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {['The Signature', 'The Intensive', 'The Enhancements'].map((item, index) => {
            const id = item.toLowerCase().replace(' ', '-'); // the-signature, etc.
            // But user wants ids: signature, intensive, enhancements probably?
            // Let's map properly.
            const targetId = item.split(' ')[1].toLowerCase(); // signature, intensive, enhancements
            
            return (
              <button 
                key={index}
                onClick={() => scrollToSection(targetId)}
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#2C332E',
                  background: 'linear-gradient(to right, #2C332E 0%, #2C332E 40%, #C5B398 50%, #2C332E 60%, #2C332E 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  whiteSpace: 'nowrap',
                  transition: 'background-position 0.5s ease',
                  fontWeight: 500
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundPosition = '200% center';
                  e.target.style.transition = 'background-position 1.5s ease';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundPosition = '0% center';
                  e.target.style.transition = 'background-position 0.5s ease';
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: THE JOURNEYS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Category 1: THE SIGNATURE JOURNEYS */}
        <Section id="signature" className="fade-section" style={{ flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '3rem',
              color: '#2C332E',
              marginBottom: '1.5rem'
            }}>
              The Signature Journeys
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              color: '#5C615E',
              lineHeight: 1.8
            }}>
              Our definitive 90-minute immersions. A fusion of deep-tissue massage and botanical actives designed to nurture the skin and quiet the mind.
            </p>
          </div>
          
          {/* Treatment List - Updated to Card Layout */}
          <div style={{ 
            width: '100%', 
            maxWidth: '1024px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem'
          }}>
            {[
              /*
              {
                id: 'clarifying',
                title: "Detox Facial",
                duration: "60 minutes",
                price: "$158",
                narrative: "Designed for the city dweller, this ritual acts as a reset button for the skin barrier. We move beyond simple extraction to deep purification, targeting the invisible weight of \"urban grey\", UV damage, blue light, and pollution. By clearing congestion without aggression, we revitalise the skin's health while respecting its delicate equilibrium.",
                sensation: "Light, breathable, and relieving.",
                result: "A complexion that feels unburdened and profoundly clean.",
                image: experience1
              },
              */
              {
                id: 'soul-deep',
                title: "Hydrating Facial",
                duration: "60 minutes",
                price: "$198",
                narrative: "A gentle immersion for thirsty skin. Utilising the botanical power of our Hydra Global collection, this journey goes deeper than surface moisture. It is a process of \"locking in\" vitality, soothing tightness, and repairing the protective barrier. As our guest Agnes noted, this experience \"not only nurtures the skin but nourishes the soul\".",
                sensation: "A rhythmic, cooling flow that mimics the movement of water, leaving you \"enveloped in an atmosphere of tranquillity\".",
                result: "Plump, rested skin that holds its glow long after you leave our sanctuary.",
                image: lushImage
              },
              {
                id: 'luminous',
                title: "Youthful Radiance Facial",
                duration: "90 minutes",
                price: "$258",
                narrative: "For skin that feels dulled by the fatigue of modern life. This brightening journey is a masterclass in light reflection. We utilise a luxurious masking protocol to oxygenate the tissues and banish the shadows of uneven tone and dark spots. It is not just about correcting; it is about energising.",
                sensation: "Invigorating yet deeply relaxing.",
                result: "The definitive \"Post-Treatment Glow.\" Your skin will look translucent and radiant, as if lit from within.",
                image: luminousImage
              },
              {
                id: 'timeless',
                title: "Youthful Lifting Facial",
                duration: "100 minutes",
                price: "$338",
                narrative: "Our premier anti-aging immersion for mature skin. This gravity-defying ritual targets structural integrity and elasticity. We combine deep-tissue massage with advanced, non-invasive lifting technology to sculpt the contours of the face.",
                sensation: "A \"warming embrace\" of luxurious actives followed by firming precision. The touch is so gentle and professional that, like our guest Carina, you may \"fall asleep under care\".",
                result: "A firmer, smoother profile with a visible lift that feels entirely natural, restoring the \"youthful appearance\" without the downtime.",
                image: testImage
              }
            ].map((item, index) => {
               const isHovered = hoveredId === item.id;
               
               return (
                <div 
                  key={index} 
                  className="experience-card-item"
                  onMouseEnter={() => !isMobile && setHoveredId(item.id)}
                  onMouseLeave={() => !isMobile && setHoveredId(null)}
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1rem', 
                    border: isHovered ? '1px solid rgba(191, 164, 117, 0.3)' : '1px solid transparent',
                    boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none',
                    transition: 'all 0.5s ease',
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
                      backgroundImage: `url(${item.image})`,
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
                        Reserve
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div style={{
                    padding: isMobile ? '2rem' : '3rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      flexWrap: 'wrap',
                      marginBottom: '1rem',
                      gap: '1rem'
                    }}>
                      <h3 style={{
                        fontFamily: '"Tenor Sans", sans-serif',
                        fontSize: '1.75rem',
                        color: isHovered ? '#BFA475' : '#2C332E',
                        transition: 'color 0.3s ease',
                        margin: 0
                      }}>
                        {item.title}
                      </h3>
                      <span style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        backgroundColor: '#9CAFA0', // Misty Sage
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(156, 175, 160, 0.2)'
                      }}>
                        {item.duration} | {item.price}
                      </span>
                    </div>

                    {/* Narrative */}
                    <div style={{ marginBottom: '2rem' }}>
                      <p style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1.125rem',
                        lineHeight: 1.6,
                        color: '#5C615E',
                        marginBottom: 0
                      }}>
                        {item.narrative}
                      </p>
                    </div>

                    {/* Sensation & Result Grid */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                      gap: '1.5rem',
                      marginTop: 'auto', // Push to bottom if space allows
                      borderTop: '1px solid rgba(197, 179, 152, 0.2)',
                      paddingTop: '1.5rem'
                    }}>
                      <div>
                        <span style={{ 
                          fontFamily: 'Montserrat, sans-serif', 
                          fontSize: '0.7rem', 
                          letterSpacing: '0.15em', 
                          textTransform: 'uppercase', 
                          color: '#C5B398',
                          display: 'block',
                          marginBottom: '0.5rem'
                        }}>
                          The Sensation
                        </span>
                        <p style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1rem',
                          lineHeight: 1.5,
                          color: '#5C615E',
                          fontStyle: 'italic',
                          marginBottom: 0
                        }}>
                          {item.sensation}
                        </p>
                      </div>
                      <div>
                        <span style={{ 
                          fontFamily: 'Montserrat, sans-serif', 
                          fontSize: '0.7rem', 
                          letterSpacing: '0.15em', 
                          textTransform: 'uppercase', 
                          color: '#C5B398',
                          display: 'block',
                          marginBottom: '0.5rem'
                        }}>
                          The Result
                        </span>
                        <p style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1rem',
                          lineHeight: 1.5,
                          color: '#5C615E',
                          fontStyle: 'italic',
                          marginBottom: 0
                        }}>
                          {item.result}
                        </p>
                      </div>
                    </div>
                    
                    {/* Impulse Buy Button */}
                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <Button 
                        onClick={(e) => handleAcquire(e, item)}
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {paymentMethod === 'apple' ? 'Pay with  Pay' : 
                         paymentMethod === 'google' ? 'Pay with G Pay' : 
                         'Purchase Experience'}
                      </Button>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontStyle: 'italic',
                          color: '#BFA475',
                          fontSize: '1.1rem',
                          lineHeight: 1,
                          transform: 'translateY(1px)' // Fine-tune vertical alignment
                        }}>or</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(item.id);
                          }}
                          style={{
                            background: 'linear-gradient(to right, #A89675 0%, #A89675 50%, #A89675 60%, #FFFFFF 75%, #A89675 90%, #A89675 100%)',
                          backgroundSize: '200% auto',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          border: 'none',
                          padding: '0',
                          fontFamily: '"Tenor Sans", sans-serif',
                          fontSize: '0.8rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'background-position 0.6s ease',
                          fontWeight: 400,
                          backgroundPosition: '0% center'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundPosition = '-100% center';
                          e.target.style.transition = 'background-position 0.6s ease';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundPosition = '0% center';
                          e.target.style.transition = 'background-position 0.6s ease';
                        }}
                        >
                          Reserve without Purchasing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
               );
            })}
          </div>
        </Section>

        {/* Category 2: THE INTENSIVE JOURNEYS */}
        <Section id="intensive" className="fade-section" style={{ flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem' }}>

            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '3rem',
              color: '#2C332E',
              marginBottom: '1.5rem'
            }}>
              The Intensive Journeys
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              color: '#5C615E',
              lineHeight: 1.8
            }}>
              Precision-led protocols for visible transformation. We utilise advanced hydration technologies and potent actives to firm, brighten, and restore the skin barrier.
            </p>
          </div>
          <div style={{ 
            width: '100%', 
            maxWidth: '1200px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                title: "Exo Glow Treatment Facial",
                duration: "90 minutes",
                price: "$398",
                narrative: "Our most advanced biological immersion. This journey operates at the cellular level, combining the precision of mesotherapy with the regenerative power of exosomes. We move beyond surface hydration to fundamental restoration, delivering potent messengers that signal your skin to repair, firm, and renew itself.",
                sensation: "A meticulous, refreshing infusion. While this is a high-performance clinical protocol, our artisans ensure the delivery is gentle, soothing, and deeply relaxing.",
                result: "The ultimate \"Glass Skin\" finish. Fine lines are smoothed, elasticity is reclaimed, and the complexion radiates with a luminosity that looks almost ethereal."
              },
              {
                title: "Youthful Lifting Lami Peel Facial",
                duration: "100 minutes",
                price: "$338",
                narrative: "A next-generation resurfacing ritual designed for the delicate. Unlike traditional peels that strip the barrier, this \"Lami-Peel\" technology lifts and hydrates simultaneously. It is specifically formulated for thin or sensitive skin that usually cannot tolerate active exfoliation, offering a safe path to profound renewal.",
                sensation: "Cool, comforting, and surprisingly soothing. There is no \"burn\" here, only the feeling of a fresh start.",
                result: "A porcelain-smooth texture with improved elasticity. Your skin emerges not red or raw, but polished and undeniably radiant."
              },
              {
                title: "Western Oriental Facial",
                duration: "90 minutes",
                price: "$298",
                narrative: "Where ancient wisdom meets modern comfort. This journey is a masterclass in structural flow, fusing the rhythmic precision of Eastern Bojin techniques with the aromatherapy of Western essential oils. We focus on the meridian lines to lift facial muscles and stimulate lymphatic drainage, releasing the stagnation and bloating caused by city life.",
                sensation: "Deep, rhythmic, and intensely grounding. You will feel the tension physically leaving your jaw and brow as our artisans work to \"unblock\" your energy flow.",
                result: "A visibly sculpted profile and a profound sense of lightness. The face looks lifted, depuffed, and flushed with fresh vitality."
              },
              {
                title: "Age Defying Facial",
                duration: "90 minutes",
                price: "$338",
                narrative: "A structural intervention for timeless skin. We utilise an advanced RF (Radio Frequency) modality to deliver controlled thermal energy deep into the dermis. This warmth acts as a wake-up call to your collagen and elastin factories, tightening the architectural fibres of the skin to restore definition.",
                sensation: "A \"warming embrace\" that permeates deep within the tissue, balanced by the cooling touch of our finishing rituals.",
                result: "A sharper contour and firmer texture. This is the non-invasive answer to skin laxity, restoring the \"youthful bounce\" of the complexion."
              },
              {
                title: "Anti-OXYdant Facial",
                duration: "100 minutes",
                price: "$338",
                narrative: "A rescue ritual for skin suffocated by the city. We utilise a potent oxygenation protocol to breathe life back into the cellular structure. This journey detoxifies the pores from \"urban grey\" pollution and UV stress while flooding the barrier with a cocktail of essential vitamins and pH-balancing nutrients.",
                sensation: "A cool, airy mist that feels like a deep breath of fresh mountain air. It is the ultimate relief for skin that feels tight or overheated.",
                result: "A complexion that is not just clean, but alive. The skin emerges shielded, hydrated, and glowing with a \"natural luminosity\" that looks as if you have spent a week in nature, far from the city noise."
              },
              {
                title: "Derm Rejuvenating Facial",
                duration: "75 minutes",
                price: "$298",
                narrative: "Harnessing the power of light to reverse the visible passage of time. We employ advanced SHR (Super Hair Removal) technology adapted for skin rejuvenation to gently target the visual noise of the complexion, blemishes, pigmentation, and laxity. It is a process of clearing the canvas to reveal the \"firmer, smoother\" skin beneath.",
                sensation: "Brief, rhythmic flashes of warmth balanced immediately by the cooling touch of our artisans. It is effective yet entirely comfortable.",
                result: "Porcelain clarity. The tone is unified, and the texture is refined, restoring the \"youthful bounce\" and clarity that defines healthy skin."
              },
              {
                title: "Collagen Revival Facial",
                duration: "90 minutes",
                price: "$298",
                narrative: "A structural reset for the skin’s foundation. Using the precision of the Dermia Solution modality, this journey focuses on refining the surface texture. It is designed to erase the history of the skin, softening acne scars, reducing wrinkle depth, and minimising pores to improve absorption capabilities.",
                sensation: "Micro-stimulation that feels active and purposeful. You can feel the technology working to \"reknit\" the collagen matrix, yet the experience remains soothing within our sanctuary environment.",
                result: "A velvet finish. The surface of the skin is smoothed and polished, creating a flawless base that looks revitalised and significantly firmer."
              }
            ].map((item, index) => {
               // Unique hover state for intensive cards could be added here if needed
               return (
                <div 
                  key={index} 
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1rem', 
                    padding: '2.5rem',
                    border: '1px solid rgba(197, 179, 152, 0.2)', // Subtle gold border
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(197, 179, 152, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(197, 179, 152, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(197, 179, 152, 0.2)';
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(197, 179, 152, 0.2)'
                  }}>
                    <h3 style={{
                      fontFamily: '"Tenor Sans", sans-serif',
                      fontSize: '1.5rem',
                      color: '#2C332E',
                      margin: 0,
                      maxWidth: '70%'
                    }}>
                      {item.title}
                    </h3>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'block',
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#C5B398',
                        letterSpacing: '0.05em'
                      }}>
                        {item.price}
                      </span>
                      <span style={{
                        display: 'block',
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '0.65rem',
                        color: '#9CAFA0',
                        marginTop: '0.25rem'
                      }}>
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>
                    {/* Narrative */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontSize: '0.65rem', 
                        letterSpacing: '0.15em', 
                        textTransform: 'uppercase', 
                        color: '#C5B398',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>
                        The Narrative
                      </span>
                      <p style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#5C615E',
                        marginBottom: 0
                      }}>
                        {item.narrative}
                      </p>
                    </div>

                    {/* Sensation */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <span style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontSize: '0.65rem', 
                        letterSpacing: '0.15em', 
                        textTransform: 'uppercase', 
                        color: '#C5B398',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>
                        The Sensation
                      </span>
                      <p style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#5C615E',
                        marginBottom: 0,
                        fontStyle: 'italic'
                      }}>
                        {item.sensation}
                      </p>
                    </div>

                    {/* Result */}
                    <div>
                      <span style={{ 
                        fontFamily: 'Montserrat, sans-serif', 
                        fontSize: '0.65rem', 
                        letterSpacing: '0.15em', 
                        textTransform: 'uppercase', 
                        color: '#C5B398',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>
                        The Result
                      </span>
                      <p style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#5C615E',
                        marginBottom: 0
                      }}>
                        {item.result}
                      </p>
                    </div>
                  </div>

                  {/* Impulse Buy Button */}
                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <Button 
                        onClick={(e) => handleAcquire(e, item)}
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {paymentMethod === 'apple' ? 'Pay with  Pay' : 
                         paymentMethod === 'google' ? 'Pay with G Pay' : 
                         'Purchase Experience'}
                      </Button>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontStyle: 'italic',
                          color: '#BFA475',
                          fontSize: '1.1rem',
                          lineHeight: 1,
                          transform: 'translateY(1px)'
                        }}>or</span>
                        <button 
                          onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(item.id);
                        }}
                        style={{
                          background: 'linear-gradient(to right, #A89675 0%, #A89675 50%, #A89675 60%, #FFFFFF 75%, #A89675 90%, #A89675 100%)',
                          backgroundSize: '200% auto',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          border: 'none',
                          padding: '0',
                          fontFamily: '"Tenor Sans", sans-serif',
                          fontSize: '0.8rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'background-position 0.6s ease',
                          fontWeight: 400,
                          backgroundPosition: '0% center'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundPosition = '-100% center';
                          e.target.style.transition = 'background-position 0.6s ease';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundPosition = '0% center';
                          e.target.style.transition = 'background-position 0.6s ease';
                        }}
                      >
                        Reserve without Purchasing
                      </button>
                    </div>
                  </div>
                </div>
               );
            })}
          </div>
        </Section>

        {/* Category 3: THE ENHANCEMENTS */}
        <Section id="enhancements" className="fade-section" style={{ flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '3rem',
              color: '#2C332E',
              marginBottom: '1.5rem'
            }}>
              The Enhancements
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              color: '#5C615E',
              lineHeight: 1.8
            }}>
              The finishing touches. Targeted care for the delicate areas, eyes, neck, and décolletage, that tell the true story of your skin.
            </p>
          </div>
          <div style={{ 
            width: '100%', 
            maxWidth: '1200px',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                title: "Anti-OXYdant Inhalation",
                duration: "10 minutes",
                price: "$38",
                narrative: "A moment of pure clarity for the city-weary. In this restorative pause, we infuse the body with a concentrated stream of pure oxygen. It acts as an internal reset, awakening tired cells and flushing out the mental fog of the day.",
                sensation: "A cool, airy lightness that expands the lungs and calms the mind.",
                result: "A re-energised spirit and a complexion that looks instantly awakened, bright, clear, and full of life."
              },
              {
                title: "Guasha Eye Rejuvenation Treatment",
                duration: "20 minutes",
                price: "$108",
                narrative: "For eyes weighed down by screen fatigue and stress. We utilise the ancient rhythmic art of Guasha to gently glide over the delicate contours of the orbital bone. This ritual encourages the flow of stagnant energy, releasing deep-set tension and reducing inflammation without a single invasive touch.",
                sensation: "Cool stone meets warm skin in a rhythmic dance that feels deeply hypnotic.",
                result: "A visible \"lifting\" of the gaze. Puffiness is drained, and the eyes appear wider, rested, and visibly brighter."
              },
              {
                title: "Hair Removal (Upper Lips)",
                duration: "10 minutes",
                price: "$38",
                narrative: "A refining ritual for the most delicate area of the face. Using advanced light technology, we gently polish the skin surface to reduce shadow and texture. It serves a dual purpose: discouraging future growth while simultaneously brightening the skin tone for a flawless finish.",
                sensation: "A quick, warm flash of light, balanced instantly by a cooling touch.",
                result: "A smooth, porcelain canvas that reflects light perfectly, free from shadow."
              },
              {
                title: "Hair Removal (Underarm)",
                duration: "20 minutes",
                price: "$88",
                narrative: "Confidence begins with texture. This advanced smoothing ritual uses SHR light energy to target the root of the hair while actively treating the skin itself. Unlike traditional methods that darken or damage, this technology works to harmonise the skin tone and refine the surface.",
                sensation: "Efficient and comfortable, designed to respect sensitive skin.",
                result: "Underarms that feel velvety smooth to the touch and look visibly fairer, allowing you to move with total freedom."
              },
              {
                title: "LED Therapy",
                duration: "15 minutes",
                price: "$38",
                narrative: "A restorative bath of therapeutic light. We utilise specific wavelengths of LED energy to interact with the skin at a cellular level. Whether your goal is to quell the inflammation of acne or stimulate collagen production for sun-damaged tissue, this ritual works silently to repair the barrier from within.",
                sensation: "A warm, bright embrace that feels like basking in restorative sunlight, without the damage.",
                result: "A calmer canvas. Redness is pacified, and the skin tone emerges unified and visibly brighter."
              },
              {
                title: "Eye Care Treatment",
                duration: "15 minutes",
                price: "$68",
                narrative: "A manual therapy designed to unburden the eyes. In an age of screen fatigue, this ritual focuses on the delicate orbital muscles that carry the weight of the day. Through a series of precise, rhythmic massage techniques, we stimulate micro-circulation to flush out fluids and relieve deep-set tension.",
                sensation: "A profound sense of \"lifting.\" You will feel the heaviness behind the eyes physically dissipate.",
                result: "Eyes that look rested and alert. Dark circles are softened, and the gaze appears wider and more open."
              },
              {
                title: "Hydra Intensive Treatment",
                duration: "20 minutes",
                price: "$88",
                narrative: "The deep clean, reimagined. Ideal for congested or city-stressed skin, this ritual replaces aggressive extraction with the gentle power of hydro-dermabrasion. We use a continuous flow of water and active serums to flush impurities from the pores, finishing with a mist of pure Hyaluronic Acid (HA) to flood the fresh skin with hydration.",
                sensation: "Cool, rushing water that feels like a fresh stream clearing away debris.",
                result: "Glass-like clarity. The texture is instantly smoothed, and the pores are refined without the redness of traditional extraction."
              },
              {
                title: "Anti-OXYdant (Eye/Neck)",
                duration: "20 minutes",
                price: "$108",
                narrative: "A targeted infusion of life for the most fragile areas. The skin of the eye and neck is often the first to show signs of \"cellular suffocation.\" We direct a concentrated stream of pure oxygen and nutrients to these zones, accelerating cell turnover and breathing vitality back into the tissue.",
                sensation: "A targeted, cool breeze that feels instantly tightening and refreshing.",
                result: "Fine lines are plumped from within, and the shadowed areas of the eye and neck look visibly energised."
              },
              {
                title: "Derm Rejuvenating",
                duration: "20 minutes",
                price: "$128",
                narrative: "Harnessing light to erase visual noise. This advanced therapy uses broad-spectrum light to seek out and correct imperfections in the skin tone, from sun spots to diffuse redness. It acts as a harmonising agent, tightening the collagen fibres while unifying the complexion.",
                sensation: "Brief, rhythmic flashes of warmth signal the activation of the skin’s healing response.",
                result: "A porcelain finish. The skin looks tighter, clearer, and undeniably more youthful."
              },
              {
                title: "Age Defying (Eye/Neck)",
                duration: "20 minutes",
                price: "$128",
                narrative: "Re-knitting the support matrix. We employ Radio Frequency (RF) energy to deliver controlled thermal warmth deep into the dermis of the neck and eye contours. This heat wakes up the fibroblasts, commanding them to produce new collagen and elastin to firm the architectural lines of the face.",
                sensation: "A deep, permeating warmth that feels like a \"hot stone\" massage from the inside out.",
                result: "Immediate contraction and long-term firming. The crepey skin of the neck and eyes feels denser and more resilient."
              },
              {
                title: "Age Control Pro",
                duration: "20 minutes",
                price: "$128",
                narrative: "Feeding the skin where it matters most. Using advanced electromagnetic pulse technology, this ritual temporarily opens the skin’s cellular gates. This allows us to push potent active ingredients far deeper than manual application ever could, effectively \"filling\" the skin with nutrition without a single needle.",
                sensation: "A gentle, rhythmic tingle that indicates the active ingredients are travelling deep into the dermis.",
                result: "Profound saturation. The skin looks plump, hydrated, and volumised from the inside."
              }
            ].map((item, index) => {
              return (
                <div 
                  key={index} 
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1rem', 
                    padding: '2rem',
                    border: '1px solid rgba(197, 179, 152, 0.2)',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(197, 179, 152, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(197, 179, 152, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.02)';
                    e.currentTarget.style.borderColor = 'rgba(197, 179, 152, 0.2)';
                  }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(197, 179, 152, 0.2)'
                  }}>
                    <h3 style={{
                      fontFamily: '"Tenor Sans", sans-serif',
                      fontSize: '1.25rem',
                      color: '#2C332E',
                      margin: 0,
                      maxWidth: '75%'
                    }}>
                      {item.title}
                    </h3>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'block',
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#C5B398',
                        letterSpacing: '0.05em'
                      }}>
                        {item.price}
                      </span>
                      <span style={{
                        display: 'block',
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '0.65rem',
                        color: '#9CAFA0',
                        marginTop: '0.2rem'
                      }}>
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>
                    {/* Narrative */}
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        color: '#5C615E',
                        marginBottom: 0
                      }}>
                        {item.narrative}
                      </p>
                    </div>

                    {/* Sensation & Result - Compact */}
                    {(item.sensation || item.result) && (
                      <div style={{ 
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px dashed rgba(197, 179, 152, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}>
                        {item.sensation && (
                          <div>
                            <span style={{ 
                              fontFamily: 'Montserrat, sans-serif', 
                              fontSize: '0.65rem', 
                              letterSpacing: '0.1em', 
                              textTransform: 'uppercase', 
                              color: '#C5B398',
                              display: 'block',
                              marginBottom: '0.25rem'
                            }}>
                              The Sensation
                            </span>
                            <p style={{
                              fontFamily: '"Cormorant Garamond", serif',
                              fontSize: '0.95rem',
                              lineHeight: 1.4,
                              color: '#5C615E',
                              fontStyle: 'italic',
                              marginBottom: 0
                            }}>
                              {item.sensation}
                            </p>
                          </div>
                        )}
                        {item.result && (
                          <div>
                            <span style={{ 
                              fontFamily: 'Montserrat, sans-serif', 
                              fontSize: '0.65rem', 
                              letterSpacing: '0.1em', 
                              textTransform: 'uppercase', 
                              color: '#C5B398',
                              display: 'block',
                              marginBottom: '0.25rem'
                            }}>
                              The Result
                            </span>
                            <p style={{
                              fontFamily: '"Cormorant Garamond", serif',
                              fontSize: '0.95rem',
                              lineHeight: 1.4,
                              color: '#5C615E',
                              marginBottom: 0
                            }}>
                              {item.result}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Impulse Buy Button */}
                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button 
                      onClick={(e) => handleAcquire(e, item)}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {paymentMethod === 'apple' ? 'Pay with  Pay' : 
                       paymentMethod === 'google' ? 'Pay with G Pay' : 
                       'Purchase Experience'}
                    </Button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontStyle: 'italic',
                        color: '#BFA475',
                        fontSize: '1.1rem',
                        lineHeight: 1,
                        transform: 'translateY(1px)'
                      }}>or</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(item.id);
                        }}
                        style={{
                          background: 'linear-gradient(to right, #A89675 0%, #A89675 50%, #A89675 60%, #FFFFFF 75%, #A89675 90%, #A89675 100%)',
                          backgroundSize: '200% auto',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          border: 'none',
                          padding: '0',
                          fontFamily: '"Tenor Sans", sans-serif',
                          fontSize: '0.8rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'background-position 0.6s ease',
                          fontWeight: 400,
                          backgroundPosition: '0% center'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundPosition = '-100% center';
                          e.target.style.transition = 'background-position 0.6s ease';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundPosition = '0% center';
                          e.target.style.transition = 'background-position 0.6s ease';
                        }}
                      >
                        Reserve without Purchasing
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

      </div>

      {/* SECTION 3: THE CLOSING */}
      <Section className="fade-section" style={{ flexDirection: 'column', textAlign: 'center', minHeight: '50vh', backgroundColor: '#F5F3EF' }}>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#2C332E',
            marginBottom: '1.5rem'
          }}>
            Extend The Glow.
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.4rem',
            color: '#5C615E',
            lineHeight: 1.8
          }}>
            Every journey concludes with a personalised home-care prescription from our Maria Galland collection, ensuring the transformation lasts long after you leave our sanctuary.
          </p>
        </div>
      </Section>

      {/* CHECKOUT MODAL */}
      <CheckoutModal 
        isOpen={!!checkoutProduct} 
        onClose={() => setCheckoutProduct(null)} 
        product={checkoutProduct}
        paymentMethod={paymentMethod}
      />
    </div>
  );
};

export default ExperiencesPage;
