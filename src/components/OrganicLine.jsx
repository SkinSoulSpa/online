import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OrganicLine = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const glowPathRef = useRef(null);
  const turbulenceRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [pathData, setPathData] = useState("");

  // Function to generate the organic path
  const generatePath = useCallback((height, mobile) => {
    if (!height) return "";
    
    const startX = 50; // Center of 0-100 viewBox width
    // Prominent curve settings
    // Mobile: Wider swings (amplitude) to be visible on narrow screens
    // Desktop: Elegant swings
    const amplitude = mobile ? 45 : 30; 
    
    // Wave length (vertical distance for one full S-curve)
    // Smaller wavelength = more curves
    const waveLength = mobile ? 600 : 900; 
    
    const steps = Math.ceil(height / waveLength);
    let d = `M ${startX},0`;
    
    for (let i = 0; i < steps; i++) {
      const yStart = i * waveLength;
      const yEnd = Math.min((i + 1) * waveLength, height);
      const segmentHeight = yEnd - yStart;
      
      // Alternate direction for variety if needed, but the S-curve logic handles the weave
      // We want a continuous flow. 
      // An S-curve (C command) goes: Start -> Right bulge -> Left bulge -> End (Center)
      // To make it continuous, we should flip the control points for the next segment?
      // Actually, if every segment is Start(Center) -> Right -> Left -> End(Center), 
      // then it might look repetitive or have a "corner" at the center if tangents don't match.
      
      // Smooth sine wave approach:
      // Segment 1: Center -> Right Extremity (Q or C) -> Center
      // But standard CSS/SVG sine wave is often:
      // C (Center+Amp, Y+1/3) (Center+Amp, Y+2/3) (Center, Y+1) -> This is just a bulge to right
      // Then next segment bulge to left.
      
      // Let's use this alternating bulge approach for smoother transitions
      const direction = i % 2 === 0 ? 1 : -1; // 1 = Right, -1 = Left
      const amp = amplitude * direction;
      
      // We use cubic bezier to create a smooth bulge
      // Start: 50, yStart
      // CP1: 50 + amp, yStart + segmentHeight * 0.5
      // CP2: 50 + amp, yEnd - segmentHeight * 0.5
      // End: 50, yEnd
      // This creates a C-shape. Alternating C-shapes creates a sine wave.
      
      // To make it "organic" and not just a perfect sine wave, we can add slight randomness
      // or vary the amplitude slightly.
      
      d += ` C ${startX + amp},${yStart + segmentHeight * 0.3} ${startX + amp},${yEnd - segmentHeight * 0.3} ${startX},${yEnd}`;
    }
    
    return d;
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      const body = document.body;
      const html = document.documentElement;
      
      // Get the full scrollable height
      const height = Math.max(
        body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
      
      setDimensions({
        width: window.innerWidth,
        height: height
      });
      
      setIsMobile(window.innerWidth < 768);
    };

    // Initial measure
    updateDimensions();

    // Listen for resize
    window.addEventListener('resize', updateDimensions);
    
    // ResizeObserver to detect content height changes
    const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  // Update path when dimensions or device type changes
  useEffect(() => {
    if (dimensions.height > 0) {
      const newPath = generatePath(dimensions.height, isMobile);
      setPathData(newPath);
    }
  }, [dimensions, isMobile, generatePath]);

  // Animation effect
  useEffect(() => {
    const path = pathRef.current;
    const glowPath = glowPathRef.current;
    const turbulence = turbulenceRef.current;

    if (!path || !glowPath || !pathData) return;

    // Recalculate length for the new path
    const length = path.getTotalLength();
    
    // Reset styles
    gsap.set([path, glowPath], {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0
    });

    // Fade in
    gsap.to(path, {
        opacity: 0.5,
        duration: 1,
        ease: "power2.out"
    });

    // Scroll drawing animation
    // We need to refresh ScrollTrigger when height changes
    ScrollTrigger.refresh();
    
    const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        animation: gsap.to([path, glowPath], {
            strokeDashoffset: 0,
            ease: "none"
        })
    });

    // Pulse animation
    const pulseAnim = gsap.to(glowPath, {
      opacity: 0.6,
      strokeWidth: isMobile ? 3 : 4,
      duration: 3,
      delay: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Turbulence animation (desktop only)
    let turbulenceAnim;
    if (turbulence && !isMobile) {
        turbulenceAnim = gsap.to(turbulence, {
            attr: { baseFrequency: "0.012 0.008" },
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    return () => {
        if (trigger) trigger.kill();
        if (pulseAnim) pulseAnim.kill();
        if (turbulenceAnim) turbulenceAnim.kill();
    };
  }, [pathData, isMobile]);

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
        viewBox={`0 0 100 ${dimensions.height || 100}`}
        preserveAspectRatio="none"
        style={{ height: '100%' }}
      >
        <defs>
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
          d={pathData}
          fill="none"
          stroke="#C5B398" // Soul Gold
          strokeWidth={isMobile ? 2 : 1.5}
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
          filter={isMobile ? null : "url(#organic-distortion)"} 
          strokeLinecap="round"
          style={{ opacity: 0 }}
        />

        {/* Glowing Pulse Line */}
        <path
          ref={glowPathRef}
          d={pathData}
          fill="none"
          stroke="#FAF9F6" 
          strokeWidth={isMobile ? 1.5 : 1}
          vectorEffect="non-scaling-stroke"
          filter={isMobile ? null : "url(#glow)"}
          opacity="0.8"
          strokeLinecap="round"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
};

export default OrganicLine;
