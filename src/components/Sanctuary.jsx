import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sanctuary = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });

    // Parallax effect for video
    tl.fromTo(videoRef.current, 
      { y: "-10%" },
      { y: "10%", ease: "none" }
    );
  }, []);

  return (
    <section id="sanctuary" ref={containerRef} className="sanctuary-section" style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Background Video */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundColor: '#E6E2DD' // soul-sand
      }}>
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{
            width: '100%',
            height: '120%', // Taller for parallax
            objectFit: 'cover',
            opacity: 0.8,
            filter: 'contrast(1.1) brightness(0.9)'
          }}
        >
          <source src={`${import.meta.env.BASE_URL}2.mp4`} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(250, 249, 246, 0.1), rgba(250, 249, 246, 0.8))'
        }}></div>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '500px',
        textAlign: 'left'
      }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#2C332E',
          marginBottom: '1.5rem',
          fontWeight: 600
        }}>The Sanctuary</p>
        
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
          color: '#2C332E',
          lineHeight: 1.1,
          marginBottom: '2rem'
        }}>
          A Quiet <span style={{ fontStyle: 'italic', color: '#C5B398' }}>Luxury</span>
        </h2>
        
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.9rem',
          lineHeight: 1.8,
          color: '#2C332E',
          opacity: 0.8
        }}>
          Step into a space where time feels suspended. Our sanctuary is designed to be an extension of the treatment itself—calm, private, and profoundly restorative. Here, silence is a luxury we cultivate with care.
        </p>
      </div>
    </section>
  );
};

export default Sanctuary;
