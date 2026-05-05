import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './ProviderPages.css';

const BookingDetails = () => {
  // Mocking the complex state machine
  const [bookingState, setBookingState] = useState('REQUESTED'); 
  // State flow: REQUESTED -> PROPOSED -> NEGOTIATING -> ACCEPTED -> PENDING_PAYMENT -> CONFIRMED -> IN_PROGRESS -> COMPLETED -> FINAL_PAYMENT_PENDING -> CLOSED

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Hi, I need my AC deep cleaned before the weekend. Are you available on Friday afternoon?',
      type: 'text',
      timestamp: '09:30 AM'
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
      sender: 'provider',
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
    
    if (bookingState === 'REQUESTED' && (suggestTime || suggestPrice)) {
        setBookingState('PROPOSED');
    } else if (bookingState === 'PROPOSED') {
        setBookingState('NEGOTIATING');
    }
  };

  const renderBadge = () => {
    switch(bookingState) {
      case 'REQUESTED': return <Badge>New Request</Badge>;
      case 'PROPOSED':
      case 'NEGOTIATING': return <Badge>Awaiting User Response</Badge>;
      case 'ACCEPTED':
      case 'PENDING_PAYMENT': return <Badge>Awaiting Advance Payment</Badge>;
      case 'CONFIRMED': return <Badge>Confirmed - Upcoming</Badge>;
      case 'IN_PROGRESS': return <Badge>Job In Progress</Badge>;
      case 'COMPLETED':
      case 'FINAL_PAYMENT_PENDING': return <Badge>Awaiting Final Payment</Badge>;
      case 'CLOSED': return <Badge>Closed / Paid</Badge>;
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
              <p className="body-muted" style={{fontSize: "12px", marginTop: '8px'}}>Requested Date</p>
              <p style={{fontWeight: 600}}>Oct 26, 2026 (Flexible)</p>
            </div>
          </div>
        </Card>

        {/* Negotiation & Chat UI */}
        {(bookingState === 'REQUESTED' || bookingState === 'PROPOSED' || bookingState === 'NEGOTIATING') && (
          <Card elevation="medium">
            <h3 className="heading-5" style={{marginBottom: '16px'}}>Negotiation & Proposal</h3>
            
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
                  alignSelf: msg.sender === 'provider' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'provider' ? 'var(--color-deep-teal)' : 'var(--color-forest)',
                  color: 'var(--color-white)',
                  border: '1px solid var(--color-shade-70)',
                  padding: '12px',
                  borderRadius: '12px',
                  borderBottomRightRadius: msg.sender === 'provider' ? '2px' : '12px',
                  borderBottomLeftRadius: msg.sender === 'provider' ? '12px' : '2px',
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
            {isSuggesting || bookingState === 'REQUESTED' ? (
              <div style={{backgroundColor: 'var(--color-shade-80)', padding: '16px', borderRadius: '8px'}}>
                <h4 className="heading-5" style={{marginBottom: '12px', fontSize: '14px'}}>
                  {bookingState === 'REQUESTED' ? 'Send Initial Proposal' : 'Propose New Terms'}
                </h4>
                <div style={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
                  <Input type="time" label="Time Slot" value={suggestTime} onChange={(e) => setSuggestTime(e.target.value)} />
                  <Input type="number" label="Price (₹)" value={suggestPrice} onChange={(e) => setSuggestPrice(e.target.value)} />
                </div>
                <Input label="Message to customer" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
                  {bookingState !== 'REQUESTED' && (
                    <Button variant="ghost" onClick={() => setIsSuggesting(false)}>Cancel</Button>
                  )}
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
                <Button variant="ghost" onClick={() => setIsSuggesting(true)}>Propose new terms</Button>
                <Button variant="primary" onClick={handleSendMessage}>Send</Button>
              </div>
            )}
          </Card>
        )}

        {/* Pending Advance Payment Screen */}
        {(bookingState === 'ACCEPTED' || bookingState === 'PENDING_PAYMENT') && (
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
              <span style={{fontWeight: 500}}>{messages.slice().reverse().find(m => m.type === 'proposal')?.time || '10:00 AM'}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
              <span className="body-muted">Agreed Price</span>
              <span style={{fontWeight: 500}}>₹{messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45}</span>
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
                <p className="body-muted">Waiting for the customer to pay the remaining balance of ₹{(messages.slice().reverse().find(m => m.type === 'proposal')?.price || 45) * 0.9}.</p>
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
            <button onClick={() => setBookingState('REQUESTED')} style={{fontSize: '10px'}}>REQUESTED</button>
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
