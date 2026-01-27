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
        // Soul Ivory (#FAF9F6), River Sand (#E6E2DD), Soul Gold (#C5B398) Blend
        background: 'linear-gradient(135deg, rgba(250, 249, 246, 0.7) 0%, rgba(230, 226, 221, 0.5) 50%, rgba(197, 179, 152, 0.4) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(250, 249, 246, 0.6)',
        borderRadius: '50%',
        // Soul Gold Glow
        boxShadow: `
          0 10px 25px -5px rgba(197, 179, 152, 0.4), 
          0 0 15px rgba(197, 179, 152, 0.2),
          inset 0 0 0 1px rgba(255, 255, 255, 0.3)
        `,
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      aria-label="Contact us on WhatsApp"
    >
      {/* Outlined Chat Bubble Icon in Dark Bronze (#6B5E48) for warmth instead of black */}
      <svg 
        width="26" 
        height="26" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: '#6B5E48', // Dark Bronze - softer than black/deep green
          filter: 'drop-shadow(0 2px 3px rgba(197, 179, 152, 0.3))' // Subtle gold shadow
        }}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
};

export default WhatsAppWidget;
