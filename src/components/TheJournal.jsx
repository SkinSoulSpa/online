import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import Button from './Button';
import CheckoutModal from './CheckoutModal';
import journalHero from '../assets/journal.jpg';
import creamImage from '../assets/260_HYDRA_GLOBAL_Cream.jpg';
import serumImage from '../assets/240_HYDRA_GLOBAL_Serum.jpg';
import botanicalImage from '../assets/botanical.png';
import giftCardImage from '../assets/skin_soul_gift_card.png';
import milleCreamImage from '../assets/1000_MILLE_The Cream.jpg';
import sanctuaryHero from '../assets/sanctuary-hero.jpg';
import luminousImage from '../assets/luminous.png';
import SEO from './SEO';

gsap.registerPlugin(ScrollTrigger);

const JournalSection = ({ children, className, style, id }) => (
  <section id={id} className={className} style={{
    padding: '6rem 2rem',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...style
  }}>
    {children}
  </section>
);

const TheJournal = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('generic'); // 'apple', 'google', 'generic'
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const purchaseBarRef = useRef(null);

  const handleAcquire = (product) => {
    setCheckoutProduct(product);
  };

  const handleReserve = (experienceName) => {
    navigate('/reservations', { 
      state: { experience: experienceName } 
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    // Simple OS detection
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      const sections = document.querySelectorAll('.journal-fade');
      sections.forEach(section => {
        gsap.fromTo(section, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Sticky Purchase Bar Logic (Mobile Only)
      if (window.innerWidth < 768 && purchaseBarRef.current && heroRef.current) {
         ScrollTrigger.create({
          trigger: heroRef.current,
          start: "bottom top", 
          end: "max", 
          onEnter: () => {
            gsap.to(purchaseBarRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power3.out"
            });
          },
          onLeaveBack: () => {
             gsap.to(purchaseBarRef.current, {
              y: 100,
              opacity: 0,
              duration: 0.3
            });
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO 
        title="The Journal" 
        description="Notes on slow beauty, self-care rituals, and our curated collection of Maria Galland products."
        image={journalHero}
      />
      <div className="journal-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px'
      }}>

      {/* HERO SECTION: The Library of Skin (Refined 1 Column) */}
      <div ref={heroRef} style={{ 
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '4rem 2rem 4rem',
        position: 'relative',
        gap: '3.5rem'
      }}>
        
        {/* Text Content - Top */}
        <div className="journal-fade" style={{ zIndex: 2, textAlign: 'center', maxWidth: '700px' }}>
          <span style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9CAFA0', 
            display: 'block',
            marginBottom: '1.5rem'
          }}>
            The Library of Skin
          </span>
          <h1 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            color: '#2C332E',
            lineHeight: 1.2,
            marginBottom: '1.5rem'
          }}>
            Notes on Radiance.
          </h1>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: '#5C615E',
            maxWidth: '450px',
            margin: '0 auto',
            letterSpacing: '0.02em'
          }}>
            Insights, rituals, and the science of slowing down. <br/>A curated collection of wisdom for the modern soul.
          </p>
        </div>

        {/* Image Content - Bottom (Smaller + Organic Border) */}
        <div style={{
          width: '100%',
          maxWidth: '600px', // Smaller, more contained width
          position: 'relative'
        }}>
           <div style={{
             width: '100%',
             display: 'flex',
             justifyContent: 'center'
           }}>
             <OrganicImagePlaceholder fitContent={true} style={{ width: '100%', height: 'auto' }}>
               <img 
                  src={journalHero} 
                  alt="Skin Soul Journal" 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block' 
                  }} 
                />
             </OrganicImagePlaceholder>
           </div>
        </div>
      </div>

      {/* ENTRY 01: The Architecture of Light */}
      <JournalSection className="journal-fade">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '0.7fr 1.3fr', 
          gap: '5rem', 
          maxWidth: '1200px', 
          margin: '0 auto',
          alignItems: 'start'
        }}>
          
          {/* Visual - Left */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <OrganicImagePlaceholder fitContent={true} style={{ width: '100%', zIndex: 1, position: 'relative' }}>
              <img 
                src={luminousImage} 
                alt="Skin Soul Spa Sanctuary" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block' 
                }} 
              />
            </OrganicImagePlaceholder>
            
            {/* Desktop Impulse Purchase Card */}
             {!isMobile && (
               <div style={{
                 marginTop: '2rem',
                 padding: '2rem',
                 border: '1px solid #E6E2DD',
                 backgroundColor: '#FFFFFF',
                 textAlign: 'center',
                 transition: 'transform 0.3s ease',
                 cursor: 'pointer'
               }}
               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
               >
                 <h4 style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', color: '#2C332E', marginBottom: '0.5rem' }}>
                  Reclaim Your Youthful Radiance
                </h4>
                 <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '0.9rem', color: '#C5B398', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                   Youthful Radiance Facial — $258.00
                 </p>
                 
                 {/* Smart Payment Button - Hidden for Launch
                 <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                   <Button 
                     onClick={() => handleAcquire({ title: 'Youthful Radiance Facial', price: '$258.00' })}
                   >
                     {paymentMethod === 'apple' ? 'Pay with  Pay' : 
                      paymentMethod === 'google' ? 'Pay with G Pay' : 
                      'Purchase Experience'}
                   </Button>
                 </div>
                 */}
                 
                 <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <button 
                      onClick={() => handleReserve('Youthful Radiance Facial')}
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
                      Reserve
                    </button>
                 </div>
               </div>
             )}
          </div>

          {/* Content - Right */}
          <div>
             <span style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5B398',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Entry 01
            </span>
            <h3 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '3rem',
              color: '#2C332E',
              marginBottom: '1rem',
              lineHeight: 1.1
            }}>
              The Architecture of Light
            </h3>
            <h4 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.6rem',
              fontStyle: 'italic',
              color: '#5C615E',
              marginBottom: '2.5rem'
            }}>
              Reclaiming Your Youthful Radiance
            </h4>
            <div style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '1.15rem',
              lineHeight: 1.9,
              color: '#2C332E',
              marginBottom: '3rem',
              maxWidth: '800px'
            }}>
              <p style={{ marginBottom: '2rem' }}>
                In the relentless pulse of Orchard Road exists a hidden sanctuary. Stepping into Pacific Plaza, the frantic energy of the city dissolves into a bubble of tranquillity. This is Skin Soul Spa—a space where luxury is gentle, soul-deep, and profoundly restorative.
              </p>

              <h5 style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', color: '#2C332E', margin: '2rem 0 1rem 0' }}>
                The Dialogue Before the Glow
              </h5>
              <p style={{ marginBottom: '2rem' }}>
                Our Youthful Radiance Facial begins with a purposeful dialogue. Rejecting generic protocols, our artisans—whether the gentle Shelbee or seasoned Freya—offer a highly personalised consultation. In an atmosphere free of pressure, we focus entirely on revealing your skin’s inherent luminosity.
              </p>

              <h5 style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', color: '#2C332E', margin: '2rem 0 1rem 0' }}>
                A Sensory Immersion
              </h5>
              <p style={{ marginBottom: '2rem' }}>
                Inside your private treatment room, recline into plush linens designed for total physical surrender. Soft lighting, soothing music, and ambient scents coax the mind into luxurious calm, allowing you to slip into a restorative sleep while our artisans treat your skin as sacred.
              </p>

              <h5 style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', color: '#2C332E', margin: '2rem 0 1rem 0' }}>
                The Science of Illumination
              </h5>
              <p style={{ marginBottom: '2rem' }}>
                This facial is a symphony of technical mastery and premium botanical ingredients. By utilising specialised techniques to repair the skin barrier, we "coax" radiance rather than force it. It is an investment in emotional value and an ageless glow.
              </p>

              <h5 style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', color: '#2C332E', margin: '2rem 0 1rem 0' }}>
                The Lingering Afterglow
              </h5>
              <p style={{ marginBottom: '1.5rem' }}>
                You leave with a renewed sense of well-being and a physical vitality that lingers. The Youthful Radiance Facial leaves both body and mind in perfect harmony.
              </p>
              <p style={{ marginBottom: '2.5rem', fontStyle: 'italic', color: '#2C332E' }}>
                In a noisy world, the ultimate luxury is the freedom to be vulnerable. The path to your most radiant self is a journey of total surrender.
              </p>

              <div style={{ marginTop: '1rem' }}>
                <button 
                  onClick={() => handleReserve('Youthful Radiance Facial')}
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
                    marginTop: '1rem',
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
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </JournalSection>

      {/* Real Checkout Modal - Hidden for Launch
      <CheckoutModal 
        isOpen={!!checkoutProduct} 
        onClose={() => setCheckoutProduct(null)} 
        product={checkoutProduct} 
        paymentMethod={paymentMethod}
      />
      */}

      {/* Mobile Sticky Purchase Bar */}
      <div 
        ref={purchaseBarRef}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translate(-50%, 100px)', // Start hidden
          width: '90vw',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid rgba(197, 179, 152, 0.3)',
          opacity: 0
        }}
        onClick={() => handleAcquire({ title: 'Youthful Radiance Facial', price: '$258.00' })}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '0.9rem', color: '#2C332E' }}>
            Youthful Radiance
          </span>
          <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '0.8rem', color: '#5C615E' }}>
            $258.00
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleReserve('Youthful Radiance Facial');
            }}
            style={{
              background: 'linear-gradient(to right, #C5B398 0%, #C5B398 50%, #C5B398 60%, #FFFFFF 75%, #C5B398 90%, #C5B398 100%)',
               backgroundSize: '200% auto',
               WebkitBackgroundClip: 'text',
               backgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               border: 'none',
               padding: '4px 0 0 0',
               fontFamily: '"Montserrat", sans-serif',
               fontSize: '0.6rem',
               letterSpacing: '0.15em',
               textTransform: 'uppercase',
               cursor: 'pointer',
               textAlign: 'left',
               transition: 'background-position 0.6s ease',
               fontWeight: 500,
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
            Reserve
          </button>
        </div>
        {/* Payment Hidden for Launch
        <Button 
          style={{
            padding: '0.8rem 1.5rem',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap'
          }}
          onClick={() => handleAcquire({ title: 'Youthful Radiance Facial', price: '$258.00' })}
        >
          {paymentMethod === 'apple' && 'Pay '}
          {paymentMethod === 'google' && 'Pay GPay'}
          {paymentMethod === 'generic' && 'Purchase'}
        </Button>
        */}
      </div>
    </div>
    </>
  );
};

export default TheJournal;
