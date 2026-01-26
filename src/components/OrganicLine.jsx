import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OrganicLine = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const glowPathRef = useRef(null);
  const turbulenceRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);

    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    const turbulence = turbulenceRef.current;

    if (!path || !glowPath) return;

    // Set initial dasharray/offset for drawing effect
    const length = path.getTotalLength();
    
    // Reset styles - ensure opacity starts at 0 to prevent FOUC
    gsap.set([path, glowPath], {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0
    });

    // Fade in elements gently after setup
    // This ensures no "flash" of the full line happens before the dashoffset is ready
    gsap.to(path, {
        opacity: 0.5,
        duration: 1,
        ease: "power2.out"
    });

    // Create the scroll-driven drawing animation
    gsap.to([path, glowPath], {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    // Pulse animation for the glow path
    // We delay this slightly to let the fade-in happen
    gsap.to(glowPath, {
      opacity: 0.6,
      strokeWidth: isMobile ? 3 : 4,
      duration: 3,
      delay: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Only animate turbulence on desktop (expensive operation)
    // Mobile can have the static turbulence filter, but animating it might be too much
    if (turbulence && !isMobile) {
        gsap.to(turbulence, {
            attr: { baseFrequency: "0.012 0.008" },
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Define paths based on device to ensure curves remain visible despite aspect ratio stretching
  // Mobile needs wider X swings and more frequent Y curves to combat the tall/narrow aspect ratio
  const mobilePath = "M50,0 C 0,50 100,100 50,150 C 0,200 100,250 50,300 C 0,350 100,400 50,450 C 0,500 100,550 50,600 C 0,650 100,700 50,750 C 0,800 100,850 50,900";
  
  // Desktop can be gentler
  const desktopPath = "M50,0 C 30,100 70,200 50,300 C 30,400 70,500 50,600 C 30,700 70,800 50,900";

  const currentPath = isMobile ? mobilePath : desktopPath;
  const viewBoxHeight = 900;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%" 
        viewBox={`0 0 100 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <defs>
          {/* Filter to create variable width/roughness */}
          {/* Render complex filter on both desktop and mobile as requested */}
          <filter id="organic-distortion" x="-50%" y="-50%" width="200%" height="200%">
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
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isMobile ? 1.5 : 3} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Base Line */}
        <path
          ref={pathRef}
          d={currentPath}
          fill="none"
          stroke="#C5B398" // Soul Gold
          strokeWidth={isMobile ? 3 : 2}
          opacity="0.5"
          filter={isMobile ? null : "url(#organic-distortion)"} // Disable filter on mobile for performance
          strokeLinecap="round"
          style={{ opacity: 0 }} // Hidden initially to prevent FOUC
        />

        {/* Glowing Pulse Line */}
        <path
          ref={glowPathRef}
          d={currentPath}
          fill="none"
          stroke="#FAF9F6" // Off-white glow
          strokeWidth={isMobile ? 2 : 1.5}
          filter={isMobile ? null : "url(#glow)"}
          opacity="0.8"
          strokeLinecap="round"
          style={{ opacity: 0 }} // Hidden initially to prevent FOUC
        />
      </svg>
    </div>
  );
};

export default OrganicLine;
