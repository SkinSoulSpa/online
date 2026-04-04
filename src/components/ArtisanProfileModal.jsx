import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Button from './Button';

const ArtisanProfileModal = ({ artisan, isOpen, onClose }) => {
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: 'auto'
      });
      
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'auto';
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: 'none'
      });
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!artisan) return null;

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(26, 30, 27, 0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 9999,
        opacity: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: '90vh',
          backgroundColor: '#FAF9F6',
          borderRadius: '1rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
          position: 'relative'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: window.innerWidth < 768 ? '#FAF9F6' : '#2C332E',
            cursor: 'pointer',
            zIndex: 10,
            padding: '0.5rem',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: window.innerWidth < 768 ? 'rgba(0,0,0,0.2)' : 'rgba(250, 249, 246, 0.8)',
            backdropFilter: 'blur(5px)'
          }}
        >
          &times;
        </button>

        <div style={{
          flex: window.innerWidth < 768 ? 'none' : '0 0 45%',
          height: window.innerWidth < 768 ? '40vh' : '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img 
            src={artisan.image} 
            alt={artisan.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
          {window.innerWidth < 768 && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(to top, #FAF9F6, transparent)'
            }} />
          )}
        </div>

        <div style={{
          flex: 1,
          height: window.innerWidth < 768 ? '50vh' : '100%',
          overflowY: 'auto',
          padding: window.innerWidth < 768 ? '2rem 1.5rem' : '4rem 5rem',
          scrollbarWidth: 'thin',
          scrollbarColor: '#C5B398 transparent'
        }}>
          <style>
            {`
              .artisan-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .artisan-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .artisan-scroll::-webkit-scrollbar-thumb {
                background-color: #C5B398;
                border-radius: 10px;
              }
            `}
          </style>

          <div className="artisan-scroll" style={{ height: '100%' }}>
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: window.innerWidth < 768 ? '2.5rem' : '3.5rem',
              color: '#2C332E',
              marginBottom: '0.5rem',
              marginTop: window.innerWidth < 768 ? '-1rem' : '0'
            }}>
              {artisan.name}
            </h2>
            
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C5B398',
              lineHeight: 1.6,
              marginBottom: '2rem',
              fontWeight: 500
            }}>
              {artisan.role}
            </p>

            {artisan.bio && (
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.25rem',
                lineHeight: 1.7,
                color: '#5C615E',
                marginBottom: '3rem'
              }}>
                {artisan.bio}
              </p>
            )}

            {artisan.testimonials && artisan.testimonials.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                  fontFamily: '"Tenor Sans", sans-serif',
                  fontSize: '1.8rem',
                  color: '#2C332E',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(197, 179, 152, 0.3)',
                  paddingBottom: '0.5rem'
                }}>
                  What Clients Love About {artisan.name}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {artisan.testimonials.map((testimony, idx) => (
                    <div key={idx}>
                      <blockquote style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1.3rem',
                        lineHeight: 1.4,
                        color: '#2C332E',
                        fontStyle: 'italic',
                        margin: '0 0 0.5rem 0'
                      }}>
                        "{testimony.quote}"
                      </blockquote>
                      {testimony.context && (
                        <p style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: '1.1rem',
                          lineHeight: 1.5,
                          color: '#7A8A7D',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {testimony.context}
                        </p>
                      )}
                      <cite style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: '0.7rem',
                        fontStyle: 'normal',
                        letterSpacing: '0.1em',
                        color: '#C5B398',
                        textTransform: 'uppercase'
                      }}>
                        — {testimony.author}
                      </cite>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {artisan.signature && artisan.signature.length > 0 && (
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontFamily: '"Tenor Sans", sans-serif',
                  fontSize: '1.8rem',
                  color: '#2C332E',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(197, 179, 152, 0.3)',
                  paddingBottom: '0.5rem'
                }}>
                  {artisan.name}’s Signature Experience
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {artisan.signature.map((item, idx) => (
                    <li key={idx} style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.25rem',
                      color: '#5C615E',
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      <span style={{ 
                        color: '#C5B398', 
                        marginRight: '1rem',
                        fontSize: '1.2rem'
                      }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '2rem', paddingBottom: '2rem' }}>
              <Button 
                onClick={() => {
                  onClose();
                  navigate('/reservations', { state: { artisan: artisan.id } });
                }}
                className="artisan-modal-btn"
                style={{
                 borderColor: '#C5B398',
                 fontSize: '0.9rem',
                 padding: '1rem 3rem'
                }}
              >
                Reserve Time With {artisan.name}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfileModal;
