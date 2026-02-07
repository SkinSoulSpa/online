import React, { useState } from 'react';

const WhatsAppWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href="https://wa.me/6593633111" 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="whatsapp-widget-shimmer"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3.8rem',
        height: '3.8rem',
        padding: 0,
        // Transparent Glass Green (Botanical/Forest)
        background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.6) 0%, rgba(46, 92, 62, 0.7) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        overflow: 'hidden', // Ensure shimmer is clipped to circle
        // Glassy Glow
        boxShadow: `
          0 8px 32px 0 rgba(31, 38, 135, 0.15),
          0 4px 12px rgba(37, 211, 102, 0.2),
          inset 0 0 0 1px rgba(255, 255, 255, 0.15)
        `,
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      aria-label="Contact us on WhatsApp"
    >
      <style>{`
        .whatsapp-widget-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transform: skewX(-25deg);
          transition: left 0s;
          z-index: 1;
          pointer-events: none;
        }
        .whatsapp-widget-shimmer:hover::after {
          left: 150%;
          transition: left 1.2s ease;
        }
      `}</style>
      {/* Crisp White Icon for Maximum Definition */}
      <svg 
        width="26" 
        height="26" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: '#FFFFFF', // Pure White
          filter: 'none', // Removed shadow for crisp edges
          position: 'relative',
          zIndex: 2
        }}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
};

export default WhatsAppWidget;
