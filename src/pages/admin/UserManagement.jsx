import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const UserManagement = () => {
  return (
    <div className="admin-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>User Management</h2>
      
      <Card elevation="medium">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
          <h3 className="heading-5">All Users</h3>
          <div style={{display: 'flex', gap: '8px'}}>
            <Button variant="secondary">Consumers</Button>
            <Button variant="secondary">Providers</Button>
          </div>
        </div>

        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USR-001</td>
              <td>John Doe</td>
              <td>Consumer</td>
              <td><Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Active</Badge></td>
              <td><Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Block</Button></td>
            </tr>
            <tr>
              <td>USR-002</td>
              <td>CoolBreeze AC</td>
              <td>Provider</td>
              <td><Badge style={{backgroundColor: 'rgba(54, 244, 164, 0.2)', color: 'var(--color-neon-green)'}}>Active</Badge></td>
              <td><Button variant="ghost" style={{padding: '4px 8px', color: '#EF4444'}}>Block</Button></td>
            </tr>
            <tr>
              <td>USR-003</td>
              <td>Elite Cleaning</td>
              <td>Provider</td>
              <td><Badge style={{backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D'}}>Pending KYC</Badge></td>
              <td><Button variant="ghost" style={{padding: '4px 8px'}}>Review Docs</Button></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default UserManagement;
