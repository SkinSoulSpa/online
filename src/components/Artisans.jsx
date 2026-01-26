import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import Button from './Button';
import artisansImage from '../assets/8.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Artisans = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Text Content
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );

      // Animate Single Image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
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
      backgroundColor: 'transparent', // Transparent Background
      color: '#2C332E',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align content
        gap: isMobile ? '4rem' : '6rem'
      }}>
        
        {/* Text Content - Centered */}
        <div ref={textRef} style={{ 
          maxWidth: '800px', 
          textAlign: 'center',
          margin: '0 auto' 
        }}>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            color: '#6B5E48', // Dark Bronze
            margin: 0,
            marginBottom: '1rem',
            lineHeight: 1.1,
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.05em'
          }}>
            The Artisans
          </h2>
          
          <h3 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(2rem, 3vw, 3rem)',
            color: '#2C332E',
            marginBottom: '2rem',
            fontWeight: 400,
            lineHeight: 1.2
          }}>
            Hands You Can Trust.
          </h3>

          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.25rem',
            color: '#5C615E',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '650px'
          }}>
            Technology is powerful, but the human touch is transformative. At Skin Soul Spa, we believe the energy of the therapist is as vital as the product on your skin.
            <br/><br/>
            Our senior artisans—including Kelly, Freya, and Shelbee—are renowned for their gentle technique and intuitive understanding of skin health. They do not just treat the face; they nourish the soul. When you are in their hands, you are safe, heard, and deeply cared for.
          </p>

          <Button>
            Meet The Artisans
          </Button>
        </div>

        {/* Single Image - 16:9 Aspect Ratio */}
        <div ref={imageRef} style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem'
        }}>
           <OrganicImagePlaceholder style={{
             width: '100%',
             maxWidth: '1000px', // Limit max width for better visual
             paddingBottom: '56.25%', // 16:9 Aspect Ratio (56.25%)
             height: 0,
             position: 'relative'
           }}>
              <img 
                src={artisansImage} 
                alt="Artisan Team" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
           </OrganicImagePlaceholder>
        </div>

      </div>
    </section>
  );
};

export default Artisans;
