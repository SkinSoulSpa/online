import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const CheckoutModal = ({ isOpen, onClose, product, paymentMethod = 'generic' }) => {
  const [step, setStep] = useState('payment'); // 'payment' | 'processing' | 'success'
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setOrderId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      const newOrderId = `SSS-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(newOrderId);
      setStep('success');
    }, 1500); // Simulate processing delay
  };

  const handleReserve = () => {
    onClose();
    navigate('/reservations', { 
      state: { 
        selectedExperience: product?.title,
        orderReference: orderId 
      } 
    });
  };

  const handleWhatsApp = () => {
    const message = `Hello, I just purchased the ${product?.title} for ${product?.price}. I would like to reserve my appointment. Experience Ref: ${orderId}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6593633111?text=${encodedMessage}`, '_blank');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(44, 51, 46, 0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        maxWidth: '500px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        padding: '2rem',
        animation: 'slideUp 0.4s ease-out',
        position: 'relative',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        <style>
          {`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            border: 'none', 
            background: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer', 
            color: '#8C8C8C',
            zIndex: 10
          }}
        >
          ×
        </button>

        {/* CONTENT BASED ON STEP */}
        
        {step === 'payment' && (
          <div style={{ animation: 'fadeIn 0.3s ease', width: '100%' }}>
            {/* Header */}
            <div style={{ 
              marginBottom: '2rem',
              borderBottom: '1px solid #F0F0F0',
              paddingBottom: '1rem'
            }}>
              <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#2C332E' }}>
                {paymentMethod === 'apple' ? 'Pay with Passcode' : 'Complete Purchase'}
              </span>
            </div>

            {/* Product Summary */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#F5F5F0', 
                borderRadius: '8px',
                backgroundImage: product?.image ? `url(${product.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: '"Tenor Sans", sans-serif', fontSize: '1.1rem', color: '#2C332E' }}>{product?.title}</h4>
                <p style={{ margin: 0, color: '#5C615E', fontFamily: '"Montserrat", sans-serif', fontSize: '0.9rem' }}>{product?.price}</p>
              </div>
            </div>

            {/* Payment Methods */}
            <div style={{ marginBottom: '1rem' }}>
              {paymentMethod === 'generic' ? (
                // Credit Card Form Mock
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#5C615E', marginBottom: '0.5rem', fontFamily: '"Montserrat", sans-serif' }}>Credit Card Details</label>
                    <div style={{ border: '1px solid #E6E2DD', borderRadius: '4px', overflow: 'hidden' }}>
                      <input 
                        type="text" 
                        defaultValue="4242 4242 4242 4242" 
                        style={{ width: '100%', padding: '0.8rem', border: 'none', borderBottom: '1px solid #E6E2DD', outline: 'none', fontSize: '1rem', fontFamily: 'monospace' }} 
                        readOnly
                      />
                      <div style={{ display: 'flex' }}>
                        <input 
                          type="text" 
                          defaultValue="12 / 25" 
                          style={{ width: '50%', padding: '0.8rem', border: 'none', borderRight: '1px solid #E6E2DD', outline: 'none', fontSize: '1rem', fontFamily: 'monospace' }} 
                          readOnly
                        />
                        <input 
                          type="text" 
                          defaultValue="123" 
                          style={{ width: '50%', padding: '0.8rem', border: 'none', outline: 'none', fontSize: '1rem', fontFamily: 'monospace' }} 
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handlePayment}
                    style={{ 
                      backgroundColor: '#2C332E', 
                      color: '#FFFFFF', 
                      width: '100%',
                      marginTop: '1.5rem'
                    }}
                  >
                    Pay {product?.price}
                  </Button>
                </div>
              ) : (
                // Digital Wallet Button
                <Button 
                  onClick={handlePayment}
                  style={{ 
                    backgroundColor: '#000000', 
                    color: '#FFFFFF', 
                    width: '100%',
                    marginBottom: '0.5rem',
                    fontFamily: paymentMethod === 'apple' ? '-apple-system, BlinkMacSystemFont, sans-serif' : '"Montserrat", sans-serif'
                  }}
                >
                   {paymentMethod === 'apple' && ' Pay'}
                   {paymentMethod === 'google' && 'Pay with GPay'}
                </Button>
              )}
            </div>

            {/* Face ID Confirmation */}
            {paymentMethod === 'apple' && (
              <div style={{ textAlign: 'center', color: '#8C8C8C', fontSize: '0.8rem', marginTop: '1rem' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  border: '2px solid #2C332E', 
                  borderRadius: '50%', 
                  margin: '0 auto 0.5rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>☺</span>
                </div>
                Double Click Side Button
              </div>
            )}
          </div>
        )}

        {step === 'processing' && (
          <div style={{ 
            animation: 'fadeIn 0.3s ease', 
            width: '100%', 
            height: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '3px solid #F0F0F0',
              borderTop: '3px solid #2C332E',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1.5rem'
            }}>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
            <p style={{ fontFamily: '"Montserrat", sans-serif', color: '#5C615E' }}>Processing Payment...</p>
          </div>
        )}

        {/* Success View */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
             <style>{`
              .btn-whatsapp-hover::before {
                background: linear-gradient(135deg, rgba(60, 100, 70, 0.95), rgba(30, 70, 50, 1)) !important;
              }
              .btn-reserve-hover::before {
                 background: linear-gradient(135deg, #1a1f1b, #000000) !important;
              }
            `}</style>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <span style={{ fontSize: '2.5rem' }}>✨</span>
            </div>
            
            <h3 style={{
              fontFamily: '"Tenor Sans", sans-serif',
              fontSize: '1.8rem',
              color: '#2C332E',
              marginBottom: '1rem'
            }}>
              Experience Acquired
            </h3>

            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '1.1rem',
              color: '#5C615E',
              marginBottom: '0.5rem'
            }}>
              Your journey awaits.
            </p>

            <div style={{
              padding: '0.8rem',
              backgroundColor: '#F9F9F9',
              border: '1px dashed #C5B398',
              borderRadius: '4px',
              marginBottom: '2rem',
              display: 'inline-block'
            }}>
              <span style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '0.8rem',
                color: '#2C332E',
                letterSpacing: '0.05em',
                fontWeight: 600
              }}>
                EXPERIENCE REF: {orderId}
              </span>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button 
                onClick={handleWhatsApp}
                className="btn-whatsapp-hover"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.9) 0%, rgba(46, 92, 62, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Reserve via WhatsApp</span>
              </Button>

              <Button 
                onClick={handleReserve}
                className="btn-reserve-hover"
                style={{
                  width: '100%',
                  backgroundColor: '#2C332E',
                  color: '#FFFFFF'
                }}
              >
                Reserve Your Sanctuary
              </Button>

              <button 
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8C8C8C',
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  textDecoration: 'underline'
                }}
              >
                I'll do it later
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
