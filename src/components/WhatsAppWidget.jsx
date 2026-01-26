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
        width: '3.5rem',
        height: '3.5rem',
        padding: 0,
        border: 'none',
        backgroundColor: '#BFA475', // Soul Gold
        borderRadius: '50%',
        boxShadow: '0 4px 20px rgba(191, 164, 117, 0.4)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      aria-label="Contact us on WhatsApp"
    >
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: '#FAF9F6', // Off-white icon
        }}
      >
        <path 
          d="M17.472 14.382C17.111 14.201 15.336 13.328 15.003 13.21C14.669 13.091 14.425 13.033 14.181 13.386C13.936 13.74 13.237 14.563 13.027 14.8C12.816 15.035 12.604 15.074 12.243 14.895C11.883 14.715 10.722 14.336 9.346 13.112C8.243 12.13 7.498 10.917 7.287 10.556C7.076 10.194 7.265 10.001 7.446 9.822C7.607 9.661 7.805 9.404 7.985 9.197C8.165 8.989 8.225 8.831 8.345 8.596C8.465 8.36 8.405 8.155 8.315 7.978C8.225 7.801 7.494 6.007 7.191 5.28C6.896 4.572 6.595 4.668 6.37 4.658C6.16 4.648 5.92 4.648 5.679 4.648C5.438 4.648 5.048 4.738 4.717 5.099C4.387 5.461 3.455 6.335 3.455 8.112C3.455 9.888 4.747 11.606 4.928 11.851C5.108 12.096 7.503 15.793 11.171 17.377C12.044 17.754 12.726 17.978 13.253 18.146C14.156 18.432 14.975 18.39 15.621 18.293C16.338 18.186 17.828 17.391 18.138 16.517C18.448 15.643 18.448 14.897 18.358 14.74C18.267 14.582 18.022 14.492 17.662 14.312H17.472ZM10.957 20.312L10.954 20.311C9.07 20.31 7.218 19.805 5.589 18.839L5.197 18.607L1.2 19.654L2.268 15.759L2.013 15.353C0.972 13.702 0.424 11.785 0.428 9.816C0.437 4.072 5.112 -0.601 10.865 -0.601C13.648 -0.601 16.265 0.483 18.232 2.448C20.2 4.415 21.282 7.03 21.28 9.82C21.272 15.568 16.602 20.312 10.957 20.312Z" 
          fill="currentColor"
        />
      </svg>
    </a>
  );
};

export default WhatsAppWidget;
