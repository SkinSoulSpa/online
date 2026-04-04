import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ClientStories = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const reviewsRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true, skipSnaps: false },
    [AutoScroll({ playOnInit: false, speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      const autoScroll = emblaApi.plugins().autoScroll;
      if (autoScroll && autoScroll.isPlaying()) {
        autoScroll.stop();
      }
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      const autoScroll = emblaApi.plugins().autoScroll;
      if (autoScroll && autoScroll.isPlaying()) {
        autoScroll.stop();
      }
    }
  }, [emblaApi]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            onEnter: () => autoScroll.play(),
            onLeaveBack: () => autoScroll.stop(),
          }
        }
      );

      // Marquee fade in
      gsap.fromTo(reviewsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [emblaApi]);

  const reviews = [
    {
      id: 1,
      quote: "Skin Soul Spa is hands down the best facial I have ever had. The facilities are spotless, the team are very polite and professional, and the treatment was incredibly thorough. If you are in Singapore, this is the place to come! It is great value for money, and you will leave looking better than when you walked in.",
      attribution: "Stephanie O."
    },
    {
      id: 2,
      quote: "The facial was an incredibly relaxing experience, with a soothing ambience and attentive service. The treatment left my skin feeling rejuvenated and glowing, thanks to a combination of exfoliation, hydration, and targeted mask treatments. Overall, it was luxurious and refreshing for both my skin and my mind. Would recommend it if anyone wants to relax and see results.",
      attribution: "DNZK"
    },
    {
      id: 3,
      quote: "Nestled conveniently next to Isetan, this oasis offers a delightful atmosphere and exceptionally comfortable beds. After indulging in the hydrating facial, my skin radiates with a healthy glow. My therapist is incredibly professional and gentle, making it easy for me to drift off to sleep during my treatments. It's truly a rejuvenating experience! Highly recommend!!",
      attribution: "Hyun Joo Lee"
    },
    {
      id: 4,
      quote: "Highly recommend this service - I’ve been coming here for years for my extraction, hydrating facial treatments, and facial massages. I always count on the therapists here, like Freya and Shelbee! Thank you for keeping my skin in order and for a super relaxing time, each time ❤️",
      attribution: "Caryl Wong"
    },
    {
      id: 5,
      quote: "My husband and I are on our 2nd package here, and we treat ourselves to a facial every month. Fantastic service in a very relaxing environment with a wide range of facials available and staff who are very caring and attentive.",
      attribution: "Kazzie"
    },
    {
      id: 6,
      quote: "This was more than a facial, it was a full sensory escape. I drifted off to sleep and woke up with plump, glowing skin. Highly recommend!",
      attribution: "Jon"
    },
    {
      id: 7,
      quote: "Extremely relaxing experience. From my first to 4th time, they have not disappointed. All the therapists are extremely meticulous and consistent.",
      attribution: "John Seah"
    },
    {
      id: 8,
      quote: "Been coming here for years, and the beauticians are always friendly and provide recommendations for my skin type. Facials are always comfortable, and my skin feels amazing post-facial. Highly recommended! Rooms are very clean and have a nice fragrance. Staff are very knowledgeable :)",
      attribution: "Mark Lee"
    },
    {
      id: 9,
      quote: "I had an amazing facial at Skin Soul Spa! The staff was very knowledgeable and friendly. She was really patient and recommended some remedies/things not to do regarding my skin type. The music playing in the background + facial I was doing was sooo soothing and calming that I fell asleep…highly recommended facial spa ♥️",
      attribution: "Sofea Shah"
    },
    {
      id: 10,
      quote: "Had an enjoyable and relaxing experience at Skin Soul Spa :) The ambience and services were amazing! The staff were very helpful in teaching me more about my skin type as well as recommending suitable facial treatments! Definitely recommend Skin Soul Spa 💕",
      attribution: "Ashley"
    },
    {
      id: 11,
      quote: "Delightful atmosphere and the most professional beauticians!! They make the effort to explain the process every step of the way. Hands down the best facial experience 🤩😍",
      attribution: "Alethea Lee"
    },
    {
      id: 12,
      quote: "Really relaxing environment and a great series of targeted treatments that left my skin rejuvenated and glowing. Definitely would recommend and come back again.",
      attribution: "Aerin"
    }
  ];

  const RatingDisplay = () => {
    // Random shimmer effect
    const shimmerRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
      const el = shimmerRef.current;
      if (!el) return;

      const initialDelay = Math.random() * 2;
      const repeatDelay = 2 + Math.random() * 3;
      
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: repeatDelay,
        delay: initialDelay
      });

      tl.to(el, {
        backgroundPosition: '200% center',
        duration: 1.5,
        ease: 'power2.inOut',
      }).set(el, {
        backgroundPosition: '-100% center'
      });
      
      timelineRef.current = tl;

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }, []);

    return (
      <div style={{ opacity: 0.9 }}>
        <span 
          ref={shimmerRef}
          style={{
            fontFamily: '"Tenor Sans", sans-serif',
            fontSize: '1.25rem',
            color: '#BFA475',
            background: 'linear-gradient(90deg, #BFA475 0%, #FFF8E7 50%, #BFA475 100%)',
            backgroundSize: '200% auto',
            backgroundPosition: '-100% center',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          ★★★★★
        </span>
      </div>
    );
  };

  const ReviewCard = ({ review }) => (
    <div style={{
      flex: '1', /* Use flex: 1 so both cards in a column stretch to fill the height evenly */
      width: '100%',
      backgroundColor: '#FFFFFF',
      border: '1px solid rgba(197, 179, 152, 0.2)',
      borderRadius: '2px',
      padding: isMobile ? '2rem' : '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      height: '100%', /* Ensure card takes full height of its flex slot */
      boxSizing: 'border-box'
    }}>
      <div style={{ marginBottom: '2rem', flexGrow: 1 }}>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          lineHeight: 1.6,
          color: '#2C332E',
          margin: 0,
          fontStyle: 'italic'
        }}>
          {review.quote}
        </p>
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(197, 179, 152, 0.2)',
        paddingTop: '1.5rem'
      }}>
        <h4 style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#5C615E',
          margin: 0
        }}>
          {review.attribution}
        </h4>
        <RatingDisplay />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      padding: isMobile ? '6rem 0' : '10rem 0',
      backgroundColor: 'transparent',
      color: '#2C332E',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden'
    }}>
      <style>
        {`
          .embla {
            overflow: hidden;
            width: 100%;
          }
          .embla__container {
            display: flex;
            touch-action: pan-y pinch-zoom;
            margin-left: -2rem; /* Offset the gap for the first slide */
            padding: 1rem 0; /* Add top/bottom padding to prevent shadow clipping */
          }
          .embla__slide {
            flex: 0 0 auto;
            transform: translate3d(0, 0, 0);
            width: 420px;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-left: 2rem; /* Add gap as padding to each slide instead of container gap */
          }
          .embla-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background-color: transparent;
            border: 1px solid rgba(197, 179, 152, 0.4);
            color: #A89675;
            cursor: pointer;
            transition: all 0.3s ease;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 20;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .embla-button--prev {
            left: 1rem;
          }
          .embla-button--next {
            right: 1rem;
          }
          @media (max-width: 768px) {
            .embla-button--prev {
              left: 0.5rem;
            }
            .embla-button--next {
              right: 0.5rem;
            }
          }
          .embla-button:hover {
            background-color: #FAF9F6;
            border-color: #A89675;
          }
          @media (max-width: 768px) {
            .embla__container {
              margin-left: -1.5rem;
            }
            .embla__slide {
              width: 320px;
              gap: 1.5rem;
              padding-left: 1.5rem;
            }
          }
        `}
      </style>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Header */}
        <div ref={headerRef} style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'flex-end',
          marginBottom: '4rem',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div>
            <h2 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: isMobile ? '2rem' : '3.5rem',
              color: '#2C332E',
              margin: '0 0 1rem 0',
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}>
              Client Stories
            </h2>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: isMobile ? '1.25rem' : '1.6rem',
              fontStyle: 'italic',
              color: '#5C615E',
              margin: 0,
              letterSpacing: '0.02em'
            }}>
              Quiet Confidence. We let our guests speak for us.
            </p>
          </div>

          {/* Navigation Arrows */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: isMobile ? '2rem' : '0'
            }}>
            </div>
          )}
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div ref={reviewsRef} className="marquee-wrapper" style={{ position: 'relative', width: '100%', padding: isMobile ? '0' : '0 2rem' }}>
        
        <button className="embla-button embla-button--prev" onClick={scrollPrev} aria-label="Previous review">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <button className="embla-button embla-button--next" onClick={scrollNext} aria-label="Next review">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        {/* Fades for desktop to make it look smooth */}
        {!isMobile && (
          <>
            <div style={{ position: 'absolute', left: '2rem', top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, #FAF9F6, transparent)', zIndex: 10, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: '2rem', top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, #FAF9F6, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          </>
        )}

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {isMobile ? (
              reviews.map(review => (
                <div className="embla__slide" key={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))
            ) : (
              // On desktop, we want 2 distinct rows rather than 1 tall row.
              // We achieve this by splitting the reviews into two rows and mapping over each row to create a column of 2 cards
              Array.from({ length: 6 }).map((_, i) => (
                <div className="embla__slide" key={`slide-${i}`}>
                  <ReviewCard review={reviews[i]} />
                  <ReviewCard review={reviews[i + 6]} />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClientStories;
