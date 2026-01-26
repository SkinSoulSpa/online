import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '4rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 400,
            margin: 0
          }}>Skin Soul Spa</h4>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.625rem',
            lineHeight: 2,
            opacity: 0.6,
            maxWidth: '20rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0,
            color: '#FAF9F6'
          }}>
            A private ritual of self-reverence in a hidden Orchard gem.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
          <h5 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C5B398',
            margin: 0
          }}>Contact</h5>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.125rem',
            fontStyle: 'italic',
            opacity: 0.8,
            margin: 0,
            color: '#FAF9F6'
          }}>Orchard Road, Singapore<br/>By Reservation Only</p>
          <a href="mailto:hello@skinsoulspa.sg" style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            display: 'block',
            transition: 'color 0.3s',
            color: 'inherit',
            textDecoration: 'none'
          }}>hello@skinsoulspa.sg</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'right' }}>
          <h5 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C5B398',
            margin: 0
          }}>Connect</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="#" style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>Instagram</a>
            <a href="#" style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>Facebook</a>
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
          opacity: 0.3,
          margin: 0,
          color: '#FAF9F6'
        }}>© 2026 Skin Soul Spa</p>
      </div>
    </footer>
  );
};

export default Footer;