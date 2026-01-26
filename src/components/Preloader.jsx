import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

// Configuration: Switch 'variant' to 'pulse', 'ripple', or 'mist'
const VARIANT = 'organic'; 

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  
  // Refs for specific variants
  const pathRef = useRef(null);
  const glowPathRef = useRef(null);
  const turbulenceRef = useRef(null);
  const turbulenceGlowRef = useRef(null);
  const circleRef = useRef(null);
  const rippleRef1 = useRef(null);
  const rippleRef2 = useRef(null);
  const rippleRef3 = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);

    // Failsafe: Force remove after 5 seconds max (in case animation hangs on mobile)
    const failsafe = setTimeout(() => {
      if (!loaded) setLoaded(true);
    }, 5000);

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded(true);
        clearTimeout(failsafe);
        window.removeEventListener('resize', checkMobile);
      }
    });

    // Initial Setup
    gsap.set(containerRef.current, { yPercent: 0 });
    gsap.set(textRef.current, { opacity: 0 });

    // --- ANIMATION LOGIC BASED ON VARIANT ---

    if (VARIANT === 'organic') {
        // DESIGN 4: ORGANIC LINE (Consistency)
        // Draws the signature path while text fades in
        
        const path = pathRef.current;
        const glowPath = glowPathRef.current;
        
        if (path && glowPath) {
            console.log("Preloader: Starting organic animation");
            const length = path.getTotalLength();
            
            // Set initial dasharray/offset for drawing effect
            gsap.set([path, glowPath], { 
                strokeDasharray: length, 
                strokeDashoffset: length,
                opacity: 0
            });
            
            // Ensure text is prepared correctly
            gsap.set(textRef.current, { 
                y: 20, 
                fontFamily: '"Tenor Sans", sans-serif',
                textTransform: 'uppercase',
                fontSize: '1.5rem',
                letterSpacing: '0.15em',
                opacity: 0 // Ensure it starts invisible
            });

            // Fade in elements gently (prevent FOUC)
            tl.to(path, {
                opacity: 0.5, // Reduced from 0.8 to match home page subtlety
                duration: 0.5,
                ease: "power2.out"
            }, 0)
            .to(glowPath, {
                opacity: 0.6, // Lighter inner stroke
                duration: 0.5,
                ease: "power2.out"
            }, 0);

            // Draw Line (Travels from top to bottom)
            tl.to([path, glowPath], { 
                strokeDashoffset: 0, 
                duration: 2.5, 
                ease: "power2.inOut" 
            }, 0.2);
            
            // Animate turbulence (subtle living effect) - Desktop only
            const turbulence = turbulenceRef.current;
            
            if (turbulence && !isMobile) {
                gsap.to(turbulence, {
                    attr: { baseFrequency: "0.012 0.008" },
                    duration: 10, // Slower, gentle breathing like home page
                    ease: "sine.inOut"
                });
            }

            // Animate Glow Pulse (Breathing effect that hides hard edges)
            gsap.to(glowPath, {
                opacity: 0.6,
                strokeWidth: isMobile ? 3 : 4,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Text Fade In
            tl.to(textRef.current, { 
                opacity: 1, 
                y: 0, 
                duration: 1.5, 
                ease: "power2.out" 
            }, 0.8);

            // Exit
            tl.to(containerRef.current, { 
                opacity: 0, 
                duration: 1, 
                ease: "power2.inOut",
                delay: 0.5
            });
        } else {
             console.error("Preloader: Path refs missing");
             setLoaded(true); // Failsafe if refs are missing
        }

    } else if (VARIANT === 'pulse') {
        // DESIGN 1: THE PULSE (Original Refined)
        // A single gold ring breathing with the text
        gsap.set(circleRef.current, { scale: 0.8, opacity: 0.3 });
        gsap.set(textRef.current, { letterSpacing: '0.2em' });

        // Inhale
        tl.to(textRef.current, { opacity: 1, duration: 1.5, ease: "power2.out" }, 0)
          .to(circleRef.current, { scale: 1.2, opacity: 0.1, duration: 2.5, ease: "sine.inOut" }, 0)
          .to(textRef.current, { letterSpacing: '0.4em', duration: 2.5, ease: "sine.inOut" }, 0);

        // Exhale & Exit
        tl.to(textRef.current, { opacity: 0, duration: 1, ease: "power2.in", delay: 0.5 })
          .to(circleRef.current, { scale: 0, opacity: 0, duration: 1, ease: "power2.in" }, "<");

    } else if (VARIANT === 'ripple') {
        // DESIGN 2: THE RIPPLE (New Default)
        // Multiple concentric rings expanding outward like water drops
        gsap.set([rippleRef1.current, rippleRef2.current, rippleRef3.current], { 
            scale: 0, opacity: 0, border: '1px solid #C5B398' 
        });
        gsap.set(textRef.current, { letterSpacing: '0.3em', y: 10 });

        // Text Rise
        tl.to(textRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 0);

        // Ripple Effect
        const rippleDefaults = { duration: 3, ease: "power1.out", opacity: 0 };
        tl.to(rippleRef1.current, { ...rippleDefaults, scale: 1.5, keyframes: [{opacity: 0.4, duration: 0.5}, {opacity: 0, duration: 2.5}] }, 0.2)
          .to(rippleRef2.current, { ...rippleDefaults, scale: 1.5, keyframes: [{opacity: 0.3, duration: 0.5}, {opacity: 0, duration: 2.5}] }, 0.6)
          .to(rippleRef3.current, { ...rippleDefaults, scale: 1.5, keyframes: [{opacity: 0.2, duration: 0.5}, {opacity: 0, duration: 2.5}] }, 1.0);
        
        // Exit
        tl.to(textRef.current, { opacity: 0, letterSpacing: '0.5em', duration: 1, ease: "power2.in" }, "-=1");

    } else if (VARIANT === 'mist') {
        // DESIGN 3: THE MIST
        // Soft blur transition, ethereal and ghost-like
        gsap.set(textRef.current, { letterSpacing: '0.2em', filter: 'blur(10px)' });

        // Blur In
        tl.to(textRef.current, { 
            opacity: 1, 
            filter: 'blur(0px)', 
            duration: 2, 
            ease: "power2.inOut" 
        }, 0);

        // Float/Drift slightly
        tl.to(textRef.current, {
            y: -5,
            duration: 2.5,
            ease: "sine.inOut"
        }, 0);

        // Blur Out
        tl.to(textRef.current, { 
            opacity: 0, 
            filter: 'blur(10px)', 
            duration: 1.5, 
            ease: "power2.in" 
        }, ">-0.5");
    }

    // Common Exit for Container
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power3.inOut"
    });

    return () => clearTimeout(failsafe);
  }, [isMobile]);

  if (loaded) return null;

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      inset: 0,
      background: '#FAF9F6',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', // Changed from 100vw to prevent scrollbar overflow
      height: '100%', // Changed from 100vh for consistency
      overflow: 'hidden'
    }}>
      
      {/* Variant 4: Organic Line */}
      {VARIANT === 'organic' && (
          <div style={{ 
              position: 'absolute', 
              width: '100%', 
              height: '300vh', // Match the height scale of the home page (approx 300vh)
              top: 0,
              left: 0,
              pointerEvents: 'none' 
          }}>
              <svg width="100%" height="100%" viewBox="0 0 100 400" preserveAspectRatio="none">
                <defs>
                  {/* Filter to create variable width/roughness - EXACT COPY from OrganicLine */}
                  <filter id="organic-distortion-preloader" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence 
                        ref={turbulenceRef}
                        type="fractalNoise" 
                        baseFrequency="0.01 0.004" 
                        numOctaves={isMobile ? "1" : "3"} 
                        result="noise" 
                    />
                    <feDisplacementMap 
                        in="SourceGraphic" 
                        in2="noise" 
                        scale={isMobile ? "5" : "15"} 
                        xChannelSelector="R" 
                        yChannelSelector="G" 
                    />
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  
                  <filter id="glow-preloader" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation={isMobile ? 1.5 : 3} result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                  <path
                      ref={pathRef}
                      d="M50,0 C30,30 80,80 50,130 C20,180 90,230 40,300 C10,350 70,380 50,450"
                      fill="none"
                      stroke="#C5B398"
                      strokeWidth={isMobile ? 3 : 2}
                      strokeLinecap="round"
                      opacity="0"
                      filter={isMobile ? null : "url(#organic-distortion-preloader)"}
                  />
                  
                  {/* Inner lighter stroke for depth */}
                  <path
                    ref={glowPathRef}
                    d="M50,0 C30,30 80,80 50,130 C20,180 90,230 40,300 C10,350 70,380 50,450"
                    fill="none"
                    stroke="#FAF9F6"
                    strokeWidth={isMobile ? 2 : 2.5} 
                    filter={isMobile ? null : "url(#glow-preloader)"}
                    opacity="0"
                    strokeLinecap="round"
                  />
              </svg>
          </div>
      )}

      {/* VARIANT 1: PULSE ELEMENTS */}
      {VARIANT === 'pulse' && (
          <div ref={circleRef} style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '1px solid #C5B398',
            background: 'radial-gradient(circle, rgba(197, 179, 152, 0.2) 0%, rgba(250, 249, 246, 0) 70%)',
          }}></div>
      )}

      {/* VARIANT 2: RIPPLE ELEMENTS */}
      {VARIANT === 'ripple' && (
          <>
            <div ref={rippleRef1} style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%' }}></div>
            <div ref={rippleRef2} style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%' }}></div>
            <div ref={rippleRef3} style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%' }}></div>
          </>
      )}

      {/* VARIANT 3: MIST ELEMENTS (Uses Text Only with Filters) */}

      {/* Common Text Element */}
      <div 
        ref={textRef}
        style={{
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: '1.5rem',
          color: '#2C332E',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          zIndex: 10,
          fontStyle: 'normal',
          position: 'relative',
          userSelect: 'none',
          outline: 'none',
          border: 'none',
          background: 'transparent',
          opacity: 0 // Start hidden to prevent FOUC/FOUT
        }}
      >
        skin soul spa
      </div>

    </div>
  );
};

export default Preloader;