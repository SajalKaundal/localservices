import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { initiatePayment } from '../../utils/paymentUtils';
import './ConsumerPages.css';

const BookingDetails = () => {
  // Mocking the complex state machine
  const [bookingState, setBookingState] = useState('PROPOSED'); 
  // State flow: REQUESTED -> PROPOSED -> NEGOTIATING -> ACCEPTED -> PENDING_PAYMENT -> CONFIRMED -> IN_PROGRESS -> COMPLETED -> FINAL_PAYMENT_PENDING -> CLOSED

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'provider', 
      text: 'Hello! I can do the AC Deep Cleaning today, but it will be slightly more expensive due to weekend rates.', 
      type: 'proposal', 
      price: 55, 
      time: '14:00',
      timestamp: '10:05 AM'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [suggestTime, setSuggestTime] = useState('');
  const [suggestPrice, setSuggestPrice] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage && !suggestTime && !suggestPrice) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      type: (suggestTime || suggestPrice) ? 'proposal' : 'text',
      price: suggestPrice || null,
      time: suggestTime || null,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setSuggestTime('');
    setSuggestPrice('');
    setIsSuggesting(false);
    setBookingState('NEGOTIATING');
  };

  const handleAcceptProposal = () => {
    setBookingState('PENDING_PAYMENT');
  };

  const handleAdvancePayment = () => {
    // Current agreed terms (mocked from last proposal)
    const agreedPrice = messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45;
    
    initiatePayment({
      amount: agreedPrice * 0.1, // 10% advance
      description: 'Advance Deposit for AC Deep Cleaning',
      onSuccess: (txId) => {
        alert(`Payment successful! ID: ${txId}`);
        setBookingState('CONFIRMED');
      }
    });
  };

  const handleFinalPayment = () => {
    const agreedPrice = messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45;
    const remaining = agreedPrice - (agreedPrice * 0.1);

    initiatePayment({
      amount: remaining,
      description: 'Remaining Balance for AC Deep Cleaning',
      onSuccess: (txId) => {
        alert(`Payment successful! ID: ${txId}`);
        setBookingState('CLOSED');
      }
    });
  };

  const renderBadge = () => {
    switch(bookingState) {
      case 'REQUESTED': return <Badge>Requested</Badge>;
      case 'PROPOSED':
      case 'NEGOTIATING': return <Badge>Negotiating</Badge>;
      case 'ACCEPTED':
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
              <h3 className="heading-5" style={{marginBottom: '8px'}}>AC Deep Cleaning</h3>
              <p className="body-muted">Provider: <strong>CoolBreeze AC</strong></p>
            </div>
            <div style={{textAlign: "right"}}>
              <p className="body-muted" style={{fontSize: "12px"}}>Booking ID</p>
              <p style={{fontWeight: 600}}>BK-1001</p>
            </div>
          </div>
        </Card>

        {/* Negotiation & Chat UI */}
        {(bookingState === 'REQUESTED' || bookingState === 'PROPOSED' || bookingState === 'NEGOTIATING') && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Negotiation</h3>
            
            <div style={{
              backgroundColor: 'var(--color-void)', 
              borderRadius: '8px', 
              padding: '16px',
              height: '300px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '16px'
            }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? 'var(--color-forest)' : 'var(--color-deep-teal)',
                  color: 'var(--color-white)',
                  border: '1px solid var(--color-shade-70)',
                  padding: '12px',
                  borderRadius: '12px',
                  borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                  borderBottomLeftRadius: msg.sender === 'user' ? '12px' : '2px',
                  maxWidth: '80%'
                }}>
                  {msg.text && <p style={{marginBottom: msg.type === 'proposal' ? '8px' : '0'}}>{msg.text}</p>}
                  
                  {msg.type === 'proposal' && (
                    <div style={{
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 500
                    }}>
                      {msg.time && <div>Time: {msg.time}</div>}
                      {msg.price && <div>Price: ₹{msg.price}</div>}
                    </div>
                  )}
                  <div style={{fontSize: '10px', textAlign: 'right', marginTop: '4px', opacity: 0.7}}>
                    {msg.timestamp}
                  </div>
                </div>
              ))}
            </div>

            {/* Negotiation Controls */}
            {isSuggesting ? (
              <div style={{backgroundColor: 'var(--color-shade-80)', padding: '16px', borderRadius: '8px'}}>
                <h4 className="heading-5" style={{marginBottom: '12px', fontSize: '14px'}}>Propose New Terms</h4>
                <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                  <Input type="time" label="Time" value={suggestTime} onChange={(e) => setSuggestTime(e.target.value)} />
                  <Input type="number" label="Price (₹)" value={suggestPrice} onChange={(e) => setSuggestPrice(e.target.value)} />
                </div>
                <Input label="Add a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
                  <Button variant="ghost" onClick={() => setIsSuggesting(false)}>Cancel</Button>
                  <Button variant="primary" onClick={handleSendMessage}>Send Proposal</Button>
                </div>
              </div>
            ) : (
              <div style={{display: 'flex', gap: '12px'}}>
                <Input 
                  placeholder="Type a message..." 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  style={{flex: 1, marginBottom: 0}}
                />
                <Button variant="ghost" onClick={() => setIsSuggesting(true)}>Propose terms</Button>
                <Button variant="primary" onClick={handleSendMessage}>Send</Button>
              </div>
            )}

            {/* Accept Action */}
            {messages[messages.length - 1].sender === 'provider' && messages[messages.length - 1].type === 'proposal' && (
              <div style={{marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-shade-70)', textAlign: 'center'}}>
                <p className="body-muted" style={{marginBottom: '12px'}}>Accept the provider's latest proposal?</p>
                <Button variant="primary" style={{width: '100%'}} onClick={handleAcceptProposal}>Accept Proposal & Pay Deposit</Button>
              </div>
            )}
          </Card>
        )}

        {/* Advance Payment Screen */}
        {bookingState === 'PENDING_PAYMENT' && (
          <Card elevation="medium" style={{border: '1px solid var(--color-shade-70)'}}>
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Advance Payment Required</h3>
            <p className="body-muted" style={{marginBottom: '16px'}}>You have accepted the provider's proposal. Please pay the advance deposit to confirm the booking.</p>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span>Agreed Price</span>
              <span>₹{messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--color-white)'}}>
              <span>Advance Deposit (10%)</span>
              <span style={{fontWeight: 'bold'}}>₹{(messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45) * 0.1}</span>
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
                <span className="body-muted" style={{fontSize: '12px'}}>Advance paid successfully</span>
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
                <Button variant="ghost" style={{flex: 1}}>Cancel</Button>
              </div>
            )}
            
            {bookingState === 'IN_PROGRESS' && (
              <div style={{marginTop: '24px', padding: '12px', backgroundColor: 'var(--color-forest)', borderRadius: '8px', border: '1px solid var(--color-shade-70)', textAlign: 'center'}}>
                <p style={{color: 'var(--color-white)'}}>Provider has started the service.</p>
              </div>
            )}
          </Card>
        )}

        {/* Final Payment Screen */}
        {(bookingState === 'COMPLETED' || bookingState === 'FINAL_PAYMENT_PENDING' || bookingState === 'CLOSED') && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Invoice & Final Payment</h3>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span className="body-muted">Agreed Price</span>
              <span>₹{messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--color-white)'}}>
              <span>Advance Paid</span>
              <span>- ₹{(messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45) * 0.1}</span>
            </div>
            <hr style={{margin: '12px 0', borderColor: 'var(--color-shade-70)'}} />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{fontWeight: '500'}}>Remaining Balance</span>
              <span className="heading-5" style={{color: 'var(--color-white)'}}>
                ₹{(messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45) * 0.9}
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
        
        {/* Test Dev Controls - Hidden in production */}
        <div style={{border: '1px dashed #444', padding: '8px', marginTop: '40px'}}>
          <p style={{fontSize: '10px', color: '#888'}}>Dev Test Panel (State Trigger):</p>
          <div style={{display: 'flex', gap: '4px', flexWrap: 'wrap'}}>
            <button onClick={() => setBookingState('PROPOSED')} style={{fontSize: '10px'}}>PROPOSED</button>
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
