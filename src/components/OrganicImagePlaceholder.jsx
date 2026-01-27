import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const OrganicImagePlaceholder = ({ children, style, className, fitContent = false }) => {
  const pathRef = useRef(null);
  const strokeRef = useRef(null);
  // Simple unique ID for clip path
  const clipId = React.useMemo(() => `clip-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    // Define two states for the organic S-wave shape using 0-1 coordinates
    const path1 = "M0,0 C0.3,0.05 0.7,-0.05 1,0 C0.95,0.3 1.05,0.7 1,1 C0.7,0.95 0.3,1.05 0,1 C0.05,0.7 -0.05,0.3 0,0 Z";
    const path2 = "M0,0 C0.4,-0.05 0.6,0.05 1,0 C1.05,0.3 0.95,0.7 1,1 C0.6,1.05 0.4,0.95 0,1 C-0.05,0.7 0.05,0.3 0,0 Z";

    const targets = [pathRef.current, strokeRef.current].filter(Boolean);
    if (targets.length === 0) return;

    // Animate between states
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(targets, {
      attr: { d: path2 },
      duration: 5,
      ease: "sine.inOut"
    });

    return () => tl.kill();
  }, []);

  return (
    <div className={className} style={{ ...style, backgroundColor: 'transparent', position: 'relative' }}>
      {/* SVG Definitions for Clip Path */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path ref={pathRef} d="M0,0 C0.3,0.05 0.7,-0.05 1,0 C0.95,0.3 1.05,0.7 1,1 C0.7,0.95 0.3,1.05 0,1 C0.05,0.7 -0.05,0.3 0,0 Z" />
          </clipPath>
        </defs>
      </svg>
      
      {/* Layer 1: Background Color (Masked) */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%', 
        clipPath: `url(#${clipId})`,
        WebkitClipPath: `url(#${clipId})`,
        zIndex: 0,
        backgroundColor: '#E6E2DD'
      }} />

      {/* Layer 2: Content (Masked) */}
      <div style={{ 
        position: fitContent ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%', 
        clipPath: `url(#${clipId})`,
        WebkitClipPath: `url(#${clipId})`,
        zIndex: 1,
        // Force hardware acceleration to fix some clipping issues
        transform: 'translateZ(0)'
      }}>
        {children}
      </div>

      {/* Layer 3: Overlay Stroke */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1 1" 
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}
      >
        <path 
          ref={strokeRef}
          d="M0,0 C0.3,0.05 0.7,-0.05 1,0 C0.95,0.3 1.05,0.7 1,1 C0.7,0.95 0.3,1.05 0,1 C0.05,0.7 -0.05,0.3 0,0 Z"
          fill="none"
          stroke="rgba(197, 179, 152, 0.3)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default OrganicImagePlaceholder;
