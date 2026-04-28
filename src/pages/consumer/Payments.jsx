import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiCreditCard } from 'react-icons/fi';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payments = () => {
  const [balance, setBalance] = useState(120.00);
  const [topupAmount, setTopupAmount] = useState(50);
  const [transactions, setTransactions] = useState([
    { id: 1, date: 'Oct 20, 2026', desc: 'Booking BK-1001 (AC Deep Clean)', status: 'Paid', amount: -47.00 },
    { id: 2, date: 'Oct 15, 2026', desc: 'Wallet Top-up', status: 'Completed', amount: 100.00 },
    { id: 3, date: 'Oct 10, 2026', desc: 'Booking BK-0998 (Plumbing Fix)', status: 'Paid', amount: -120.00 },
  ]);

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you offline?");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert("Razorpay Key is missing! Please add VITE_RAZORPAY_KEY_ID to your .env file.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: topupAmount * 100, // Amount in cents/paise
      currency: "INR",
      name: "LocalServe",
      description: "Wallet Top-up",
      handler: function (response) {
        setBalance(prev => prev + Number(topupAmount));
        const newTx = {
          id: Date.now(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          desc: 'Wallet Top-up via Razorpay',
          status: 'Completed',
          amount: Number(topupAmount)
        };
        setTransactions(prev => [newTx, ...prev]);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#36f4a4", // Brand color
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="consumer-page">
      <h2 className="heading-3" style={{marginBottom: '24px'}}>Payments & Wallet</h2>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px'}}>
        <Card elevation="medium">
          <h4 className="heading-6 body-muted">LocalServe Wallet</h4>
          <div className="display-xl" style={{fontSize: '48px', marginTop: '8px', color: 'var(--color-neon-green)'}}>₹{balance.toFixed(2)}</div>
          
          <div style={{display: 'flex', gap: '8px', marginTop: '16px'}}>
            <input 
              type="number" 
              value={topupAmount} 
              onChange={(e) => setTopupAmount(e.target.value)} 
              style={{
                background: 'var(--color-void)', 
                border: '1px solid var(--color-dark-card-border)', 
                color: 'white', 
                padding: '8px 12px', 
                borderRadius: '8px', 
                width: '100px',
                fontFamily: 'inherit'
              }}
              min="5"
            />
            <Button variant="secondary" onClick={handlePayment}>Add Funds with Razorpay</Button>
          </div>
        </Card>

        <Card elevation="medium">
          <h4 className="heading-6" style={{marginBottom: '16px'}}>Payment Methods</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <Card elevation="subtle" style={{padding: '12px 16px', display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                <span style={{fontSize: '24px'}}><FiCreditCard /></span>
                <span>Visa ending in 4242</span>
              </div>
              <Button variant="ghost" style={{padding: 0, color: '#EF4444'}}>Remove</Button>
            </Card>
            <Button variant="ghost" style={{alignSelf: 'flex-start'}}>+ Add New Method</Button>
          </div>
        </Card>
      </div>

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
