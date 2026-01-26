import React from 'react';

const Rituals = () => {
  const rituals = [
    {
      title: "The Soul Awakening",
      price: "$320 SGD",
      description: "For the tired professional. This isn't just a facial; it's a reset button for your nervous system. Deep lymphatic drainage meets enzymatic exfoliation.",
      features: [
        "+ 90 Minutes of hands-on care",
        "+ Scalp massage that halts time"
      ]
    },
    {
      title: "The Deep Restoration",
      price: "$420 SGD",
      description: "For total burnout recovery. A full sensory immersion using Cryo-therapy cooling and heated linens. You will leave looking rested, not just treated.",
      features: [
        "+ 120 Minutes of total surrender",
        "+ Cryo-Sculpting tools included"
      ]
    }
  ];

  return (
    <section id="rituals" className="rituals-section">
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            marginBottom: '1.5rem'
          }}>Curated Rituals</h2>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#C5B398' // soul-gold
          }}>An Investment in Well-being</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {rituals.map((ritual, index) => (
            <RitualCard key={index} ritual={ritual} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RitualCard = ({ ritual }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={`ritual-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
        gap: '0.5rem'
      }}>
        {/* Mobile-first flex adjustments could go here, keeping it simple for now */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <h3 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontStyle: 'italic',
            color: isHovered ? '#C5B398' : '#2C332E',
            transition: 'color 0.3s ease',
            margin: 0
            }}>{ritual.title}</h3>
            <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 600,
            opacity: 0.4
            }}>{ritual.price}</span>
        </div>
      </div>

      <div className="ritual-card-content">
        <div style={{ flex: '2' }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.875rem',
            lineHeight: 2,
            opacity: 0.7,
            marginBottom: '1.5rem'
          }}>
            <strong style={{ fontWeight: 600 }}>{ritual.description.split('.')[0]}.</strong> {ritual.description.split('.').slice(1).join('.')}
          </p>
          <ul style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            opacity: 0.5,
            textTransform: 'uppercase',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {ritual.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="ritual-card-action">
          <button style={{
            border: '1px solid #2C332E',
            background: isHovered ? '#2C332E' : 'transparent',
            color: isHovered ? '#FFFFFF' : '#2C332E',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}>
            Book This Ritual
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rituals;
