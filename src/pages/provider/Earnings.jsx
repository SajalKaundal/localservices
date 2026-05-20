import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import { fetchProviderTransactions } from "../../services/providerServices";

const Earnings = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await fetchProviderTransactions();
      setTransactions(transactions);
    };
    getTransactions();
  }, []);

  const totalEarning = useMemo(() => {
    if (transactions.length > 0) {
      const total = transactions.reduce((total, t) => total + Number(t.amount),0);
      return total;
    }
  }, [transactions]);
  return (
    <div className="provider-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 className="heading-3">Earnings & Payments</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Pending Payouts</h4>
          <div
            className="display-xl"
            style={{ fontSize: "48px", marginTop: "8px" }}
          >
            ₹120.00
          </div>
        </Card> */}
        <Card elevation="subtle">
          <h4 className="heading-6 body-muted">Total Earned</h4>
          <div
            className="display-xl"
            style={{
              fontSize: "48px",
              marginTop: "8px",
              color: "var(--color-neon-green)",
            }}
          >
            ₹{totalEarning}
          </div>
        </Card>
      </div>

      <Card elevation="medium">
        <h3 className="heading-5" style={{ marginBottom: "16px" }}>
          Recent Transactions
        </h3>
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
            {transactions.length > 0 &&
              transactions.map((t) => (
                <tr key={t._id}>
                  <td>{t.createdAt.slice(0, 10)}</td>
                  <td>
                    Job: {`${t.bookingId.serviceId.name}(${t.userId.name})`}
                  </td>
                  <td>{t.paymentType}</td>
                  <td style={{ color: "var(--color-neon-green)" }}>
                    +₹{t.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Earnings;
