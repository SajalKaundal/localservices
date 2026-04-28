import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const ReviewModeration = () => {
  return (
    <div className="admin-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Review Moderation</h2>

      <Card elevation="medium">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
          <h3 className="heading-5">Reported Reviews</h3>
          <Button variant="secondary">All Reviews</Button>
        </div>

        <table className="bookings-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Consumer</th>
              <th>Rating</th>
              <th>Review Text</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CoolBreeze AC</td>
              <td>User_992</td>
              <td>★ 1.0</td>
              <td>"Never showed up. Scam!"</td>
              <td><Badge style={{backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444'}}>Flagged</Badge></td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Keep</Button>
                <Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Remove</Button>
              </td>
            </tr>
            <tr>
              <td>Joe Plumber</td>
              <td>User_102</td>
              <td>★ 5.0</td>
              <td>"jdakldjal kjdalskj" (Spam)</td>
              <td><Badge style={{backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444'}}>Flagged</Badge></td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Keep</Button>
                <Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Remove</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ReviewModeration;
