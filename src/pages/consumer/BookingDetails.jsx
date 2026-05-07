import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { initiatePayment } from '../../utils/paymentUtils';
import './ConsumerPages.css';

const BookingDetails = () => {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get('status');

  // Booking state now only focuses on the tracking and payment phases
  const [bookingState, setBookingState] = useState(initialStatus || 'CONFIRMED'); 
  // State flow: PENDING_PAYMENT -> CONFIRMED -> IN_PROGRESS -> COMPLETED -> FINAL_PAYMENT_PENDING -> CLOSED

  // Mocked booking data
  const bookingData = {
    id: 'BK-1001',
    service: 'AC Deep Cleaning',
    provider: 'CoolBreeze AC',
    agreedPrice: 1200,
    scheduledDate: '2026-05-12',
    scheduledTime: '11:00 AM'
  };

  const handleAdvancePayment = () => {
    initiatePayment({
      amount: bookingData.agreedPrice * 0.1, // 10% advance
      description: `Advance Deposit for ${bookingData.service}`,
      onSuccess: (txId) => {
        alert(`Payment successful! ID: ${txId}`);
        setBookingState('CONFIRMED');
      }
    });
  };

  const handleFinalPayment = () => {
    const remaining = bookingData.agreedPrice - (bookingData.agreedPrice * 0.1);

    initiatePayment({
      amount: remaining,
      description: `Remaining Balance for ${bookingData.service}`,
      onSuccess: (txId) => {
        alert(`Payment successful! ID: ${txId}`);
        setBookingState('CLOSED');
      }
    });
  };

  const renderBadge = () => {
    switch(bookingState) {
      case 'PENDING_PAYMENT': return <Badge>Pending Deposit</Badge>;
      case 'CONFIRMED': return <Badge>Confirmed</Badge>;
      case 'IN_PROGRESS': return <Badge>In Progress</Badge>;
      case 'COMPLETED':
      case 'FINAL_PAYMENT_PENDING': return <Badge>Final Payment Due</Badge>;
      case 'CLOSED': return <Badge>Closed</Badge>;
      default: return null;
    }
  };

  return (
    <div className="consumer-page">
      <div className="booking-details-header">
        <h2 className="heading-3">Booking Tracker</h2>
        {renderBadge()}
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '24px'}}>
        {/* Service Info Header */}
        <Card elevation="medium">
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>
              <h3 className="heading-5" style={{marginBottom: '8px'}}>{bookingData.service}</h3>
              <p className="body-muted">Provider: <strong>{bookingData.provider}</strong></p>
            </div>
            <div style={{textAlign: "right"}}>
              <p className="body-muted" style={{fontSize: "12px"}}>Booking ID</p>
              <p style={{fontWeight: 600}}>{bookingData.id}</p>
            </div>
          </div>
        </Card>

        {/* Advance Payment Screen */}
        {bookingState === 'PENDING_PAYMENT' && (
          <Card elevation="medium" style={{border: '1px solid var(--color-shade-70)'}}>
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Advance Payment Required</h3>
            <p className="body-muted" style={{marginBottom: '16px'}}>Please pay the advance deposit to confirm your booking.</p>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span>Agreed Price</span>
              <span>₹{bookingData.agreedPrice}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--color-white)'}}>
              <span>Advance Deposit (10%)</span>
              <span style={{fontWeight: 'bold'}}>₹{bookingData.agreedPrice * 0.1}</span>
            </div>
            
            <Button variant="primary" style={{width: '100%'}} onClick={handleAdvancePayment}>Pay Deposit Now</Button>
          </Card>
        )}

        {/* Tracking Timeline (Confirmed -> Complete) */}
        {(bookingState === 'CONFIRMED' || bookingState === 'IN_PROGRESS' || bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Status Timeline</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '24px'}}>
              <div style={{position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--color-shade-70)'}}></div>
              
              {/* Confirmed */}
              <div style={{position: 'relative'}}>
                <div style={{position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-neon-green)'}}></div>
                <p style={{fontWeight: '500'}}>Booking Confirmed</p>
                <span className="body-muted" style={{fontSize: '12px'}}>Scheduled for {bookingData.scheduledDate} at {bookingData.scheduledTime}</span>
              </div>
              
              {/* In Progress */}
              <div style={{position: 'relative'}}>
                <div style={{
                  position: 'absolute', 
                  left: '-22px', 
                  top: '4px', 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: (bookingState === 'IN_PROGRESS' || bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') ? 'var(--color-neon-green)' : 'var(--color-void)',
                  border: (bookingState === 'IN_PROGRESS' || bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') ? 'none' : '2px solid var(--color-shade-50)'
                }}></div>
                <p style={{color: (bookingState === 'IN_PROGRESS' || bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') ? 'white' : 'var(--color-shade-50)'}}>
                  Service In Progress
                </p>
              </div>
              
              {/* Completed */}
              <div style={{position: 'relative'}}>
                <div style={{
                  position: 'absolute', 
                  left: '-22px', 
                  top: '4px', 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%', 
                  backgroundColor: (bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') ? 'var(--color-neon-green)' : 'var(--color-void)',
                  border: (bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') ? 'none' : '2px solid var(--color-shade-50)'
                }}></div>
                <p style={{color: (bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') ? 'white' : 'var(--color-shade-50)'}}>
                  Completed
                </p>
              </div>
            </div>
            
            {/* Action buttons for tracking phase */}
            {bookingState === 'CONFIRMED' && (
              <div style={{marginTop: '24px', display: 'flex', gap: '12px'}}>
                <Button variant="ghost" style={{flex: 1}}>Contact Provider</Button>
                <Button variant="ghost" style={{flex: 1,color: '#EF4444'}}>Cancel Booking</Button>
              </div>
            )}
          </Card>
        )}

        {/* Final Payment Screen */}
        {(bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Invoice & Final Payment</h3>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span className="body-muted">Total Price</span>
              <span>₹{bookingData.agreedPrice}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--color-white)'}}>
              <span>Advance Paid</span>
              <span>- ₹{bookingData.agreedPrice * 0.1}</span>
            </div>
            <hr style={{margin: '12px 0', borderColor: 'var(--color-shade-70)'}} />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{fontWeight: '500'}}>Remaining Balance</span>
              <span className="heading-5" style={{color: 'var(--color-white)'}}>
                ₹{bookingData.agreedPrice * 0.9}
              </span>
            </div>
            
            {bookingState !== 'CLOSED' ? (
              <Button variant="primary" style={{width: '100%', marginTop: '24px'}} onClick={handleFinalPayment}>
                Pay Remaining Amount
              </Button>
            ) : (
              <div style={{marginTop: '24px', padding: '12px', backgroundColor: 'var(--color-forest)', border: '1px solid var(--color-shade-70)', borderRadius: '8px', textAlign: 'center'}}>
                <p style={{color: 'var(--color-white)', fontWeight: 500}}>Fully Paid</p>
              </div>
            )}
          </Card>
        )}
        
        {/* Dev Controls */}
        <div style={{border: '1px dashed #444', padding: '8px', marginTop: '40px'}}>
          <p style={{fontSize: '10px', color: '#888'}}>Dev Test Panel (Booking Status):</p>
          <div style={{display: 'flex', gap: '4px', flexWrap: 'wrap'}}>
            <button onClick={() => setBookingState('PENDING_PAYMENT')} style={{fontSize: '10px'}}>PENDING_PAYMENT</button>
            <button onClick={() => setBookingState('CONFIRMED')} style={{fontSize: '10px'}}>CONFIRMED</button>
            <button onClick={() => setBookingState('IN_PROGRESS')} style={{fontSize: '10px'}}>IN_PROGRESS</button>
            <button onClick={() => setBookingState('FINAL_PAYMENT_PENDING')} style={{fontSize: '10px'}}>FINAL_PAYMENT</button>
            <button onClick={() => setBookingState('CLOSED')} style={{fontSize: '10px'}}>CLOSED</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingDetails;
