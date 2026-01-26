import React, { useState } from 'react';

const FooterLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.75rem',
        lineHeight: 1.8,
        color: isHovered ? '#BFA475' : '#FAF9F6',
        opacity: isHovered ? 1 : 0.9,
        margin: 0,
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
        display: 'inline-block',
        textShadow: isHovered ? '0 0 20px rgba(191, 164, 117, 0.3)' : 'none'
      }}
    >
      {children}
    </a>
  );
};

const SocialLink = ({ href, label, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        color: isHovered ? '#BFA475' : '#FAF9F6',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        display: 'inline-block'
      }}
    >
      {React.cloneElement(children, { 
        stroke: isHovered ? '#BFA475' : '#FAF9F6',
        style: { opacity: isHovered ? 1 : 0.8, transition: 'all 0.3s ease' }
      })}
    </a>
  );
};

const Footer = () => {
  const textColor = '#FAF9F6';
  const labelColor = '#FAF9F6';
  
  const sectionTitleStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.625rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: labelColor,
    opacity: 0.7,
    margin: '0 0 1rem 0',
    fontWeight: 500
  };

  const bodyTextStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.75rem',
    lineHeight: 1.8,
    color: textColor,
    opacity: 0.9,
    margin: 0,
    textDecoration: 'none'
  };

  return (
    <footer className="footer-section">
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 400,
            margin: 0,
            color: textColor
          }}>Skin Soul Spa</h4>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.625rem',
            lineHeight: 2,
            opacity: 0.6,
            maxWidth: '18rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0,
            color: textColor
          }}>
            A private ritual of self-reverence in a hidden Orchard gem.
          </p>
        </div>

        {/* Explore */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 style={sectionTitleStyle}>Explore</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <FooterLink href="#sanctuary">The Sanctuary</FooterLink>
            <FooterLink href="#experiences">Experiences</FooterLink>
            <FooterLink href="#artisans">The Artisans</FooterLink>
            <FooterLink href="#journal">The Journal</FooterLink>
            <FooterLink href="#reservations">Reservations</FooterLink>
          </div>
        </div>

        {/* Visit */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 style={sectionTitleStyle}>Visit</h5>
          <p style={bodyTextStyle}>
            9 Scotts Road,<br />
            Pacific Plaza, #03-01<br />
            Singapore 228210
          </p>
        </div>

        {/* Hours */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 style={sectionTitleStyle}>Hours</h5>
          <p style={bodyTextStyle}>
            Mon–Fri<br />
            11:00 AM – 8:00 PM
          </p>
          <p style={{ ...bodyTextStyle, marginTop: '0.5rem' }}>
            Sat–Sun<br />
            10:00 AM – 7:00 PM
          </p>
        </div>

        {/* Connect */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5 style={sectionTitleStyle}>Connect</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <FooterLink href="tel:+6569943066">+65 6994 3066</FooterLink>
            <FooterLink href="mailto:customercare@skinsoulspa.sg">customercare@skinsoulspa.sg</FooterLink>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <SocialLink href="#" label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: '6rem',
        paddingTop: '2.5rem',
        borderTop: '1px solid rgba(250, 249, 246, 0.1)'
      }}>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: textColor,
          opacity: 0.4,
          margin: 0
        }}>
          © {new Date().getFullYear()} Skin Soul Spa.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
