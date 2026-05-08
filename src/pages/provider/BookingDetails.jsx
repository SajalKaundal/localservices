import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import './ProviderPages.css';

const BookingDetails = () => {
  // Mocking the complex state machine
  const [bookingState, setBookingState] = useState('CONFIRMED'); 
  // State flow: PENDING_PAYMENT -> CONFIRMED -> IN_PROGRESS -> COMPLETED -> FINAL_PAYMENT_PENDING -> CLOSED

  const [jobDetails] = useState({
    time: '10:00 AM',
    price: 1200
  });

  const renderBadge = () => {
    switch(bookingState) {
      case 'PENDING_PAYMENT': return <Badge>Awaiting Advance Payment</Badge>;
      case 'CONFIRMED': return <Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Confirmed - Upcoming</Badge>;
      case 'IN_PROGRESS': return <Badge style={{backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA'}}>Job In Progress</Badge>;
      case 'COMPLETED':
      case 'FINAL_PAYMENT_PENDING': return <Badge>Awaiting Final Payment</Badge>;
      case 'CLOSED': return <Badge style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>Closed / Paid</Badge>;
      default: return null;
    }
  };

  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Job Details</h2>
        {renderBadge()}
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '24px'}}>
        
        {/* Customer & Request Info Header */}
        <Card elevation="medium">
          <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px"}}>
            <div>
              <h3 className="heading-5" style={{marginBottom: '8px'}}>AC Deep Cleaning</h3>
              <p className="body-muted">Customer: <strong>Sarah Jenkins</strong></p>
              <p className="body-muted" style={{marginTop: '4px'}}>Address: <strong>123 Downtown Ave, Apt 4B</strong></p>
            </div>
            <div style={{textAlign: "right"}}>
              <p className="body-muted" style={{fontSize: "12px"}}>Booking ID</p>
              <p style={{fontWeight: 600}}>BK-1001</p>
              <p className="body-muted" style={{fontSize: "12px", marginTop: '8px'}}>Scheduled Date</p>
              <p style={{fontWeight: 600}}>Oct 26, 2026</p>
            </div>
          </div>
        </Card>

        {/* Pending Advance Payment Screen */}
        {bookingState === 'PENDING_PAYMENT' && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Waiting for Advance Payment</h3>
            <p className="body-muted" style={{marginBottom: '16px'}}>The customer has accepted your proposal and is required to pay a 10% advance deposit to confirm the booking.</p>
            <div style={{padding: '16px', backgroundColor: 'var(--color-shade-80)', borderRadius: '8px'}}>
              <p style={{textAlign: 'center', color: 'var(--color-white)', fontWeight: 500}}>Waiting for customer to pay...</p>
            </div>
          </Card>
        )}

        {/* Job Management (Confirmed -> In Progress -> Complete) */}
        {(bookingState === 'CONFIRMED' || bookingState === 'IN_PROGRESS' || bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Job Execution</h3>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span className="body-muted">Agreed Time</span>
              <span style={{fontWeight: 500}}>{jobDetails.time}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
              <span className="body-muted">Agreed Price</span>
              <span style={{fontWeight: 500}}>₹{jobDetails.price}</span>
            </div>
            
            {bookingState === 'CONFIRMED' && (
              <Button variant="primary" style={{width: '100%'}} onClick={() => setBookingState('IN_PROGRESS')}>
                Start Service
              </Button>
            )}

            {bookingState === 'IN_PROGRESS' && (
              <div style={{textAlign: 'center'}}>
                <div style={{padding: '16px', backgroundColor: 'var(--color-forest)', border: '1px solid var(--color-shade-70)', borderRadius: '8px', marginBottom: '24px'}}>
                  <p style={{color: 'var(--color-white)', fontWeight: 500}}>Service is currently in progress.</p>
                </div>
                <Button variant="primary" style={{width: '100%'}} onClick={() => setBookingState('FINAL_PAYMENT_PENDING')}>
                  Mark as Completed
                </Button>
              </div>
            )}

            {(bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING') && (
              <div style={{padding: '16px', backgroundColor: 'var(--color-shade-80)', borderRadius: '8px'}}>
                <h4 className="heading-5" style={{marginBottom: '8px'}}>Job Completed</h4>
                <p className="body-muted">Waiting for the customer to pay the remaining balance of ₹{jobDetails.price * 0.9}.</p>
              </div>
            )}

            {bookingState === 'CLOSED' && (
              <div style={{padding: '16px', backgroundColor: 'var(--color-forest)', border: '1px solid var(--color-shade-70)', borderRadius: '8px', textAlign: 'center'}}>
                <p style={{color: 'var(--color-white)', fontWeight: 500}}>Payment Received. Job Closed.</p>
              </div>
            )}
          </Card>
        )}

        {/* Test Dev Controls - Hidden in production */}
        <div style={{border: '1px dashed #444', padding: '8px', marginTop: '40px'}}>
          <p style={{fontSize: '10px', color: '#888'}}>Dev Test Panel (State Trigger):</p>
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
