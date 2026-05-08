import React from 'react';
import Card from '../ui/Card';

const StatCard = ({ title, value, icon }) => {
  return (
    <Card elevation="subtle" className="rec-card" style={!icon ? { textAlign: 'left', cursor: 'default' } : {}}>
      {icon && (
        <div className="rec-icon">
          {icon}
        </div>
      )}
      <h4 className={icon ? "heading-6" : "heading-6 body-muted"} style={icon ? {} : { marginBottom: '8px' }}>
        {title}
      </h4>
      {value !== undefined && (
        <div className="display-xl" style={icon ? {} : { fontSize: "48px", color: "var(--color-white)" }}>
          {value}
        </div>
      )}
    </Card>
  );
};

export default StatCard;
