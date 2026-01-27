import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';

gsap.registerPlugin(ScrollTrigger);

const JournalSection = ({ children, className, style, id }) => (
  <section id={id} className={className} style={{
    padding: '8rem 2rem',
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

const ProductCard = ({ title, price, imageLabel }) => (
  <div style={{
    border: '1px solid #E6E2DD',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ height: '200px', marginBottom: '1.5rem' }}>
      <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
        <div style={{ 
          width: '100%', height: '100%', 
          backgroundColor: '#F5F5F0', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#9CAFA0', fontSize: '0.8rem', letterSpacing: '0.1em'
        }}>
          {imageLabel || 'PRODUCT'}
        </div>
      </OrganicImagePlaceholder>
    </div>
    <h4 style={{
      fontFamily: '"Tenor Sans", sans-serif',
      fontSize: '1.2rem',
      color: '#2C332E',
      marginBottom: '0.5rem'
    }}>
      {title}
    </h4>
    <p style={{
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '0.9rem',
      color: '#C5B398',
      letterSpacing: '0.05em'
    }}>
      {price}
    </p>
  </div>
);

const MockCheckoutModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(44, 51, 46, 0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: '500px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        padding: '2rem',
        animation: 'slideUp 0.4s ease-out',
        position: 'relative',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
      }} onClick={e => e.stopPropagation()}>
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}
        </style>
        {/* Apple Pay / Stripe Mock Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          borderBottom: '1px solid #F0F0F0',
          paddingBottom: '1rem'
        }}>
          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 600, fontSize: '1.1rem' }}>
            Pay with Passcode
          </span>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#8C8C8C' }}>×</button>
        </div>
        {/* Product Summary */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#F5F5F0', borderRadius: '8px' }}></div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.1rem' }}>{product?.title}</h4>
            <p style={{ margin: 0, color: '#5C615E', fontFamily: '"Montserrat", sans-serif', fontSize: '0.9rem' }}>{product?.price}</p>
          </div>
        </div>
        {/* Payment Methods */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            backgroundColor: '#000000', 
            color: '#FFFFFF', 
            padding: '1rem', 
            borderRadius: '4px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 500
          }}>
              Pay
          </div>
        </div>
        {/* Face ID Animation Mock */}
        <div style={{ textAlign: 'center', color: '#8C8C8C', fontSize: '0.8rem', marginTop: '1rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '2px solid #2C332E', 
            borderRadius: '50%', 
            margin: '0 auto 0.5rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.2rem' }}>☺</span>
          </div>
          Double Click Side Button
        </div>
      </div>


    </div>
  );
};

const TheJournal = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const navigate = useNavigate();

  const handleAcquire = (product) => {
    setCheckoutProduct(product);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="journal-page" style={{ 
      minHeight: '100vh',
      paddingTop: '100px',
      position: 'relative',
      backgroundColor: 'transparent' // Transparent to reveal OrganicLine
    }}>

      {/* HERO SECTION: The Library of Skin */}
      <div style={{ 
        position: 'relative', 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        overflow: 'hidden'
      }}>
        {/* Background Visual Placeholder */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          zIndex: 0,
          opacity: 0.15
        }}>
          <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
            <div style={{ 
              width: '100%', height: '100%', 
              backgroundColor: '#9CAFA0', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              ABSTRACT SKIN TEXTURE VIDEO
            </div>
          </OrganicImagePlaceholder>
        </div>

        <div className="journal-fade" style={{ maxWidth: '900px', zIndex: 2 }}>
          <span style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9CAFA0', // Sage
            display: 'block',
            marginBottom: '1.5rem'
          }}>
            The Library of Skin
          </span>
          <h1 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#2C332E',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            Notes on Radiance.
          </h1>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#5C615E',
            fontStyle: 'italic',
            fontWeight: 300,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Insights, rituals, and the science of slowing down.
          </h2>
        </div>
      </div>

      {/* ENTRY 01: The Hydration Paradox */}
      <JournalSection className="journal-fade">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: '4rem', 
          maxWidth: '1200px', 
          alignItems: 'center' 
        }}>
          {/* Text Content */}
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
              fontSize: '2.5rem',
              color: '#2C332E',
              marginBottom: '1.5rem'
            }}>
              The Hydration Paradox
            </h3>
            <h4 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.5rem',
              fontStyle: 'italic',
              color: '#5C615E',
              marginBottom: '2rem'
            }}>
              Why drinking water isn't enough for city skin.
            </h4>
            <div style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#5C615E',
              marginBottom: '2rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Living in the city imposes a specific tax on the complexion. We often mistake dehydration for dryness, but the root cause is frequently a compromised barrier unable to hold onto vitality.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                In our "Soul-Deep Restore" ritual, we utilise the specific botanical potency of the Hydra Global collection to retrain the skin’s architecture. To maintain this "post-treatment glow" at home, we recommend a two-step intervention:
              </p>
              <p>
                <strong>The 240 Serum:</strong> A concentrated infusion that delivers immediate vitality. <br/>
                <strong>The 260 Cream:</strong> A "daily seal" that mimics the skin’s natural lipids, locking in moisture while shielding you from the urban environment.
              </p>
            </div>
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              border: '1px solid #E6E2DD',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                <span style={{ display: 'block', fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', color: '#2C332E', marginBottom: '0.3rem' }}>The Hydration Ritual Set</span>
                <span style={{ display: 'block', fontFamily: '"Montserrat", sans-serif', fontSize: '0.8rem', color: '#5C615E' }}>Complete 2-Step Regimen</span>
              </div>
              <button 
                className="btn-shimmer"
                onClick={() => handleAcquire({ title: 'The Hydration Ritual Set', price: '$464.40' })}
                style={{
                  background: '#2C332E',
                  border: 'none',
                  padding: '1rem 2rem',
                  color: '#FFFFFF',
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  minWidth: '220px',
                  whiteSpace: 'nowrap'
                }}>
                Purchase Set — $464.40
              </button>
            </div>
          </div>

          {/* Product Showcase */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '1.5rem' 
          }}>
            <ProductCard 
              title="260 Hydra Global Cream" 
              price="$226.80" 
              imageLabel="260 CREAM"
              onAcquire={() => handleAcquire({ title: '260 Hydra Global Cream', price: '$226.80' })}
            />
            <ProductCard 
              title="240 Hydra Global Serum" 
              price="$237.60" 
              imageLabel="240 SERUM"
              onAcquire={() => handleAcquire({ title: '240 Hydra Global Serum', price: '$237.60' })}
            />
          </div>
        </div>
      </JournalSection>

      {/* Mock Checkout Modal */}
      <MockCheckoutModal 
        isOpen={!!checkoutProduct} 
        onClose={() => setCheckoutProduct(null)} 
        product={checkoutProduct} 
      />

      {/* ENTRY 02: The Philosophy */}
      <JournalSection className="journal-fade" style={{ backgroundColor: 'rgba(240, 242, 240, 0.9)' }}> {/* Light Sage Tint - Semi-transparent */}
        <div style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#9CAFA0',
            display: 'block',
            marginBottom: '1rem'
          }}>
            Entry 02: The Philosophy
          </span>
          <h3 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#2C332E',
            marginBottom: '2rem'
          }}>
            Why We Don't Do "Quick Fixes"
          </h3>
          
          {/* Visual Break */}
          <div style={{ height: '300px', margin: '3rem 0', position: 'relative' }}>
            <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
              <div style={{ 
                width: '100%', height: '100%', 
                backgroundColor: '#D1D1C7', // Misty Sage
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                SLOW BEAUTY RITUAL VIDEO
              </div>
            </OrganicImagePlaceholder>
          </div>

          <h4 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.6rem',
            fontStyle: 'italic',
            color: '#5C615E',
            marginBottom: '2rem'
          }}>
            A manifesto on "Slow Beauty."
          </h4>
          <div style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '1rem',
            lineHeight: 2,
            color: '#5C615E',
            marginBottom: '3rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              In an industry obsessed with aggression, harsher peels, stronger lasers, faster turnover, we have chosen a different path. We believe, as our clients Zenn and Tee Wei have noted, in "genuine care" without the pressure.
            </p>
            <p>
              True radiance is not forced; it is coaxed. Whether you are visiting us for a Clarifying Peace session or seeking advice on a regimen, our artisans focus on long-term structural health over temporary surface changes. We treat the skin as a living organ to be respected, not a problem to be conquered.
            </p>
          </div>

        </div>
      </JournalSection>

      {/* ENTRY 03: The Art of Solitude */}
      <JournalSection className="journal-fade">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: '4rem', 
          maxWidth: '1200px', 
          alignItems: 'center' 
        }}>
          {/* Gift Card Visual - Left on Desktop */}
          <div style={{ order: isMobile ? 2 : 1 }}>
            <div style={{ 
              backgroundColor: '#2C332E', 
              padding: '3rem', 
              color: '#C5B398',
              textAlign: 'center',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem'
            }}>
              <div style={{
                border: '1px solid rgba(197, 179, 152, 0.3)',
                padding: '2rem',
                width: '100%',
                maxWidth: '300px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginBottom: '1rem',
                backgroundColor: 'rgba(255,255,255,0.03)'
              }}>
                <span style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>SKIN SOUL</span>
                <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em' }}>GIFT CARD</span>
              </div>
              
              {/* Denomination Buttons */}
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[100, 200, 500].map(value => (
                  <button
                    key={value}
                    onClick={() => handleAcquire({ title: `Skin Soul Gift Card - $${value}`, price: `$${value}.00` })}
                    style={{
                      background: 'rgba(197, 179, 152, 0.1)',
                      border: '1px solid #C5B398',
                      color: '#C5B398',
                      padding: '0.8rem 1.2rem',
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minWidth: '80px'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = '#C5B398';
                      e.target.style.color = '#2C332E';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = 'rgba(197, 179, 152, 0.1)';
                      e.target.style.color = '#C5B398';
                    }}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '0.65rem', color: '#8C8C8C', letterSpacing: '0.05em' }}>
                Select amount to purchase
              </span>
            </div>
          </div>

          {/* Text Content - Right on Desktop */}
          <div style={{ order: isMobile ? 1 : 2 }}>
            <span style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5B398',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Entry 03
            </span>
            <h3 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '2.5rem',
              color: '#2C332E',
              marginBottom: '1.5rem'
            }}>
              The Art of Solitude
            </h3>
            <h4 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.5rem',
              fontStyle: 'italic',
              color: '#5C615E',
              marginBottom: '2rem'
            }}>
              In a noisy world, the ultimate luxury is silence.
            </h4>
            <div style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#5C615E',
              marginBottom: '2rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                We often equate generosity with material objects. But for the stressed professional, the executive, the mother, the traveller, the rarest commodity is time.
              </p>
              <p>
                A Skin Soul Spa journey is more than a facial; it is a "bubble of tranquillity" where phones are silenced and time feels suspended. When you gift a ritual, you are not just giving a treatment; you are permitting a pause.
              </p>
            </div>

          </div>
        </div>
      </JournalSection>

      {/* ENTRY 04: The Architecture of Sleep (Light Mode Layout) */}
      <JournalSection className="journal-fade" style={{ backgroundColor: 'rgba(250, 249, 246, 0.9)', padding: '8rem 2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: '6rem', 
          maxWidth: '1200px', 
          margin: '0 auto',
          alignItems: 'center'
        }}>
          
          {/* Visual - Left */}
          <div style={{ order: isMobile ? 2 : 1, height: '600px', position: 'relative' }}>
             {/* Decorative Line */}
             <div style={{
               position: 'absolute',
               top: '-2rem',
               left: '-2rem',
               width: '100%',
               height: '100%',
               border: '1px solid rgba(197, 179, 152, 0.2)',
               zIndex: 0
             }} />
             
            <OrganicImagePlaceholder style={{ width: '100%', height: '100%', zIndex: 1, position: 'relative' }}>
              <div style={{ 
                width: '100%', height: '100%', 
                backgroundColor: '#1A1D1B', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
                color: '#C5B398',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '3rem', fontWeight: 100 }}>☾</span>
                <span style={{ fontFamily: '"Montserrat", sans-serif', letterSpacing: '0.2em', fontSize: '0.8rem' }}>MIDNIGHT RITUAL</span>
              </div>
            </OrganicImagePlaceholder>
          </div>

          {/* Content - Right */}
          <div style={{ order: isMobile ? 1 : 2 }}>
             <span style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C5B398',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Entry 04
            </span>
            <h3 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '3rem',
              color: '#2C332E',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              The Architecture of Sleep
            </h3>
            <h4 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.6rem',
              fontStyle: 'italic',
              color: '#5C615E',
              marginBottom: '2.5rem'
            }}>
              Circadian rhythms and the silent work of repair.
            </h4>
            <div style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#5C615E',
              marginBottom: '3rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                While the city sleeps, your skin enters its most metabolic phase. Catabolism shifts to anabolism; destruction gives way to construction. This is the "Golden Hour" of cellular recovery.
              </p>
              <p>
                We prescribe "The Midnight Ritual" not just as a product application, but as a discipline. By signalling to the body that the day has ended, we lower cortisol and unlock the skin's innate healing potential.
              </p>
            </div>

            {/* Featured Product Horizontal Card (Light Theme) */}
            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              alignItems: 'center',
              borderTop: '1px solid #F0F0F0',
              paddingTop: '2rem'
            }}>
              <div style={{ width: '100px', height: '120px', flexShrink: 0 }}>
                <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
                   <div style={{ width: '100%', height: '100%', backgroundColor: '#F5F5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C332E', fontSize: '0.7rem' }}>1000 MILLE</div>
                </OrganicImagePlaceholder>
              </div>
              <div>
                <h5 style={{ fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: '#2C332E' }}>
                  1000 MILLE La Crème
                </h5>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '0.85rem', color: '#8C8C8C', margin: '0 0 1.5rem 0' }}>
                  The ultimate luxury.
                </p>
                <button 
                  onClick={() => handleAcquire({ title: '1000 MILLE La Crème', price: '$620.00' })}
                  style={{
                    border: '1px solid #C5B398',
                    background: 'transparent',
                    padding: '0.8rem 1.5rem',
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#C5B398',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = '#C5B398';
                    e.target.style.color = '#2C332E';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#C5B398';
                  }}
                >
                  Invest in the Night ($620)
                </button>
              </div>
            </div>

          </div>
        </div>
      </JournalSection>

    </div>
  );
};

export default TheJournal;
