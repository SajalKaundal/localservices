import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const BookingManagement = () => {
  return (
    <div className="admin-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Platform Bookings</h2>
      
      <Card elevation="medium">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
          <h3 className="heading-5">All Bookings</h3>
          <Button variant="secondary">Filter Disputes</Button>
        </div>

        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Consumer</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BK-1001</td>
              <td>Sarah J.</td>
              <td>CoolBreeze AC</td>
              <td><Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Completed</Badge></td>
              <td><Button variant="ghost" style={{padding: '4px 8px'}}>View</Button></td>
            </tr>
            <tr>
              <td>BK-0992</td>
              <td>Mike T.</td>
              <td>Elite Cleaning</td>
              <td><Badge style={{backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444'}}>Disputed</Badge></td>
              <td><Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Resolve</Button></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default BookingManagement;
