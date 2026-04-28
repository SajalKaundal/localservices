import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const BookingDetails = () => {
  return (
    <div className="consumer-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Booking Details</h2>
        <Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Confirmed</Badge>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '24px'}}>
        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Service Info</h3>
          <p className="body-muted">Booking ID: <strong>BK-1001</strong></p>
          <p className="body-muted" style={{marginTop: '8px'}}>Service: <strong>AC Deep Cleaning</strong></p>
          <p className="body-muted" style={{marginTop: '8px'}}>Provider: <strong>CoolBreeze AC</strong></p>
          <p className="body-muted" style={{marginTop: '8px'}}>Date: <strong>Oct 25, 2026 at 10:00 AM</strong></p>
        </Card>

        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Status Timeline</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '24px'}}>
            <div style={{position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--color-neon-green)'}}></div>
            
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-neon-green)'}}></div>
              <p style={{fontWeight: '500'}}>Booking Confirmed</p>
              <span className="body-muted" style={{fontSize: '12px'}}>Oct 20, 2026 - 10:30 AM</span>
            </div>
            
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-void)', border: '2px solid var(--color-neon-green)'}}></div>
              <p style={{color: 'var(--color-shade-30)'}}>Provider En Route</p>
            </div>
            
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-void)', border: '2px solid var(--color-shade-50)'}}></div>
              <p style={{color: 'var(--color-shade-50)'}}>Service In Progress</p>
            </div>
            
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-void)', border: '2px solid var(--color-shade-50)'}}></div>
              <p style={{color: 'var(--color-shade-50)'}}>Completed</p>
            </div>
          </div>
        </Card>

        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Invoice & Payment</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <span className="body-muted">AC Deep Cleaning</span>
            <span>₹45.00</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <span className="body-muted">Platform Fee</span>
            <span>₹2.00</span>
          </div>
          <hr style={{margin: '12px 0', borderColor: 'var(--color-shade-70)'}} />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{fontWeight: '500'}}>Total</span>
            <span className="heading-5" style={{color: 'var(--color-neon-green)'}}>₹47.00</span>
          </div>
        </Card>
        
        <div style={{display: 'flex', gap: '16px'}}>
          <Button variant="secondary" style={{flex: 1}}>Message Provider</Button>
          <Button variant="ghost" style={{color: '#EF4444'}}>Cancel Booking</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
