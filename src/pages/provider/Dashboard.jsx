import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// Reusing consumer dashboard CSS for grid structure
import '../consumer/Dashboard.css'; 

const newRequests = [
  { id: 101, service: 'AC Repair', customer: 'Sarah J.', time: '2 hours ago', location: 'Downtown' },
  { id: 102, service: 'AC Deep Clean', customer: 'Mike T.', time: '5 hours ago', location: 'Westside' },
];

const ProviderDashboard = () => {
  return (
    <div className="provider-dashboard">
      <div className="dashboard-grid">
        <div className="main-column">
          
          {/* Stats Row */}
          <section className="dashboard-section">
            <div className="recommendations-grid">
              <Card elevation="subtle" className="rec-card">
                <h4 className="heading-6 body-muted">Monthly Earnings</h4>
                <div className="display-xl" style={{fontSize: '48px', marginTop: '8px'}}>₹1,240</div>
              </Card>
              <Card elevation="subtle" className="rec-card">
                <h4 className="heading-6 body-muted">Completed Jobs</h4>
                <div className="display-xl" style={{fontSize: '48px', marginTop: '8px'}}>18</div>
              </Card>
              <Card elevation="subtle" className="rec-card">
                <h4 className="heading-6 body-muted">Rating</h4>
                <div className="display-xl" style={{fontSize: '48px', marginTop: '8px', color: 'var(--color-neon-green)'}}>4.9</div>
              </Card>
            </div>
          </section>

          {/* New Requests */}
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">New Booking Requests</h3>
            <div className="bookings-list">
              {newRequests.map(req => (
                <Card key={req.id} className="booking-card">
                  <div className="booking-info">
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                      <h4 className="heading-6">{req.service}</h4>
                      <Badge>{req.time}</Badge>
                    </div>
                    <p className="body-muted" style={{marginTop: '4px'}}>
                      {req.customer} • {req.location}
                    </p>
                  </div>
                  <div className="booking-actions" style={{display: 'flex', gap: '8px'}}>
                    <Button variant="ghost">Decline</Button>
                    <Button variant="primary">Accept</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="side-column">
          <Card elevation="medium" className="action-card">
            <h4 className="heading-5">Profile Strength</h4>
            <div style={{width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', margin: '16px 0'}}>
              <div style={{width: '80%', height: '100%', backgroundColor: 'var(--color-neon-green)', borderRadius: '4px'}}></div>
            </div>
            <p className="body-muted" style={{marginBottom: '16px', fontSize: '14px'}}>
              Add 2 more photos to your portfolio to reach 100%.
            </p>
            <Button variant="secondary" style={{width: '100%'}}>Edit Profile</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
