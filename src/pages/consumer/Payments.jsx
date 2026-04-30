import React, { useState } from 'react';
import Card from '../../components/ui/Card';

const Payments = () => {
  const [transactions] = useState([
    { id: 1, date: 'Oct 20, 2026', desc: 'Booking BK-1001 (AC Deep Clean)', status: 'Paid', amount: -47.00 },
    { id: 2, date: 'Oct 15, 2026', desc: 'Booking BK-0995 (Home Cleaning)', status: 'Paid', amount: -30.00 },
    { id: 3, date: 'Oct 10, 2026', desc: 'Booking BK-0988 (Plumbing Fix)', status: 'Refunded', amount: 120.00 },
  ]);

  return (
    <div className="consumer-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Payments</h2>

      <Card elevation="medium">
        <h3 className="heading-5" style={{marginBottom: '16px'}}>Transaction History</h3>
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
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.desc}</td>
                <td>{tx.status}</td>
                <td style={{color: tx.amount > 0 ? 'var(--color-neon-green)' : 'inherit'}}>
                  {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Payments;
