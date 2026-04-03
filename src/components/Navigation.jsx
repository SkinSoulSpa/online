import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAudio } from '../context/AudioContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/skinsoulspa_logo.png';

const Navigation = () => {
  const navRef = useRef(null);
  const { playHoverSound } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [shimmerIndex, setShimmerIndex] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Services", path: "/services" },
    { label: "Promotions", path: "/promotions" },
    { label: "The Artisans", path: "/artisans" },
    { label: "The Sanctuary", path: "/sanctuary" },
    { label: "Journal", path: "/journal" },
    { label: "Reservations", path: "/reservations" }
  ];

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  const mobileMenuRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(mobileMenuRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    playHoverSound();
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        // Padding handled by CSS .responsive-nav
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        boxSizing: 'border-box',
        background: 'linear-gradient(to bottom, rgba(250, 249, 246, 0.8) 0%, transparent 100%)',
        backdropFilter: 'blur(2px)'
      }} className="responsive-nav">
        {/* Logo */}
        <div 
          className="hover-trigger"
          onMouseEnter={playHoverSound}
          onClick={() => handleNavigation('/')}
          style={{ 
            cursor: 'pointer',
            position: 'relative',
            zIndex: 102, // Above overlay
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img 
            src={logo} 
            alt="Skin Soul Spa" 
            style={{ 
              height: '4rem',
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ flexDirection: 'row', alignItems: 'center', gap: '2rem' }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
            <div 
              key={index} 
              className={`menu-item hover-trigger ${isActive ? 'active' : ''}`}
              onMouseEnter={playHoverSound}
              onClick={() => handleNavigation(item.path)}
              style={{ 
                textAlign: 'center', 
                cursor: 'pointer',
                position: 'relative',
                padding: '5px 0'
              }}
            >
              <div 
                className="shimmer-text"
                style={{
                  fontFamily: '"Tenor Sans", sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {item.label}
              </div>
              <div className="nav-underline"></div>
            </div>
          )})}
          <style>{`
            .shimmer-text {
              color: #2C332E;
              /* Keep gradient fully pushed off to the right initially so no gold bleeds into the last letter */
              background: linear-gradient(to right, #2C332E 0%, #2C332E 45%, #C5B398 50%, #2C332E 55%, #2C332E 100%);
              background-size: 250% auto; /* Increase size to give more solid color buffer on edges */
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              background-position: 100% center; /* Start firmly on the solid dark part */
              transition: background-position 0.5s ease;
            }

            .menu-item:hover .shimmer-text {
              background-position: -100% center; /* Sweep completely across to the other side */
              transition: background-position 1.5s ease;
            }

            .menu-item.active .shimmer-text {
              background: none;
              -webkit-text-fill-color: #A89675;
              color: #A89675;
            }

            .menu-item .nav-underline {
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 0%;
              height: 1px;
              background: #C5B398;
              transform: translateX(-50%);
              transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;
              opacity: 0;
              box-shadow: 0 0 5px rgba(197, 179, 152, 0.5);
            }
            
            .menu-item:hover .nav-underline,
            .menu-item.active .nav-underline {
              width: 100%;
              opacity: 1;
            }
          `}</style>
        </div>

        {/* Mobile Hamburger - Wave Style */}
        <button 
          className="hamburger-btn" 
          onClick={toggleMenu} 
          aria-label="Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', zIndex: 102 }}
        >
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Wave */}
            <path 
              d="M 2 7 Q 9 3 16 7 T 30 7" 
              stroke="#2C332E" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              style={{ 
                transition: 'all 0.4s ease',
                opacity: isOpen ? 0 : 1
              }}
            />
            {/* Middle Wave */}
            <path 
              d="M 2 12 Q 9 8 16 12 T 30 12" 
              stroke="#2C332E" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              style={{ 
                transition: 'all 0.4s ease',
                opacity: isOpen ? 0 : 1
              }}
            />
            {/* Bottom Wave */}
            <path 
              d="M 2 17 Q 9 13 16 17 T 30 17" 
              stroke="#2C332E" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              style={{ 
                transition: 'all 0.4s ease',
                opacity: isOpen ? 0 : 1
              }}
            />
            
            {/* The X Lines (Visible only when Open) */}
             <line x1="8" y1="8" x2="24" y2="16" stroke="#2C332E" strokeWidth="1.5" strokeLinecap="round" 
               style={{ transition: 'all 0.4s ease', opacity: isOpen ? 1 : 0, transformOrigin: 'center', transform: isOpen ? 'rotate(0)' : 'rotate(-45deg) scale(0.5)' }} />
             <line x1="8" y1="16" x2="24" y2="8" stroke="#2C332E" strokeWidth="1.5" strokeLinecap="round" 
               style={{ transition: 'all 0.4s ease', opacity: isOpen ? 1 : 0, transformOrigin: 'center', transform: isOpen ? 'rotate(0)' : 'rotate(45deg) scale(0.5)' }} />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        style={{
          background: 'rgba(250, 249, 246, 0.95)', // Slightly more transparent for mist effect
          backdropFilter: 'blur(15px)',
          transition: 'opacity 0.6s ease, backdrop-filter 0.6s ease'
        }}
      >
        <div 
          ref={mobileMenuRef}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
            <div 
              key={index} 
              className={`hover-trigger ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              style={{ 
                textAlign: 'center', 
                cursor: 'pointer'
              }}
            >
              <div 
                style={{
                  fontFamily: '"Tenor Sans", sans-serif',
                  fontSize: '1.75rem', // Slightly refined size
                  color: isActive ? '#A89675' : '#2C332E',
                  marginBottom: '0.2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s ease'
                }}
              >
                {item.label}
              </div>
              <div style={{ // Sub-line or decoration could go here
                height: '1px',
                width: isActive ? '100%' : '0%',
                background: '#C5B398',
                transition: 'width 0.3s ease',
                margin: '0 auto',
                boxShadow: isActive ? '0 0 5px rgba(197, 179, 152, 0.5)' : 'none'
              }} className="underline"></div>
            </div>
          )})}
        </div>
      </div>
    </>
  );
};

export default Navigation;
