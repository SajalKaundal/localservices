import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ConsumerBookingCard = ({ booking, onManage }) => {
  return (
    <Card
      className="booking-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        className="booking-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div className="booking-info">
          <h4 className="heading-6">{booking.service?.name}</h4>
          <p className="body-muted" style={{ marginTop: "4px" }}>
            {booking.provider?.name} •{" "}
            {booking.scheduledAt?.slice(0, 10)} ,{" "}
            {booking.timeSlot}
          </p>
        </div>
        <div
          className="booking-statuses"
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <Badge>{booking.bookingStatus}</Badge>
          <Badge>{booking.paymentStatus}</Badge>
        </div>
      </div>

      <div
        className="booking-amounts"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "var(--color-forest)",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid var(--color-shade-70)",
          width: "100%",
        }}
      >
        <div className="amount-item">
          <span
            className="body-small"
            style={{
              display: "block",
              fontSize: "12px",
              color: "var(--color-shade-50)",
            }}
          >
            Total Amount
          </span>
          <span className="body-strong">₹{booking.totalAmount || 0}</span>
        </div>
        <div className="amount-item">
          <span
            className="body-small"
            style={{
              display: "block",
              fontSize: "12px",
              color: "var(--color-shade-50)",
            }}
          >
            Advance Paid
          </span>
          <span className="body-strong">₹{booking.advanceAmount || 0}</span>
        </div>
        <div className="amount-item" style={{ textAlign: "right" }}>
          <span
            className="body-small"
            style={{
              display: "block",
              fontSize: "12px",
              color: "var(--color-shade-50)",
            }}
          >
            Balance Due
          </span>
          <span className="body-strong">₹{booking.remainingAmount || 0}</span>
        </div>
      </div>
      
      <Button 
        variant="secondary" 
        style={{ width: '100%', marginTop: '8px' }}
        onClick={onManage}
      >
        Track Job Progress
      </Button>
    </Card>
  );
};

export default ConsumerBookingCard;
