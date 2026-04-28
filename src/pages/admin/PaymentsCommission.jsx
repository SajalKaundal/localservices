import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const PaymentsCommission = () => {
  return (
    <div className="admin-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Payments & Commission</h2>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Global Settings</h3>
          <Input label="Default Platform Commission (%)" defaultValue="10" />
          <Input label="Withdrawal Fee ($)" defaultValue="2.00" />
          <Button variant="primary" style={{marginTop: '16px'}}>Save Changes</Button>
        </Card>

        <Card elevation="medium">
          <h3 className="heading-5" style={{marginBottom: '16px'}}>Recent Payout Requests</h3>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CoolBreeze AC</td>
                <td>₹500.00</td>
                <td>Oct 26, 2026</td>
                <td><Button variant="primary" style={{padding: '4px 12px', fontSize: '14px'}}>Approve</Button></td>
              </tr>
              <tr>
                <td>Joe Plumber</td>
                <td>₹120.00</td>
                <td>Oct 25, 2026</td>
                <td><Button variant="primary" style={{padding: '4px 12px', fontSize: '14px'}}>Approve</Button></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsCommission;
