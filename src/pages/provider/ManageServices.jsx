import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ManageServices = () => {
  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Manage Services</h2>
        <Button variant="primary">Add New Service</Button>
      </div>

      <Card elevation="medium">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Pricing Type</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AC Deep Cleaning</td>
              <td>AC Repair</td>
              <td>Fixed</td>
              <td>₹45.00</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Edit</Button>
                <Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Delete</Button>
              </td>
            </tr>
            <tr>
              <td>AC Installation</td>
              <td>AC Repair</td>
              <td>Hourly</td>
              <td>₹35.00 / hr</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Edit</Button>
                <Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageServices;
