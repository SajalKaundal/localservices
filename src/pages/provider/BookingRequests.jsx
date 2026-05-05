import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import './ProviderPages.css';

const pendingRequests = [
  { id: 'BK-1001', service: 'AC Repair', customer: 'Sarah J.', time: '2 hours ago', location: 'Downtown', date: 'Oct 26, 10:00 AM' },
  { id: 'REQ-503', service: 'AC Deep Clean', customer: 'Mike T.', time: '5 hours ago', location: 'Westside', date: 'Oct 27, 2:00 PM' },
  { id: 'REQ-504', service: 'Gas Refill', customer: 'Emily R.', time: '1 day ago', location: 'North Hills', date: 'Oct 28, 9:00 AM' },
];

const BookingRequests = () => {
  const navigate = useNavigate();

  return (
    <div className="provider-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Booking Requests</h2>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {pendingRequests.map(req => (
          <Card key={req.id} elevation="medium" className="booking-request-card">
            <div>
              <div style={{display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px'}}>
                <h4 className="heading-5">{req.service}</h4>
                <Badge style={{backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D'}}>New Request</Badge>
              </div>
              <p className="body-muted" style={{marginBottom: '4px'}}>Customer: <strong>{req.customer}</strong> • Location: <strong>{req.location}</strong></p>
              <p className="body-muted">Requested Date: <strong>{req.date}</strong></p>
              <p className="body-muted" style={{fontSize: '12px', marginTop: '8px'}}>Received {req.time}</p>
            </div>
            
            <div className="booking-request-actions">
              <Button variant="primary" onClick={() => navigate('/provider/job/1001')}>Review & Propose</Button>
              <Button variant="ghost" style={{color: '#EF4444'}}>Decline</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingRequests;
