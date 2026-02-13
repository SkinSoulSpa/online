import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import Button from './Button';
import sanctuaryImage from '../assets/sanctuary_15.jpg';
import SEO from './SEO';

// Updated Reservations Component
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
  const location = useLocation();
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

  const [experiences, setExperiences] = useState([
    "I am new (Request Consultation)",
    "I am returning (Book Specific Experience)",
    "I am looking for a Gift"
  ]);

  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  useEffect(() => {
    // Handle pre-selected experience (Impulse Buy)
    if (location.state?.selectedExperience) {
      const selected = location.state.selectedExperience;
      const orderRef = location.state.orderReference;
      
      setExperiences(prev => {
        if (!prev.includes(selected)) {
          return [selected, ...prev];
        }
        return prev;
      });
      
      setFormData(prev => {
        const newNotePrefix = orderRef ? `[Pre-paid Experience: ${orderRef}]` : '';
        // Avoid duplication if the note already starts with the prefix
        if (newNotePrefix && !prev.note.includes(newNotePrefix)) {
             return { 
                ...prev, 
                experience: selected,
                note: `${newNotePrefix} ${prev.note}` 
            };
        }
        return { ...prev, experience: selected };
      });
    }

    // Handle pre-selected artisan (Artisans Page)
    if (location.state?.artisan) {
        const artisanIdMap = {
            'freya': 'Freya (Senior Artisan)',
            'shelbee': 'Shelbee (Senior Artisan)',
            'karen': 'Karen (Senior Artisan)',
            'caris': 'Caris (Senior Artisan)'
        };
        const selectedArtisan = artisanIdMap[location.state.artisan];
        if (selectedArtisan) {
            setFormData(prev => ({
                ...prev,
                artisan: selectedArtisan
            }));
        }
    }
  }, [location.state]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('./reservation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          treatment: `${formData.experience} - ${formData.artisan}`,
          message: formData.note
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          artisan: '',
          date: '',
          time: '',
          note: ''
        });
        alert('Thank you! Your reservation request has been sent successfully.');
      } else {
        throw new Error(result.message || 'Failed to send reservation.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      alert('Sorry, there was an issue sending your request. Please try again or contact us directly via WhatsApp.');
    }
  };

  const artisans = [
    "Freya (Senior Artisan)",
    "Caris (Senior Artisan)",
    "Shelbee (Senior Artisan)",
    "Karen (Senior Artisan)",
    "First Available Artisan"
  ];

  return (
    <>
      <SEO 
        title="Reservations" 
        description="Book your appointment at Skin Soul Spa. Select your journey, artisan, and preferred time for your ritual."
      />
      <div className="reservations-page" style={{
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
              The Hidden Sanctuary is conveniently nestled within Pacific Plaza, yet a world away from the noise of Scotts Road.
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
                label="Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="How should we address you?"
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
                placeholder="Select your experience"
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
                label="Note" 
                name="note" 
                type="textarea"
                value={formData.note} 
                onChange={handleChange} 
                placeholder="How is your skin feeling today?"
              />
            </div>

            <Button 
              type="submit"
              disabled={status === 'sending'}
              style={{
                marginTop: '1rem',
                width: isMobile ? '100%' : 'auto',
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer'
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Request Reservation'}
            </Button>
            <p style={{
              marginTop: '1.5rem',
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '0.7rem',
              color: '#5C615E',
              lineHeight: '1.6',
              maxWidth: '500px'
            }}>
              Your request is confidential. Our concierge will contact you via WhatsApp or Email within 2 hours to confirm your sanctuary time.
            </p>
          </form>
        </div>

        {/* RIGHT COLUMN: Visual & Info (Desktop only or stacked on mobile) */}
        <div className="reservation-content" style={{ 
          display: 'block',
          position: isMobile ? 'static' : 'sticky',
          top: '150px',
          marginTop: isMobile ? '4rem' : '0'
        }}>
          <div style={{ height: '600px', position: 'relative' }}>
            <OrganicImagePlaceholder style={{ width: '100%', height: '100%', zIndex: 1 }}>
              <img 
                src={sanctuaryImage} 
                alt="The Sanctuary" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block' 
                }} 
              />
            </OrganicImagePlaceholder>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default Reservations;