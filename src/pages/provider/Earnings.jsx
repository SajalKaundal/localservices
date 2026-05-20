;import React from 'react';
import Card from '../../components/ui/Card';

const Earnings = () => {
  return (
    <div className="provider-page">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="heading-3">Earnings & Payments</h2>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px'}}>
        <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Pending Payouts</h4>
          <div className="display-xl" style={{fontSize: '48px', marginTop: '8px'}}>₹120.00</div>
        </Card>
        <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Total Earned</h4>
          <div className="display-xl" style={{fontSize: '48px', marginTop: '8px', color: 'var(--color-neon-green)'}}>₹5,240.00</div>
        </Card>
      </div>

      <Card elevation="medium">
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Recent Transactions</h3>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oct 24, 2026</td>
              <td>Job: AC Repair (Sarah J.)</td>
              <td>Paid out</td>
              <td style={{color: 'var(--color-neon-green)'}}>+₹45.00</td>
            </tr>
            <tr>
              <td>Oct 18, 2026</td>
              <td>Job: Deep Clean (Mike T.)</td>
              <td>Pending</td>
              <td style={{color: 'var(--color-neon-green)'}}>+₹120.00</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Earnings;
