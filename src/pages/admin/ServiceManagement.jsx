import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ServiceManagement = () => {
  return (
    <div className="admin-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Service Categories</h2>
        <Button variant="primary">Add Category</Button>
      </div>
      
      <Card elevation="medium">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Active Providers</th>
              <th>Base Commission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AC Repair</td>
              <td>45</td>
              <td>10%</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Edit</Button>
              </td>
            </tr>
            <tr>
              <td>Home Cleaning</td>
              <td>120</td>
              <td>15%</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Edit</Button>
              </td>
            </tr>
            <tr>
              <td>Plumbing</td>
              <td>32</td>
              <td>10%</td>
              <td>
                <Button variant="ghost" style={{padding: '4px 8px'}}>Edit</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ServiceManagement;
