import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const MyJobs = () => {
  return (
    <div className="provider-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>My Jobs</h2>
      
      <Card elevation="medium">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Service</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Earnings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BK-1001</td>
              <td>AC Deep Clean</td>
              <td>Sarah Jenkins</td>
              <td>Oct 25, 2026</td>
              <td>
                <Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Upcoming</Badge>
              </td>
              <td>₹45.00</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Message</Button>
              </td>
            </tr>
            <tr>
              <td>BK-0988</td>
              <td>AC Repair</td>
              <td>Mike Tyson</td>
              <td>Oct 20, 2026</td>
              <td>
                <Badge style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>Completed</Badge>
              </td>
              <td>₹85.00</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>View Details</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MyJobs;
