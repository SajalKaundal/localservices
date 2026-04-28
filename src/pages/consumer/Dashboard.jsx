import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { FiZap, FiTool, FiTruck } from 'react-icons/fi';
import './Dashboard.css';

const upcomingBookings = [
  { id: 1, service: 'Deep Home Cleaning', provider: 'Fresh Home', date: 'Tomorrow, 10:00 AM', status: 'Confirmed' },
  { id: 2, service: 'AC Repair', provider: 'CoolBreeze AC', date: 'Oct 15, 2:00 PM', status: 'Pending' },
];

const ConsumerDashboard = () => {
  return (
    <div className="consumer-dashboard">
      <div className="dashboard-grid">
        <div className="main-column">
          <section className="dashboard-section">
            <h3 className="heading-5 section-header">Upcoming Bookings</h3>
            <div className="bookings-list">
              {upcomingBookings.map(booking => (
                <Card key={booking.id} className="booking-card">
                  <div className="booking-info">
                    <h4 className="heading-6">{booking.service}</h4>
                    <p className="body-muted">{booking.provider} • {booking.date}</p>
                  </div>
                  <div className="booking-status">
                    <Badge className={booking.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}>
                      {booking.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h3 className="heading-5 section-header">Recommended for You</h3>
            <div className="recommendations-grid">
               <Card elevation="subtle" className="rec-card">
                 <div className="rec-icon"><FiZap /></div>
                 <h4>Electrician</h4>
               </Card>
               <Card elevation="subtle" className="rec-card">
                 <div className="rec-icon"><FiTool /></div>
                 <h4>Plumbing</h4>
               </Card>
               <Card elevation="subtle" className="rec-card">
                 <div className="rec-icon"><FiTruck /></div>
                 <h4>Car Wash</h4>
               </Card>
            </div>
          </section>
        </div>

        <div className="side-column">
          <Card elevation="medium" className="action-card">
            <h4 className="heading-5">Need something else?</h4>
            <p className="body-muted" style={{marginTop: '8px', marginBottom: '16px'}}>
              Search our network of verified professionals.
            </p>
            <Button variant="primary" style={{width: '100%'}}>Search Services</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
