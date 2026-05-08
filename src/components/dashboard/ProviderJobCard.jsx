import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ProviderJobCard = ({ title, badgeText, subtitle, buttonText, buttonVariant = "primary", onAction }) => {
  return (
    <Card
      className="booking-card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="booking-info">
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <h4 className="heading-6">{title}</h4>
          {badgeText && <Badge>{badgeText}</Badge>}
        </div>
        <p className="body-muted">{subtitle}</p>
      </div>
      <div
        className="booking-actions"
        style={{ display: "flex", gap: "8px" }}
      >
        <Button variant={buttonVariant} onClick={onAction}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default ProviderJobCard;
