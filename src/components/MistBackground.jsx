import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MistBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    // Create mist blobs
    const blobCount = 6;
    
    for (let i = 0; i < blobCount; i++) {
      const blob = document.createElement('div');
      blob.classList.add('mist-blob');
      
      // Random initial properties
      const size = Math.random() * 400 + 400; // 400-800px
      
      Object.assign(blob.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: i % 2 === 0 
          ? 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)' // Pure white mist
          : 'radial-gradient(circle, rgba(230, 240, 230, 0.6) 0%, rgba(255,255,255,0) 70%)', // Very faint sage mist
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: Math.random() * 0.4 + 0.2,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: -1
      });

      container.appendChild(blob);

      // Animate with GSAP
      gsap.to(blob, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.2)",
        opacity: "random(0.2, 0.5)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5
      });
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default MistBackground;
