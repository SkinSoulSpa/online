import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';

const InputGroup = ({ label, type = "text", name, value, onChange, placeholder, required = false, options = null }) => (
  <div style={{ marginBottom: '2rem' }}>
    <label style={{
      display: 'block',
      fontFamily: '"Montserrat", sans-serif',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#5C615E',
      marginBottom: '0.8rem'
    }}>
      {label} {required && <span style={{ color: '#C5B398' }}>*</span>}
    </label>
    {options ? (
      <div style={{ position: 'relative' }}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            width: '100%',
            padding: '0.8rem 0',
            border: 'none',
            borderBottom: '1px solid #DCD6CF',
            backgroundColor: 'transparent',
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '1.1rem',
            color: '#2C332E',
            borderRadius: 0,
            appearance: 'none',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="" disabled>{placeholder || "Select..."}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value || opt}>{opt.label || opt}</option>
          ))}
        </select>
        <span style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: '#C5B398',
          fontSize: '0.8rem'
        }}>
          ▼
        </span>
      </div>
    ) : type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        style={{
          width: '100%',
          padding: '0.8rem 0',
          border: 'none',
          borderBottom: '1px solid #DCD6CF',
          backgroundColor: 'transparent',
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: '1.1rem',
          color: '#2C332E',
          outline: 'none',
          resize: 'vertical'
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '0.8rem 0',
          border: 'none',
          borderBottom: '1px solid #DCD6CF',
          backgroundColor: 'transparent',
          fontFamily: '"Tenor Sans", sans-serif',
          fontSize: '1.1rem',
          color: '#2C332E',
          outline: 'none'
        }}
      />
    )}
  </div>
);

const Reservations = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    artisan: '',
    date: '',
    time: '',
    note: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Animation for entrance
    const tl = gsap.timeline();
    tl.fromTo('.reservation-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1 }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation Request:', formData);
    // Here you would typically send this data to a backend
    alert('Thank you for your request. We will confirm your reservation shortly.');
  };

  const experiences = [
    "I am new (Request Consultation)",
    "I am returning (Book Specific Experience)",
    "I am looking for a Gift"
  ];

  const artisans = [
    "Freya (Senior Artisan)",
    "Kelly (Senior Artisan)",
    "Shelbee (Artisan)",
    "Karen (Artisan)",
    "First Available Artisan"
  ];

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '120px',
      paddingBottom: '4rem',
      backgroundColor: 'transparent', // Allow global background to show
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 2rem',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 0.8fr',
        gap: '6rem',
        alignItems: 'start'
      }}>
        
        {/* LEFT COLUMN: Form */}
        <div className="reservation-content">
          <div style={{ marginBottom: '4rem' }}>
            <h1 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '3.5rem',
              color: '#2C332E',
              marginBottom: '1rem',
              lineHeight: 1.1
            }}>
              Begin Your Journey
            </h1>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.25rem',
              color: '#5C615E',
              fontStyle: 'italic'
            }}>
              Secure your moment of stillness.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact Details Section */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5B398',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(197, 179, 152, 0.3)',
                paddingBottom: '0.5rem',
                display: 'inline-block'
              }}>
                01. Guest Details
              </h3>
              
              <InputGroup 
                label="How should we address you?" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Your full name"
              />
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                <InputGroup 
                  label="Email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="name@example.com"
                />
                <InputGroup 
                  label="Phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="+65 ..."
                />
              </div>
            </div>

            {/* Reservation Details Section */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5B398',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(197, 179, 152, 0.3)',
                paddingBottom: '0.5rem',
                display: 'inline-block'
              }}>
                02. The Journey
              </h3>

              <InputGroup 
                label="Preferred Experience" 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                options={experiences}
                placeholder="Select your ritual"
                required
              />

              <InputGroup 
                label="Preferred Artisan" 
                name="artisan" 
                value={formData.artisan} 
                onChange={handleChange} 
                options={artisans}
                placeholder="Select artisan"
              />

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                <InputGroup 
                  label="Preferred Date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required
                />
                <InputGroup 
                  label="Preferred Time" 
                  name="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required
                />
              </div>

              <InputGroup 
                label="How is your skin feeling today?" 
                name="note" 
                type="textarea"
                value={formData.note} 
                onChange={handleChange} 
                placeholder="Any special requests, skin concerns, or allergies?"
              />
            </div>

            <button 
              type="submit"
              className="hover-trigger"
              style={{
                backgroundColor: '#2C332E',
                color: '#FFFFFF',
                border: 'none',
                padding: '1.2rem 3rem',
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#9CAFA0'}
              onMouseLeave={e => e.target.style.backgroundColor = '#2C332E'}
            >
              Request Reservation
            </button>
            <p style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.7rem',
              color: '#5C615E',
              marginTop: '1.5rem',
              lineHeight: 1.6,
              maxWidth: '400px',
              fontStyle: 'italic'
            }}>
              Your request is confidential. Our concierge will contact you via WhatsApp or Email within 2 hours to confirm your sanctuary time.
            </p>
          </form>
        </div>

        {/* RIGHT COLUMN: Visual & Info (Desktop only or stacked on mobile) */}
        <div className="reservation-content" style={{ 
          display: isMobile ? 'none' : 'block',
          position: 'sticky',
          top: '150px'
        }}>
          <div style={{ height: '600px', position: 'relative' }}>
             {/* Decorative Border Line */}
             <div style={{
               position: 'absolute',
               top: '-1.5rem',
               right: '-1.5rem',
               width: '100%',
               height: '100%',
               border: '1px solid rgba(197, 179, 152, 0.3)',
               zIndex: 0
             }} />

            <OrganicImagePlaceholder style={{ width: '100%', height: '100%', zIndex: 1 }}>
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#E6E2DD', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '3rem',
                textAlign: 'center',
                color: '#5C615E'
              }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.6 }}>☾</span>
                <p style={{
                  fontFamily: '"Tenor Sans", sans-serif',
                  fontSize: '1.5rem',
                  lineHeight: 1.4,
                  marginBottom: '2rem'
                }}>
                  "The Hidden Sanctuary is conveniently nestled within Pacific Plaza, yet a world away from the noise of Scotts Road."
                </p>
                <div style={{
                  width: '40px',
                  height: '1px',
                  backgroundColor: '#C5B398',
                  margin: '0 auto 2rem auto'
                }} />
                
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ 
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C5B398',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>The Arrival</span>
                  <p style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    lineHeight: 1.6
                  }}>
                    9 Scotts Road, #03-01<br/>
                    Take the elevator to Level 3.<br/>
                    As the doors open, leave the city behind.
                  </p>
                </div>

                <div>
                  <span style={{ 
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C5B398',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>The Hours of Restoration</span>
                  <p style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    lineHeight: 1.6
                  }}>
                    Mon – Fri: 11:00 AM – 8:00 PM<br/>
                    Sat, Sun & PH: 10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </OrganicImagePlaceholder>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reservations;
