import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OrganicImagePlaceholder from './OrganicImagePlaceholder';
import ErrorBoundary from './ErrorBoundary';
import Button from './Button';
import ArtisanProfileModal from './ArtisanProfileModal';
import testImage from '../assets/test.png';
import heroHands from '../assets/artisans.jpg';
import trustImage from '../assets/trust.jpg';
import artisan1 from '../assets/artisan-1.jpg';
import artisan2 from '../assets/artisan-2.jpg';
import artisan3 from '../assets/artisan-3.jpg';
import freyaImage from '../assets/artisan_freya_6.jpg';
import karenImage from '../assets/artisan_karen_11.jpg';
import shelbeeImage from '../assets/artisan_shelbee_8.jpg';
import carisImage from '../assets/artisan_caris_2.jpg';
import SEO from './SEO';

gsap.registerPlugin(ScrollTrigger);

const Section = ({ children, style, className, id }) => (
  <section id={id} className={className} style={{
    padding: '6rem 2rem',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...style
  }}>
    {children}
  </section>
);

const TheArtisans = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [activePortrait, setActivePortrait] = useState(null);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      const sections = document.querySelectorAll('.fade-section');
      sections.forEach(section => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const artisans = [
    {
      id: 'freya',
      name: "Freya",
      role: "Senior Beauty Therapist | 26 Years Experience | CIDESCO Certified",
      image: freyaImage,
      vibe: "Experienced & Trusted",
      quote: "\"I have been trusting her recommendations for many years.\"",
      author: "Tee Wei",
      bio: "Freya brings 26 years of experience and a CIDESCO Diploma to her craft. She is known for her gentle touch, deep expertise, and ability to truly understand each client’s skin. Her approach is thoughtful and personalised, combining meticulous care with a calming presence that clients return to time and time again.",
      testimonials: [
        {
          quote: "My skin has indeed improved a lot under her care.",
          context: "On my monthly visit, Freya will always examine my skin conditions and recommend the best treatment for that day. She is very detailed and explains every step clearly.",
          author: "Evelyn Koh"
        },
        {
          quote: "I have been seeing her for many, many years.",
          context: "Despite knowing my skin well, she still carefully assesses it each session and recommends the most suitable treatment. Her care is knowledgeable, attentive, and consistent.",
          author: "Eileen Seah"
        },
        {
          quote: "She listened to my concerns and tailored everything for my skin.",
          context: "Freya is gentle, warm, and attentive. The extraction was painless, and my skin felt clean, smooth, and radiant after.",
          author: "Nicole Tang"
        },
        {
          quote: "My skin looked brighter with tighter pores and improved dark circles.",
          context: "A calming and relaxing experience with visible results right after the treatment.",
          author: "Sheena"
        },
        {
          quote: "A top-notch spa experience with incredible attention to detail.",
          context: "From soothing music to warm towels and thoughtful touches, every part of the experience felt luxurious and carefully curated.",
          author: "Akira"
        },
        {
          quote: "Perfect for first-timers with sensitive skin.",
          context: "Freya patiently explained every step and used gentle products suited for delicate skin.",
          author: "Christy Chua"
        }
      ],
      signature: [
        "Gentle yet effective",
        "Deeply relaxing and restorative",
        "Thoughtfully tailored to individual skin needs",
        "Consistent, meticulous, and results-driven"
      ]
    },
    {
      id: 'shelbee',
      name: "Shelbee",
      role: "Senior Beauty Therapist | 20 Years Experience | ITEC Certified",
      image: shelbeeImage,
      vibe: "Attentive & Soothing",
      quote: "\"Very attentive to details... I was enveloped in an atmosphere of tranquillity.\"",
      author: "Agnes & Arielle Dray",
      bio: "An ITEC-certified therapist with 20 years of experience, Shelbee is known for her gentle care, thoughtful attention to detail, and ability to make every client feel comfortable and well looked after. Her treatments are calming yet effective, combining personalised skincare advice with a reassuring touch that keeps clients returning time and time again.",
      testimonials: [
        {
          quote: "Therapist Shelbee is the best in a professional approach who goes the extra mile and advises for longer term.",
          context: "I have been her customer for years.",
          author: "HY"
        },
        {
          quote: "Been with her since her previous workplace, experienced, gentle and knowledgeable.",
          context: "Excellent care and service, and I would definitely recommend my friends here.",
          author: "Michelle"
        },
        {
          quote: "What impressed me most was Shelbee's ability to tailor the treatment to my specific skin concerns.",
          context: "The extraction was expertly done with minimal discomfort and redness, and my skin felt super soft, smooth, and pampered after.",
          author: "Aerin Yap"
        },
        {
          quote: "Had the most relaxing facial with Shelbee today! Best part is no redness & blotchiness after the facial.",
          context: "This says a lot considering my skin is super sensitive.",
          author: "Gaby"
        },
        {
          quote: "Wow! My skin is so glowy, and not red after extraction??",
          context: "Shelbee was wonderful, and the whole experience was thoroughly enjoyable.",
          author: "Abigail Thio"
        },
        {
          quote: "Shelbee was phenomenal, very gentle and had incredible expertise when it came to massaging, acupuncture points and the facial.",
          context: "She explained every step, making it a relaxing and comfortable experience.",
          author: "Jaime Yap"
        }
      ],
      signature: [
        "Gentle, calming, and reassuring",
        "Thorough and highly attentive",
        "Personalised to individual skin concerns",
        "Knowledgeable, caring, and comfort-focused"
      ]
    },
    {
      id: 'karen',
      name: "Karen",
      role: "Senior Beauty Therapist | 23 Years Experience | CIBTAC Certified",
      image: karenImage,
      vibe: "Deeply Relaxing",
      quote: "\"My therapist Karen is very professional... I fell asleep under her care!\"",
      author: "Carina Tan",
      bio: "With over 23 years of experience and a CIBTAC Diploma, Karen is known for her professionalism, steady expertise, and ability to make every client feel at ease. Her approach is thoughtful and results-focused, combining tailored care, practical skincare advice, and a gentle touch that keeps clients coming back for years.",
      testimonials: [
        {
          quote: "Karen has been my go-to therapist for years.",
          context: "She is very experienced and skilful, and always gives very good advice on maintaining my skin.",
          author: "June"
        },
        {
          quote: "I trust her to decide on which treatment my skin needs for each session.",
          context: "Sessions with Karen are comfortable and relaxing, and I always appreciate her advice on how to take better care of my skin.",
          author: "Kitty"
        },
        {
          quote: "Karen always has a warm smile and makes the experience useful by attending to my exact facial needs at each session.",
          context: "Whether it is to hydrate, massage or brighten my face, she tailors each treatment thoughtfully.",
          author: "Constance Png"
        },
        {
          quote: "Always professional, pleasant, patient and non-pushy.",
          context: "I have been regularly going to Karen for facials for years.",
          author: "Pamela Kow"
        },
        {
          quote: "Karen was meticulous, and my skin issue was addressed according to the facial tailored for me.",
          context: "The whole atmosphere was very comfortable and welcoming, and both my boyfriend and I had a great time here.",
          author: "Jessica Loo"
        },
        {
          quote: "Patient in explaining the products and treatments used.",
          context: "The products were gentle and suitable for my sensitive, breakout-prone skin, and I signed up for a package after my visit.",
          author: "Jayne Lai"
        }
      ],
      signature: [
        "Professional and highly experienced",
        "Tailored to each session’s skin needs",
        "Gentle, calming, and reassuring",
        "Honest, patient, and non-pushy"
      ]
    },
    {
      id: 'caris',
      name: "Caris",
      role: "Senior Beauty Therapist | 22 Years Experience | Diploma in Professional Aesthetics",
      image: carisImage,
      vibe: "Gentle & Precise",
      quote: "\"It was a full sensory escape. I drifted off to sleep and woke up with plump, glowing skin.\"",
      author: "Jon",
      bio: "With 22 years of experience in the beauty industry, Caris brings a calm, knowledgeable, and attentive approach to every treatment. Known for her accommodating nature and gentle care, she creates a relaxing experience while tailoring each session to help clients feel comfortable, cared for, and confident in their skin.",
      testimonials: [
        {
          quote: "Caris is very accommodating and knowledgeable.",
          context: "The facial was pleasant and relaxing, and the environment felt clean and well-maintained.",
          author: "Kellie Tam"
        }
      ],
      signature: [
        "Knowledgeable and reassuring",
        "Pleasant, calming, and relaxing",
        "Thoughtful and accommodating",
        "Delivered in a clean and comfortable environment"
      ]
    }
  ];

  const handleCardClick = (id) => {
    const artisan = artisans.find(a => a.id === id);
    setSelectedArtisan(artisan);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEO 
        title="The Artisans" 
        description="Meet the hands behind the magic. Experienced, intuitive, and dedicated to your soul-deep restoration."
        image={heroHands}
      />
      <div className="artisans-page" style={{ 
        minHeight: '100vh',
        paddingTop: '100px',
        position: 'relative',
        backgroundColor: 'transparent' // Transparent
      }}>
      
      {/* SECTION 1: THE HERO */}
      <div style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div className="fade-section" style={{ maxWidth: '800px', zIndex: 2 }}>
          <h1 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            color: '#2C332E',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            whiteSpace: 'nowrap'
          }}>
            Hands You Can Trust.
          </h1>
          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: '#C5B398', // Gold accent
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '3rem'
          }}>
            Technical mastery, intuitive touch, and total respect for your silence.
          </h2>
        </div>

        {/* Hero Visual */}
        <div className="fade-section" style={{ 
          marginTop: '2rem', 
          width: '100%', 
          maxWidth: '1000px', 
          position: 'relative' 
        }}>
          <ErrorBoundary>
            <OrganicImagePlaceholder fitContent={true} style={{ width: '100%' }}>
              <img 
                src={heroHands} 
                alt="Hands working" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block'
                }} 
              />
            </OrganicImagePlaceholder>
          </ErrorBoundary>
        </div>
      </div>

      {/* SECTION 2: THE PHILOSOPHY */}
      <Section className="fade-section" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px' }}>
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C5B398',
            display: 'block',
            marginBottom: '1rem'
          }}>
            Our Philosophy
          </span>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#2C332E',
            marginBottom: '2rem'
          }}>
            Advisors, Not Sellers.
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: '3rem', 
            alignItems: 'center',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.2rem',
              color: '#5C615E',
              lineHeight: 1.8,
              flex: 1
            }}>
              We know that the modern spa industry often feels like a sales floor. At Skin Soul Spa, we have removed that pressure entirely.
              <br /><br />
              Our artisans are compensated for their care, not their conversion rates. Whether you are seeing Karen for clarity or Freya for restoration, you will receive honest, professional advice, never a sales pitch. We believe, as our guest Zenn noted, in being "genuine in trying to improve your face condition".
            </p>
            {/* Visual Balance */}
            <div style={{ flex: 1, width: '100%', height: '300px' }}>
              <OrganicImagePlaceholder style={{ width: '100%', height: '100%' }}>
                 <img 
                    src={trustImage} 
                    alt="Advisors, Not Sellers" 
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
      </Section>

      {/* SECTION 3: THE PORTRAITS (The Artisans) */}
      <Section className="fade-section" style={{ flexDirection: 'column', backgroundColor: 'transparent' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#2C332E',
            marginBottom: '1rem'
          }}>
            The Artisans
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.2rem',
            color: '#5C615E',
            fontStyle: 'italic'
          }}>
            Defined by those who know them best.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
          gap: '1.5rem', 
          maxWidth: '1200px', 
          width: '100%' 
        }}>
          {artisans.map((artisan, index) => {
            const isActive = activePortrait === artisan.id;
            
            return (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  transform: isActive ? 'translateY(-5px)' : 'none',
                  boxShadow: isActive ? '0 20px 40px rgba(197, 179, 152, 0.2)' : '0 5px 15px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => !isMobile && setActivePortrait(artisan.id)}
                onMouseLeave={() => !isMobile && setActivePortrait(null)}
                onClick={() => handleCardClick(artisan.id)}
              >
                  {/* Image Area - Taking up top half or side */}
                <div style={{ 
                  height: '450px', 
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: `url(${artisan.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center', // Changed from center to top center
                    transition: 'transform 0.8s ease',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L200 0 L200 85 Q150 100 100 85 T0 85 Z' fill='black'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L200 0 L200 85 Q150 100 100 85 T0 85 Z' fill='black'/%3E%3C/svg%3E")`,
                    maskSize: '200% 100%',
                    WebkitMaskSize: '200% 100%',
                    maskRepeat: 'repeat-x',
                    WebkitMaskRepeat: 'repeat-x',
                    animation: `waveFlowHorizontal ${28 + (index * 3)}s linear infinite`,
                    animationDelay: `-${index * 7}s`
                  }}>
                    <style>
                      {`
                        @keyframes waveFlowHorizontal {
                          0% { -webkit-mask-position: 0 0; mask-position: 0 0; }
                          100% { -webkit-mask-position: -200% 0; mask-position: -200% 0; }
                        }
                      `}
                    </style>
                  </div>

                  {/* Hover Overlay Text */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}>
                    <style>
                      {`
                        @keyframes goldShimmer {
                          0% { background-position: 0% 50%; }
                          100% { background-position: 200% 50%; }
                        }
                      `}
                    </style>
                    <span style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: '0.9rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      backgroundImage: 'linear-gradient(90deg, #BFA475 0%, #FFF8E7 50%, #BFA475 100%)',
                      backgroundSize: '200% auto',
                      color: '#BFA475',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'goldShimmer 3s linear infinite',
                      fontWeight: 600,
                      textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                      Discover
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div style={{ 
                  padding: '2rem', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  position: 'relative',
                  marginTop: '-2rem' // Overlap slightly
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/reservations', { state: { artisan: artisan.id } });
                      }}
                      style={{ 
                        padding: '0.5rem 1.25rem',
                        fontSize: '0.7rem',
                        marginBottom: '1rem',
                        display: 'inline-block'
                      }}
                    >
                      Reserve
                    </Button>
                    <h3 style={{
                      fontFamily: '"Tenor Sans", sans-serif',
                      fontSize: '2rem',
                      color: '#2C332E',
                      margin: 0
                    }}>
                      {artisan.name}
                    </h3>
                    <span style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#C5B398'
                    }}>
                      {artisan.role} | {artisan.vibe}
                    </span>
                  </div>

                  {/* The Quote - The Hero Content */}
                  <blockquote style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.25rem',
                    lineHeight: 1.4,
                    color: '#5C615E',
                    fontStyle: 'italic',
                    margin: '0 0 1rem 0',
                    borderLeft: '2px solid #C5B398',
                    paddingLeft: '1rem'
                  }}>
                    {artisan.quote}
                  </blockquote>
                  
                  <cite style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '0.7rem',
                    fontStyle: 'normal',
                    color: '#9CAFA0',
                    display: 'block',
                    textAlign: 'right'
                  }}>
                    — {artisan.author}
                  </cite>

                  <div style={{ 
                    marginTop: '2rem', 
                    textAlign: 'center',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.4s ease',
                    pointerEvents: isActive ? 'auto' : 'none',
                    display: 'none' // Hide button but keep structure if needed later, or remove completely
                  }}>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* SECTION 4: THE TEAM PLEDGE */}
      <Section className="fade-section" style={{ 
        flexDirection: 'column', 
        textAlign: 'center', 
        minHeight: '50vh', 
        backgroundColor: '#2C332E', 
        color: '#FAF9F6',
        // Soft wave mask
        maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,320 L0,40 Q360,0 720,40 T1440,40 L1440,320 Z\' fill=\'black\'/%3E%3C/svg%3E")',
        WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,320 L0,40 Q360,0 720,40 T1440,40 L1440,320 Z\' fill=\'black\'/%3E%3C/svg%3E")',
        maskSize: '200% 100%',
        WebkitMaskSize: '200% 100%',
        maskPosition: '0 bottom',
        WebkitMaskPosition: '0 bottom',
        maskRepeat: 'repeat-x',
        WebkitMaskRepeat: 'repeat-x',
        animation: 'waveFlowFooter 60s linear infinite',
        paddingTop: '15rem' // Increased padding for wave space
      }}>
        <style>
          {`
            @keyframes waveFlowFooter {
              0% { -webkit-mask-position: 0 bottom; mask-position: 0 bottom; }
              100% { -webkit-mask-position: -200% bottom; mask-position: -200% bottom; }
            }
          `}
        </style>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '3rem',
            color: '#C5B398',
            marginBottom: '1.5rem'
          }}>
            A Vow of Silence.
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.4rem',
            color: 'rgba(250, 249, 246, 0.9)',
            lineHeight: 1.8,
            marginBottom: '3rem'
          }}>
            True restoration requires a space where the world cannot reach you. We believe that luxury is the freedom to be vulnerable, whether you wish to unburden your mind in confidence or surrender to deep, restorative sleep.
            <br /><br />
            We honour the trust you place in our hands with absolute discretion. Here, we protect your peace as fiercely as we protect your skin barrier, ensuring that your ritual remains a secret strictly between us.
          </p>
          
          <Button 
            onClick={() => navigate('/reservations')}
            style={{
             color: '#FAF9F6',
             borderColor: '#C5B398',
             fontSize: '0.9rem',
             padding: '1rem 3rem'
          }}>
            Reserve Time With An Artisan
          </Button>
        </div>
      </Section>
    </div>
    <ArtisanProfileModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      artisan={selectedArtisan}
    />
    </>
  );
};

export default TheArtisans;
 
 
