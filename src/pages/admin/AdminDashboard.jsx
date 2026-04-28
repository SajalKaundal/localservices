import React from 'react';
import Card from '../../components/ui/Card';

const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Platform Overview</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px'}}>
        <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Total Users</h4>
          <div className="display-xl" style={{fontSize: '48px', marginTop: '8px'}}>12,450</div>
        </Card>
        <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Active Providers</h4>
          <div className="display-xl" style={{fontSize: '48px', marginTop: '8px'}}>842</div>
        </Card>
        <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Monthly Revenue</h4>
          <div className="display-xl" style={{fontSize: '48px', marginTop: '8px', color: 'var(--color-neon-green)'}}>₹45,200</div>
        </Card>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px'}}>
        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Recent Bookings</h3>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Consumer</th>
                <th>Provider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BK-1004</td>
                <td>John Doe</td>
                <td>CoolBreeze AC</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>BK-1005</td>
                <td>Sarah Jenkins</td>
                <td>Fresh Home</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>BK-1006</td>
                <td>Mike Tyson</td>
                <td>Joe Plumber</td>
                <td>Confirmed</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Pending Approvals</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-dark-card-border)', paddingBottom: '8px'}}>
              <div>
                <p style={{fontWeight: '500'}}>Fast Repair Co.</p>
                <span className="body-muted" style={{fontSize: '12px'}}>Provider Registration</span>
              </div>
              <button style={{background: 'none', border: 'none', color: 'var(--color-neon-green)', cursor: 'pointer'}}>Review</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <p style={{fontWeight: '500'}}>Elite Cleaning</p>
                <span className="body-muted" style={{fontSize: '12px'}}>Provider Registration</span>
              </div>
              <button style={{background: 'none', border: 'none', color: 'var(--color-neon-green)', cursor: 'pointer'}}>Review</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
